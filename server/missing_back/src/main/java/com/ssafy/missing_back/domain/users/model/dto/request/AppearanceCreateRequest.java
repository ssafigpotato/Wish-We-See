package com.ssafy.missing_back.domain.users.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.users.model.entity.AppearanceDetail;
import com.ssafy.missing_back.domain.users.model.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
public class AppearanceCreateRequest {

	@Setter
	@JsonProperty("img_url")
	private String imgUrl;

	@JsonProperty("top_color")
	private String topColor;

	@JsonProperty("bottom_color")
	private String bottomColor;

	private String detail;

	public AppearanceDetail toEntity(User user) {
		return AppearanceDetail.builder()
			.imgUrl(imgUrl)
			.topColor(topColor)
			.bottomColor(bottomColor)
			.detail(detail)
			.user(user)
			.build();
	}

}
