package com.ssafy.missing_back.domain.missing_persons.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.missing_back.domain.missing_persons.model.dto.request.AdditionalInfoRequest;
import com.ssafy.missing_back.domain.missing_persons.model.dto.response.AdditionalInfoCreateResponse;

public interface AdditionalInfoService {

	AdditionalInfoCreateResponse createAdditionalInfo(AdditionalInfoRequest additionalInfoRequest,
		MultipartFile additionalImg) throws IOException;
}
