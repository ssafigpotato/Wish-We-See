package com.ssafy.missing_back.domain.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.users.model.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByLoginId(String loginId);
}
