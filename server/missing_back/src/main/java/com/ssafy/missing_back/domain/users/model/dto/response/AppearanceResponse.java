package com.ssafy.missing_back.domain.users.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.users.model.entity.AppearanceDetail;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AppearanceResponse {

	@JsonProperty("user_id")
	private Long userId;

	@JsonProperty("appearance_img_url")
	private String appearanceImgUrl;

	@JsonProperty("top_color")
	private String topColor;

	@JsonProperty("bottom_color")
	private String bottomColor;

	private String detail;

	public static AppearanceResponse toDto(AppearanceDetail appearanceDetail) {
		return AppearanceResponse.builder()
			.userId(appearanceDetail.getUserId())
			.appearanceImgUrl(appearanceDetail.getImgUrl())
			.topColor(appearanceDetail.getTopColor())
			.bottomColor(appearanceDetail.getBottomColor())
			.detail(appearanceDetail.getDetail())
			.build();
	}

}
