package com.ssafy.missing_back.domain.reports.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.missing_back.domain.reports.model.dto.request.ReportCreateRequest;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportDetailResponse;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportListResponse;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportResponse;

public interface ReportService {

	ReportListResponse getReports(Long dangerousSituationId);

	ReportDetailResponse getReport(Long reportId);

	ReportResponse createReport(Long dangerousSituationId, ReportCreateRequest reportCreateRequest,
		MultipartFile image) throws IOException;
}
