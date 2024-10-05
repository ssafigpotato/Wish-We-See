package com.ssafy.missing_back.domain.users.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.missing_back.domain.users.model.dto.request.AppearanceCreateRequest;

public interface AppearanceDetailService {

	void createAppearanceDetail(AppearanceCreateRequest appearanceCreateRequest, MultipartFile image) throws IOException;
}
