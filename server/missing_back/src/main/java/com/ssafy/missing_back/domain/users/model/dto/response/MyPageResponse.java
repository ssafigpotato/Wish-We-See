package com.ssafy.missing_back.domain.users.model.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyPageResponse {

	@JsonProperty("user_basic_info")
	private UserFindResponse userFindResponse;

	@JsonProperty("user_additional_info")
	private AppearanceResponse appearanceResponse;

	@JsonProperty("user_contact_info")
	private List<ContactResponse> contacts;

	public static MyPageResponse toDto(UserFindResponse userFindResponse, AppearanceResponse appearanceResponse,
		List<ContactResponse> contacts) {
		return MyPageResponse.builder().userFindResponse(userFindResponse).appearanceResponse(appearanceResponse)
			.contacts(contacts).build();
	}

}
