package com.ssafy.missing_back.domain.users.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.users.model.entity.User;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserFindResponse {

	@JsonProperty("user_id")
	private Long userId;

	@JsonProperty("login_id")
	private String longinId;

	private String name;
	private String gender;
	private int age;
	private String address;
	private int height;
	private String phone;

	@JsonProperty("face_img")
	private String faceImg;

	public static UserFindResponse toDto(User user) {
		return UserFindResponse.builder()
			.userId(user.getUserId())
			.longinId(user.getLoginId())
			.name(user.getName())
			.gender(user.getGender() == 1 ? "남성" : "여성")
			.age(user.getAge())
			.address(user.getAddress())
			.height(user.getHeight())
			.phone(user.getPhone())
			.faceImg(user.getFaceImg())
			.build();
	}
}
