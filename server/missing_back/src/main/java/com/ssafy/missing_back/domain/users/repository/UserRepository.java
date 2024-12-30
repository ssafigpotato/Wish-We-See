package com.ssafy.missing_back.domain.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.missing_back.domain.users.model.entity.User;

import io.lettuce.core.dynamic.annotation.Param;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByLoginId(String loginId);

	Optional<User> findByPhone(String phone);

	// FCM 토큰 업데이트 쿼리
	@Transactional
	@Modifying
	@Query("UPDATE User u SET u.fcmToken = :fcmToken WHERE u.loginId = :loginId")
	void updateFcmTokenByLoginId(@Param("loginId") String loginId, @Param("fcmToken") String fcmToken);

}
