package com.ssafy.missing_back.domain.users.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.users.model.entity.User;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserConditionResponse {

	@JsonProperty("name")
	private String name;

	@JsonProperty("face_img_url")
	private String faceImgUrl;

	@JsonProperty("dangerous_level")
	private Integer dangerousLevel;

	@JsonProperty("situation_id")
	private Long situationId;

	public static UserConditionResponse toDto(User user, DangerousSituation situation) {
		return UserConditionResponse.builder()
			.name(user.getName())
			.faceImgUrl(user.getFaceImg())
			.dangerousLevel(situation.getDangerousLevel())
			.situationId(situation.getSituationId())
			.build();
	}

}
