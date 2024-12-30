package com.ssafy.missing_back.domain.reports.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.reports.model.entity.Report;
import com.ssafy.missing_back.domain.users.model.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
public class ReportCreateRequest {

	@JsonProperty("report_content")
	private String reportContent;

	@JsonProperty("report_location_latitude")
	private float reportLocationLatitude;

	@JsonProperty("report_location_longitude")
	private float reportLocationLongitude;

	private String startX;
	private String startY;
	private String endX;
	private String endY;

	@Setter
	@JsonProperty("report_img_url")
	private String reportImgUrl;

	public Report toEntity(User user, DangerousSituation dangerousSituation) {
		return Report.builder()
			.reportContent(reportContent)
			.user(user)
			.reportLocationLatitude(reportLocationLatitude)
			.reportLocationLongitude(reportLocationLongitude)
			.reportImgUrl(reportImgUrl)
			.dangerousSituation(dangerousSituation)
			.build();
	}

}
