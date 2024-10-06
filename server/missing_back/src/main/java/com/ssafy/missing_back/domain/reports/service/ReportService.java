package com.ssafy.missing_back.domain.reports.service;

import java.io.IOException;

import com.ssafy.missing_back.domain.reports.model.dto.request.ReportCreateRequest;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportDetailResponse;

public interface ReportService {

	ReportDetailResponse writeReport(ReportCreateRequest reportCreateRequest) throws IOException;

}
