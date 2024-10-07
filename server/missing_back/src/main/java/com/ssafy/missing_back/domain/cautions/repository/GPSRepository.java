package com.ssafy.missing_back.domain.cautions.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.cautions.model.entity.GPS;

public interface GPSRepository extends JpaRepository<GPS, Long> {

	// situationId를 주면, 가장 최신의 GPS 정보를 가져온다.
	GPS findTopBySituationIdOrderByCreatedAtDesc(Long situationId);
}
