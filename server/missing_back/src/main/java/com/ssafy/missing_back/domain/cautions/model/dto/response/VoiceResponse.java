package com.ssafy.missing_back.domain.cautions.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VoiceResponse {
	@JsonProperty("status")
	private int status;

	public static VoiceResponse toDto(int status) {
		return VoiceResponse.builder()
			.status(status)
			.build();
	}
}
