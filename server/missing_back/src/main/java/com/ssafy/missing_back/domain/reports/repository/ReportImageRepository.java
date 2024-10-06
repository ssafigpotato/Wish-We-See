package com.ssafy.missing_back.domain.reports.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.reports.model.entity.ReportImage;

public interface ReportImageRepository extends JpaRepository<ReportImage, Long> {
}
