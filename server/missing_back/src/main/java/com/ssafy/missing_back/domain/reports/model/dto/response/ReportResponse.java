package com.ssafy.missing_back.domain.reports.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.reports.model.entity.Report;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class ReportResponse {

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

	@JsonProperty("user_id")
	private Long userId;

	@JsonProperty("report_img_url")
	private String reportImgUrl;

	public static ReportResponse toDto(Report report) {
		return ReportResponse.builder()
			.reportId(report.getReportId())
			.reportContent(report.getReportContent())
			.reportLocationLatitude(report.getReportLocationLatitude())
			.reportLocationLongitude(report.getReportLocationLongitude())
			.createdAt(report.getCreatedAt().toString())
			.userId(report.getUser().getUserId())
			.reportImgUrl(report.getReportImgUrl())
			.build();
	}
}
