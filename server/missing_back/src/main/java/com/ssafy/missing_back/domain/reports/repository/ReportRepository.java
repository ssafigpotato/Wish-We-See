package com.ssafy.missing_back.domain.reports.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.reports.model.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {

	List<Report> findAllByDangerousSituation_SituationId(Long situationId);

}
