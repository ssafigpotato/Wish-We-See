package com.ssafy.missing_back.domain.missing_persons.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.missing_persons.model.entity.AdditionalInfo;

public interface AdditionalInfoRepository extends JpaRepository<AdditionalInfo, Long> {
}
