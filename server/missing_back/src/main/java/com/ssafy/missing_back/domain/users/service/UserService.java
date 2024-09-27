package com.ssafy.missing_back.domain.users.service;

import com.ssafy.missing_back.global.auth.jwt.dto.JwtToken;

public interface UserService {

	JwtToken signIn(String loginId, String password);
}
