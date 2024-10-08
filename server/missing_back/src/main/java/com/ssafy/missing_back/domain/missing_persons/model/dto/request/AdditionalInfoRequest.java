package com.ssafy.missing_back.domain.missing_persons.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class AdditionalInfoRequest {

	@JsonProperty("missing_person_id")
	private Long missingPersonId;

	@Setter
	@JsonProperty("additional_img_url")
	private String additionalImgUrl;

	@JsonProperty("additional_content")
	private String additionalContent;


}
