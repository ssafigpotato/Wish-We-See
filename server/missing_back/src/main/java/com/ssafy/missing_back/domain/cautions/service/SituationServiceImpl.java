package com.ssafy.missing_back.domain.cautions.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.missing_back.domain.cautions.model.dto.request.SituationRequest;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.cautions.repository.DangerousSituationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SituationServiceImpl implements SituationService {

	private final DangerousSituationRepository dangerousSituationRepository;

	@Override
	@Transactional
	public void EndSituation(SituationRequest situationRequest) {
		Long userId = situationRequest.getUserId();

		// user_id와 연관된 위험 상황 찾기
		DangerousSituation situation = dangerousSituationRepository.findByUser_UserId(userId);

		if (situation != null && !situation.getIsClosed()) {
			// 위험 상황의 is_closed 값을 true로 설정
			situation.closeSituation();
			dangerousSituationRepository.save(situation);
			log.info("사용자의 위험 상황이 종료되었습니다. userId: {}", userId);
		} else if (situation == null) {
			log.warn("해당 사용자의 위험 상황을 찾을 수 없습니다. userId: {}", userId);
		} else {
			log.info("해당 사용자의 위험 상황은 이미 종료된 상태입니다. userId: {}", userId);
		}
	}
}
