package com.ssafy.missing_back.domain.missing_persons.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MissingPersonRequest {
	@JsonProperty("user_id")
	private Long userId;
}
