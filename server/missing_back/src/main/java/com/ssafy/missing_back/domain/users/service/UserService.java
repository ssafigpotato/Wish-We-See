package com.ssafy.missing_back.domain.users.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.missing_back.domain.users.model.dto.request.UserGpsRequest;
import com.ssafy.missing_back.domain.users.model.dto.request.UserSignUpRequest;
import com.ssafy.missing_back.domain.users.model.dto.response.MyPageResponse;
import com.ssafy.missing_back.domain.users.model.dto.response.UserConditionResponse;
import com.ssafy.missing_back.domain.users.model.dto.response.UserFindResponse;
import com.ssafy.missing_back.global.auth.jwt.dto.JwtToken;

public interface UserService {

	UserFindResponse signUp(UserSignUpRequest userSignUpRequest, MultipartFile image) throws IOException;

	JwtToken signIn(String loginId, String password);

	void updateFcmToken(String loginId, String fcmToken);

	void logout();

	void sendLocationNotification(UserGpsRequest userGpsRequest);

	List<UserConditionResponse> getUserCondition();

	MyPageResponse getMyPage();
}
