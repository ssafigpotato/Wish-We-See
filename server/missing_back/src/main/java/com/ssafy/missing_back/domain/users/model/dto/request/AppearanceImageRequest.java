package com.ssafy.missing_back.domain.users.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AppearanceImageRequest {

	@JsonProperty("image_url")
	private String imageUrl;

	@JsonProperty("situation_id")
	private Long situationId;
}
