package com.ssafy.missing_back.domain.reports.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.reports.model.entity.Report;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class ReportDetailResponse {

	@JsonProperty("report_id")
	private Long reportId;

	@JsonProperty("report_content")
	private String reportContent;

	@Setter
	@JsonProperty("report_location_latitude")
	private float reportLocationLatitude;

	@Setter
	@JsonProperty("report_location_longitude")
	private float reportLocationLongitude;

	@JsonProperty("created_at")
	private String createdAt;

	@JsonProperty("report_img_url")
	private String reportImgUrl;

	public static ReportDetailResponse toDto(Report report) {
		return ReportDetailResponse.builder()
			.reportId(report.getReportId())
			.reportContent(report.getReportContent())
			.reportLocationLatitude(report.getReportLocationLatitude())
			.reportLocationLongitude(report.getReportLocationLongitude())
			.createdAt(report.getCreatedAt().toString())
			.reportImgUrl(report.getReportImgUrl())
			.build();
	}
}
