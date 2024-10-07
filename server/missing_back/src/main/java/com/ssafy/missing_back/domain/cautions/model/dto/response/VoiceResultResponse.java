package com.ssafy.missing_back.domain.cautions.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class VoiceResultResponse {

	@JsonProperty("classification")
	private String classification;

	public static VoiceResultResponse toDto(String classification) {
		return VoiceResultResponse.builder()
			.classification(classification)
			.build();
	}
}
