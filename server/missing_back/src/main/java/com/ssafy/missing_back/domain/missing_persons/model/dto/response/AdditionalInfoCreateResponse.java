package com.ssafy.missing_back.domain.missing_persons.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.missing_persons.model.entity.AdditionalInfo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdditionalInfoCreateResponse {

	@JsonProperty("additional_info_id")
	private Long additionalInfoId;

	@JsonProperty("situation_id")
	private Long situationId;
	private String info;

	@JsonProperty("created_at")
	private String createdAt;

	public static AdditionalInfoCreateResponse toDto(AdditionalInfo additionalInfo) {
		return AdditionalInfoCreateResponse.builder()
			.additionalInfoId(additionalInfo.getAdditionalInfoId())
			.situationId(additionalInfo.getDangerousSituation().getSituationId())
			.info(additionalInfo.getInfo())
			.createdAt(additionalInfo.getCreatedAt().toString())
			.build();
	}
}
