package com.ssafy.missing_back.domain.cautions.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.missing_back.domain.cautions.model.dto.request.GpsRequest;
import com.ssafy.missing_back.domain.cautions.model.dto.request.SituationRequest;
import com.ssafy.missing_back.domain.cautions.service.LatestLocationService;
import com.ssafy.missing_back.domain.cautions.service.SituationService;
import com.ssafy.missing_back.domain.cautions.service.VoiceService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/cautions")
public class CautionsController {
	private final VoiceService voiceService;
	private final LatestLocationService latestLocationService;
	private final SituationService situationService;

	@Operation(summary = "voice 파일 받기")
	@PostMapping("/voice")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
		return ResponseEntity.status(HttpStatus.OK).body(voiceService.uploadFile(file));
	}

	@Operation(summary = "마지막 위치 값 받기")
	@PostMapping("/gps")
	public ResponseEntity<?> LatestLocation(@RequestBody GpsRequest gpsRequest) {
		latestLocationService.LatestLocation(gpsRequest);
		return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Notification sent!"));
	}

	@Operation(summary = "위험 상황 아닐 시 상황 종료")
	@PostMapping("/end")
	public ResponseEntity<?> EndSituation(@RequestBody SituationRequest situationRequest) {
		situationService.EndSituation(situationRequest);
		return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Situation end!"));
	}
}
