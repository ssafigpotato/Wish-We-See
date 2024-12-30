package com.ssafy.missing_back.domain.users.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.users.model.entity.User;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ContactResponse {

	@JsonProperty("contact_id")
	private Long contactId;

	@JsonProperty("receiver_name")
	private String receiverName;

	@JsonProperty("receiver_phone")
	private String receiverPhone;

	public static ContactResponse toDto(Long contactId, User user) {
		return ContactResponse.builder()
			.contactId(contactId)
			.receiverName(user.getName())
			.receiverPhone(user.getPhone())
			.build();
	}
}
