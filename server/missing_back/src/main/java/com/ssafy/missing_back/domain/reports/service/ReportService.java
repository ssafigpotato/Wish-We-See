package com.ssafy.missing_back.domain.reports.service;

import java.io.IOException;

import com.ssafy.missing_back.domain.reports.model.dto.request.ReportCreateRequest;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportResponse;

public interface ReportService {

	ReportResponse writeReport(Long dangerousSituationId, ReportCreateRequest reportCreateRequest) throws
		IOException;
}
