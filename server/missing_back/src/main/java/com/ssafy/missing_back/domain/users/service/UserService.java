package com.ssafy.missing_back.domain.users.service;

import com.ssafy.missing_back.domain.users.model.dto.request.UserSignUpRequest;
import com.ssafy.missing_back.domain.users.model.dto.response.UserFindResponse;
import com.ssafy.missing_back.global.auth.jwt.dto.JwtToken;

public interface UserService {

	UserFindResponse signUp(UserSignUpRequest userSignUpRequest);

	JwtToken signIn(String loginId, String password);

	void logout();
}
