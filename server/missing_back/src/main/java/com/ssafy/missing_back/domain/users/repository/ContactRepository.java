package com.ssafy.missing_back.domain.users.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.users.model.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

	List<Contact> findAllByUser1_UserId(Long user1Id);
}
