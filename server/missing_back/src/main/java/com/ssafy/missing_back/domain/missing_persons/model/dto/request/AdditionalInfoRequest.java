package com.ssafy.missing_back.domain.missing_persons.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.missing_persons.model.entity.AdditionalInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdditionalInfoRequest {

	@JsonProperty("missing_person_id")
	private Long missingPersonId;

	@Setter
	@JsonProperty("additional_img_url")
	private String additionalImgUrl;

	@JsonProperty("additional_content")
	private String additionalContent;

	public AdditionalInfo toEntity(DangerousSituation dangerousSituation) {
		return AdditionalInfo.builder()
			.dangerousSituation(dangerousSituation)
			.info(additionalContent)
			.additionalImgUrl(additionalImgUrl)
			.build();
	}
}
