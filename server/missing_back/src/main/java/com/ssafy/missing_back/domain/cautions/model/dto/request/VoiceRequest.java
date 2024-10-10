package com.ssafy.missing_back.domain.cautions.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class VoiceRequest {

	@JsonProperty("file_url")
	private String fileUrl;
}
