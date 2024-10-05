package com.ssafy.missing_back.domain.users.model.dto.response;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserGpsResponse {
	@JsonProperty("isInDangerZone")
	private boolean isInDangerZone;

	public static UserGpsResponse toDto(boolean isInDangerZone) {
		return UserGpsResponse.builder()
			.isInDangerZone(isInDangerZone)
			.build();
	}
}
