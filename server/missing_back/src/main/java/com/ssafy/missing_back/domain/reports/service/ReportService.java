package com.ssafy.missing_back.domain.reports.service;

import java.io.IOException;
import java.util.List;

import com.ssafy.missing_back.domain.reports.model.dto.request.ReportCreateRequest;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportDetailResponse;

public interface ReportService {

	ReportDetailResponse writeReport(Long dangerousSituationId, ReportCreateRequest reportCreateRequest) throws IOException;
}
