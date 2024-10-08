package com.ssafy.missing_back.domain.reports.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SilhouetteRequest {

	@JsonProperty("image_url")
	private String imageUrl;

	@JsonProperty("situation_id")
	private Long situationId;
}
