package com.ssafy.missing_back.domain.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.users.model.entity.AppearanceDetail;

public interface AppearanceDetailRepository extends JpaRepository<AppearanceDetail, Long> {

	AppearanceDetail findByUserId(Long userId);

	boolean existsByUserId(Long userId);

	void deleteByUserId(Long userId);
}
