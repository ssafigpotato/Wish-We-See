package com.ssafy.missing_back.domain.users.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UserGpsRequest {

	@NotNull(message = "위도는 필수 입력 값입니다.")
	@JsonProperty("latitude")
	private Double latitude;

	@NotNull(message = "경도는 필수 입력 값입니다.")
	@JsonProperty("longitude")
	private Double longitude;

}
