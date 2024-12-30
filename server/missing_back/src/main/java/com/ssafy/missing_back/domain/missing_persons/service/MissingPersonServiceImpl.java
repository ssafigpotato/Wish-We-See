package com.ssafy.missing_back.domain.missing_persons.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.cautions.model.entity.GPS;
import com.ssafy.missing_back.domain.cautions.repository.DangerousSituationRepository;
import com.ssafy.missing_back.domain.cautions.repository.GPSRepository;
import com.ssafy.missing_back.domain.missing_persons.model.dto.request.MissingPersonRequest;
import com.ssafy.missing_back.domain.missing_persons.model.dto.response.MissingPersonDetailResponse;
import com.ssafy.missing_back.domain.missing_persons.model.entity.AdditionalInfo;
import com.ssafy.missing_back.domain.missing_persons.repository.AdditionalInfoRepository;
import com.ssafy.missing_back.domain.users.model.entity.AppearanceDetail;
import com.ssafy.missing_back.domain.users.model.entity.User;
import com.ssafy.missing_back.domain.users.repository.AppearanceDetailRepository;
import com.ssafy.missing_back.domain.users.repository.UserRepository;
import com.ssafy.missing_back.domain.users.service.FCMService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MissingPersonServiceImpl implements MissingPersonService {

	private final GPSRepository gpsRepository;
	private final UserRepository userRepository;
	private final AdditionalInfoRepository additionalInfoRepository;
	private final AppearanceDetailRepository appearanceDetailRepository;
	private final DangerousSituationRepository dangerousSituationRepository;
	private final FCMService fcmService;

	@Override
	public List<MissingPersonDetailResponse> getAllMissingPersonDetails() {
		// 모든 DangerousSituation을 가져옵니다.
		List<DangerousSituation> situations = dangerousSituationRepository.findAll();

		// DangerLv가 2 이상인 상황만 필터링합니다.
		situations = situations.stream().filter(situation -> situation.getDangerousLevel() >= 2).toList();

		// 각 상황에 대해 데이터를 모아서 리스트로 반환
		return situations.stream().map(situation -> {
			User missingPerson = userRepository.findById(situation.getUser().getUserId()).orElseThrow();
			AppearanceDetail appearanceDetail = appearanceDetailRepository.findById(missingPerson.getUserId())
				.orElseThrow();
			GPS gps = gpsRepository.findTopByDangerousSituation_SituationIdOrderByCreatedAtDesc(
				situation.getSituationId());
			AdditionalInfo additionalInfo = additionalInfoRepository.findByDangerousSituation_SituationId(
				situation.getSituationId());

			return MissingPersonDetailResponse.toDto(missingPerson, appearanceDetail, gps, additionalInfo, situation);
		}).collect(Collectors.toList());

	}

	@Override
	public MissingPersonDetailResponse getMissingPersonDetail(Long situationId) {
		DangerousSituation situation = dangerousSituationRepository.findById(situationId).orElseThrow();
		User missingPerson = userRepository.findById(situation.getUser().getUserId()).orElseThrow();
		AppearanceDetail appearanceDetail = appearanceDetailRepository.findById(missingPerson.getUserId())
			.orElseThrow();

		GPS gps = gpsRepository.findTopByDangerousSituation_SituationIdOrderByCreatedAtDesc(situationId);
		AdditionalInfo additionalInfo = additionalInfoRepository.findByDangerousSituation_SituationId(
			situation.getSituationId());

		return MissingPersonDetailResponse.toDto(missingPerson, appearanceDetail, gps, additionalInfo, situation);
	}

	@Override
	@Transactional
	public void updateMissingPerson(MissingPersonRequest missingPersonRequest) {
		Long userId = missingPersonRequest.getUserId();
		DangerousSituation situation = dangerousSituationRepository.findByUser_UserId(userId);

		if (situation != null) {
			if (!situation.getIsClosed()) {  // 상황이 종료되지 않은 경우에만 업데이트
				situation.setDangerousLevel(3);  // 위험 레벨을 2로 설정
				dangerousSituationRepository.save(situation);
			} else {
				log.info("해당 사용자의 상황은 이미 종료되었습니다. 업데이트를 수행하지 않습니다. userId: {}", userId);
			}
		} else {
			log.warn("해당 사용자의 위험 상황을 찾을 수 없습니다. userId: {}", userId);
		}

		// 모든 사용자에게 FCM 알림 전송 (현재 사용자를 제외)
		List<User> allUsers = userRepository.findAll();  // 모든 사용자 조회
		for (User user : allUsers) {

			String fcmToken = user.getFcmToken();  // 유저의 FCM 토큰 조회

			if (fcmToken != null && !fcmToken.isEmpty() || !userId.equals(user.getUserId())) {
				// FCM 알림 전송
				String name = user.getName();
				String title = "지인에게 연락 권유";
				String body = String.format("%s님에게 연락 한번 해보는 것 어떠신가요?", name);  // 이름을 포함한 메시지 작성
				String url = "http://localhost:3000";

				fcmService.sendNotification(fcmToken, title, body, url);  // 알림 전송
			} else {
				log.warn("FCM 토큰이 없는 사용자입니다. userId: {}", user.getUserId());
			}
		}
	}
}
