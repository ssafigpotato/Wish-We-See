package com.ssafy.missing_back.domain.missing_persons.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.cautions.model.entity.GPS;
import com.ssafy.missing_back.domain.missing_persons.model.entity.AdditionalInfo;
import com.ssafy.missing_back.domain.users.model.entity.AppearanceDetail;
import com.ssafy.missing_back.domain.users.model.entity.User;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MissingPersonDetailResponse {

	@JsonProperty("missing_person_id")
	private Long missingPersonId;

	@JsonProperty("missing_person_face_img")
	private String faceImg;

	@JsonProperty("missing_person_name")
	private String name;

	@JsonProperty("missing_person_gender")
	private String gender;

	@JsonProperty("missing_person_age")
	private int age;

	@JsonProperty("missing_person_top_color")
	private String topColor;

	@JsonProperty("missing_person_bottom_color")
	private String bottomColor;

	@JsonProperty("missing_person_detail")
	private String detail;

	@JsonProperty("missing_person_last_location_latitude")
	private Float lastLocationLatitude;

	@JsonProperty("missing_person_last_location_longitude")
	private Float lastLocationLongitude;

	@JsonProperty("additional_info")
	private String additionalInfo;

	@JsonProperty("additional_img_url")
	private String additionalImgUrl;

	@JsonProperty("created_at")
	private String createdAt;

	@JsonProperty("situation_id")
	private Long situationId;

	@JsonProperty("dangerous_level")
	private int dangerousLevel;

	public static MissingPersonDetailResponse toDto(User missingPerson, AppearanceDetail appearanceDetail, GPS gps,
		AdditionalInfo additionalInfo, DangerousSituation dangerousSituation) {
		return MissingPersonDetailResponse.builder()
			.missingPersonId(missingPerson.getUserId())
			.faceImg(missingPerson.getFaceImg())
			.name(missingPerson.getName())
			.gender(missingPerson.getGender() == 1 ? "남성" : "여성")
			.age(missingPerson.getAge())
			.topColor(appearanceDetail.getTopColor())
			.bottomColor(appearanceDetail.getBottomColor())
			.detail(appearanceDetail.getDetail())
			.lastLocationLatitude(gps.getLocationLatitude())
			.lastLocationLongitude(gps.getLocationLongitude())
			.additionalInfo(additionalInfo.getInfo())
			.additionalImgUrl(additionalInfo.getAdditionalImgUrl())
			.createdAt(additionalInfo.getCreatedAt().toString())
			.situationId(dangerousSituation.getSituationId())
			.dangerousLevel(dangerousSituation.getDangerousLevel())
			.build();
	}
}
