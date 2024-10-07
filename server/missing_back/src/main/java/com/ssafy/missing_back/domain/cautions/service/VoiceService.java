package com.ssafy.missing_back.domain.cautions.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.missing_back.domain.cautions.model.dto.response.VoiceResponse;

public interface VoiceService {
	VoiceResponse uploadFile(MultipartFile file) throws IOException;
}
