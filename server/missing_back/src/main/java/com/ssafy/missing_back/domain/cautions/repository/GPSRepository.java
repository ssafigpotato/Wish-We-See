package com.ssafy.missing_back.domain.cautions.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.cautions.model.entity.GPS;

public interface GPSRepository extends JpaRepository<GPS, Long> {

	GPS findTopByDangerousSituation_SituationIdOrderByCreatedAtDesc(Long situationId);

}
