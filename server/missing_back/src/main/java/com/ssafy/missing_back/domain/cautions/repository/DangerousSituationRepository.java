package com.ssafy.missing_back.domain.cautions.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;

public interface DangerousSituationRepository extends JpaRepository<DangerousSituation, Long> {
}