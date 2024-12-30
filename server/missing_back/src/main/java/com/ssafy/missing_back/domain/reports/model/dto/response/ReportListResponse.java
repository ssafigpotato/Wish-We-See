package com.ssafy.missing_back.domain.reports.model.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.users.model.entity.User;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReportListResponse {

	@JsonProperty("face_img_url")
	private String faceImg;

	@JsonProperty("name")
	private String name;

	@JsonProperty("gender")
	private String gender;

	@JsonProperty("age")
	private int age;

	List<ReportDetailResponse> reports;

	public static ReportListResponse toDto(User user, List<ReportDetailResponse> reports) {
		return ReportListResponse.builder()
			.faceImg(user.getFaceImg())
			.name(user.getName())
			.gender(user.getGender() == 1 ? "남성" : "여성")
			.age(user.getAge())
			.reports(reports)
			.build();
	}

}
