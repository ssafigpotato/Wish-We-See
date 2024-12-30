package com.ssafy.missing_back.domain.reports.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.missing_back.domain.reports.model.dto.request.ReportCreateRequest;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportDetailResponse;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportListResponse;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportResponse;
import com.ssafy.missing_back.domain.reports.service.ReportService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reports")
public class ReportController {

	private final ReportService reportService;

	@Operation(summary = "제보 목록 조회")
	@GetMapping("/{situation_id}")
	public ResponseEntity<?> getReports(@PathVariable("situation_id") Long situationId) {
		ReportListResponse reportListResponse = reportService.getReports(situationId);
		return ResponseEntity.status(HttpStatus.OK).body(reportListResponse);
	}

	@Operation(summary = "제보 상세 조회")
	@GetMapping(value = "/{situation_id}/{report_id}")
	public ResponseEntity<?> getReport(@PathVariable("situation_id") Long situationId,
		@PathVariable("report_id") Long reportId) {
		ReportDetailResponse reportDetailResponse = reportService.getReport(reportId);
		return ResponseEntity.status(HttpStatus.OK).body(reportDetailResponse);
	}

	@Operation(summary = "신고하기")
	@PostMapping(value = "/{situation_id}", consumes = {"multipart/form-data"})
	public ResponseEntity<?> createReport(@PathVariable("situation_id") Long situationId,
		@Valid @RequestPart(value = "report_detail") String reportDetail,
		@RequestPart(value = "report_image") MultipartFile image) throws IOException {

		ObjectMapper objectMapper = new ObjectMapper();
		ReportCreateRequest reportCreateRequest = objectMapper.readValue(reportDetail, ReportCreateRequest.class);

		ReportResponse reportResponse = reportService.createReport(situationId, reportCreateRequest, image);

		return ResponseEntity.status(HttpStatus.CREATED).body(reportResponse);
	}

}
