package com.ssafy.missing_back.domain.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.users.model.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
