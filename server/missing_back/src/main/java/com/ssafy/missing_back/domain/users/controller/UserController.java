package com.ssafy.missing_back.domain.users.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.missing_back.domain.users.model.dto.request.AppearanceCreateRequest;
import com.ssafy.missing_back.domain.users.model.dto.request.UserGpsRequest;
import com.ssafy.missing_back.domain.users.model.dto.request.UserSignInRequest;
import com.ssafy.missing_back.domain.users.model.dto.request.UserSignUpRequest;
import com.ssafy.missing_back.domain.users.model.dto.response.UserFindResponse;
import com.ssafy.missing_back.domain.users.service.AppearanceDetailService;
import com.ssafy.missing_back.domain.users.service.UserService;
import com.ssafy.missing_back.global.auth.jwt.dto.JwtToken;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

	private final UserService userService;
	private final AppearanceDetailService appearanceDetailService;

	@Operation(summary = "회원가입")
	@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> signUp(@Valid @RequestPart(value = "user_detail") String userDetail,
		@RequestPart(value = "user_image") MultipartFile image) throws IOException {

		// JSON 문자열을 객체로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		UserSignUpRequest userSignUpRequest = objectMapper.readValue(userDetail, UserSignUpRequest.class);

		UserFindResponse userFindResponse = userService.signUp(userSignUpRequest, image);
		return ResponseEntity.status(HttpStatus.CREATED).body(userFindResponse);
	}

	@Operation(summary = "로그인")
	@PostMapping("/login")
	public ResponseEntity<?> signIn(@Valid @RequestBody UserSignInRequest userSignInRequest) {
		String loginId = userSignInRequest.getLoginId();
		String password = userSignInRequest.getPassword();
		String fcmToken = userSignInRequest.getFcmToken();

		//fcm token을 db에 넣어준다.
		userService.updateFcmToken(loginId, fcmToken);

		JwtToken jwtToken = userService.signIn(loginId, password);
		return ResponseEntity.status(HttpStatus.OK).body(jwtToken);
	}

	@Operation(summary = "로그아웃")
	@PostMapping("/logout")
	public ResponseEntity<?> logout() {
		userService.logout();
		return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Logout successful!"));
	}

	@Operation(summary = "gps 값 받아서 위험 알림 보내기")
	@PostMapping("/gps")
	public ResponseEntity<?> gps(@RequestBody UserGpsRequest userGpsRequest) {
		// 경도와 위도를 받아서 Firebase 알림을 전송
		userService.sendLocationNotification(userGpsRequest);
		return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Notification sent!"));
	}

	@Operation(summary = "인상착의 사진과 정보 받기")
	@PostMapping(value = "/appearances", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> createAppearanceDetail(@RequestPart(value = "appearance_detail") String appearanceDetail,
		@RequestPart(value = "appearance_image") MultipartFile image) throws IOException {

		// JSON 문자열을 객체로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		AppearanceCreateRequest appearanceCreateRequest = objectMapper.readValue(appearanceDetail,
			AppearanceCreateRequest.class);

		appearanceDetailService.createAppearanceDetail(appearanceCreateRequest, image);

		return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "인상착의 사진 및 정보 저장 완료!"));
	}

	@Operation(summary = "지인 위험 정보 리스트 전송")
	@GetMapping("/conditions")
	public ResponseEntity<?> getUserCondition() {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getUserCondition());
	}

	@Operation(summary = "내 정보 조회")
	@GetMapping
	public ResponseEntity<?> getMyPage() {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getMyPage());
	}


}
