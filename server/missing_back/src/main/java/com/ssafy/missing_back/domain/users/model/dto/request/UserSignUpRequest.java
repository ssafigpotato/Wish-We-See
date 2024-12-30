package com.ssafy.missing_back.domain.users.model.dto.request;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.missing_back.domain.users.model.entity.User;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
public class UserSignUpRequest {

	@NotBlank(message = "유저 아이디는 필수 입력 값입니다.")
	@JsonProperty("login_id")
	private String loginId;

	@NotBlank(message = "유저 비밀번호는 필수 입력 값입니다.")
	private String password;

	@NotBlank(message = "유저 이름은 필수 입력 값입니다.")
	private String name;

	@NotBlank(message = "유저 성별은 필수 입력 값입니다")
	private int gender;

	@NotBlank(message = "유저 나이는 필수 입력 값입니다.")
	private int age;

	@NotBlank(message = "유저 주소는 필수 입력 값입니다.")
	private String address;

	@NotBlank(message = "유저 신장(키)는 필수 입력 값입니다.")
	private int height;

	@NotBlank(message = "유저 전화번호는 필수 입력 값입니다.")
	private String phone;

	@Setter
	@JsonProperty("face_img")
	private String faceImg;

	private List<Map<String, String>> contacts;

	public User toEntity(String encodedPassword) {
		return User.builder()
			.loginId(loginId)
			.password(encodedPassword)
			.name(name)
			.gender(gender)
			.age(age)
			.address(address)
			.height(height)
			.phone(phone)
			.faceImg(faceImg)
			.build();
	}
}
