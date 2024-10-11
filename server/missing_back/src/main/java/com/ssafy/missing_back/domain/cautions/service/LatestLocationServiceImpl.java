package com.ssafy.missing_back.domain.cautions.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.missing_back.domain.cautions.model.dto.request.GpsRequest;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.cautions.model.entity.GPS;
import com.ssafy.missing_back.domain.cautions.repository.DangerousSituationRepository;
import com.ssafy.missing_back.domain.cautions.repository.GPSRepository;
import com.ssafy.missing_back.domain.users.model.entity.User;
import com.ssafy.missing_back.domain.users.repository.UserRepository;
import com.ssafy.missing_back.domain.users.service.FCMService;
import com.ssafy.missing_back.global.common.UserInfoProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LatestLocationServiceImpl implements LatestLocationService {

	private final DangerousSituationRepository dangerousSituationRepository;
	private final GPSRepository gpsRepository;
	private final UserInfoProvider userInfoProvider;
	private final FCMService fcmService;
	private final UserRepository userRepository;

	@Override
	@Transactional
	public void LatestLocation(GpsRequest gpsRequest) {
		// 경도 위도 받으면 DB에 저장해둔다.
		// 해당 사용자의 위험 상황 찾기
		Long userId = userInfoProvider.getCurrentUserId();
		DangerousSituation situation = dangerousSituationRepository.findByUser_UserId(userId);

		if (situation != null && !situation.getIsClosed()) {
			// GPS 데이터 생성 및 저장
			GPS gps = GPS.builder()
				.dangerousSituation(situation)  // 위험 상황과 연관 관계 설정
				.locationLatitude(Float.valueOf(gpsRequest.getLocationLatitude()))     // 위도 설정
				.locationLongitude(Float.valueOf(gpsRequest.getLocationLongitude()))   // 경도 설정
				.createdAt(LocalDateTime.now()) // 생성 시간 설정
				.build();

			gpsRepository.save(gps);

			// 모든 사용자에게 FCM 알림 전송 (현재 사용자를 제외)
			List<User> allUsers = userRepository.findAll();  // 모든 사용자 조회
			for (User user : allUsers) {

				String fcmToken = user.getFcmToken();  // 유저의 FCM 토큰 조회

				if (fcmToken != null && !fcmToken.isEmpty()) {
					// FCM 알림 전송
					String name = user.getName();
					String title = "지인에게 연락 권유";
					String body = String.format("%s님에게 연락 한번 해보시는 것 어떠신가요?", name);  // 이름을 포함한 메시지 작성
					String url = "http://localhost:3000";  // 클릭 시 이동할 URL



					fcmService.sendNotification(fcmToken, title, body, url);  // 알림 전송
				} else {
					log.warn("FCM 토큰이 없는 사용자입니다. userId: {}", user.getUserId());
				}

			}
		} else {
			// 상황이 종료되었거나 없는 경우
			log.warn("해당 사용자의 위험 상황을 찾을 수 없거나 종료된 상태입니다. userId: {}", userId);
		}

	}
}
