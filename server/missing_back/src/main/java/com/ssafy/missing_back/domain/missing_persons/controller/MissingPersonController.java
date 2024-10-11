package com.ssafy.missing_back.domain.missing_persons.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.missing_back.domain.missing_persons.model.dto.request.AdditionalInfoRequest;
import com.ssafy.missing_back.domain.missing_persons.model.dto.request.MissingPersonRequest;
import com.ssafy.missing_back.domain.missing_persons.model.dto.response.AdditionalInfoCreateResponse;
import com.ssafy.missing_back.domain.missing_persons.service.AdditionalInfoService;
import com.ssafy.missing_back.domain.missing_persons.service.MissingPersonService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/missing-persons")
public class MissingPersonController {

	private final MissingPersonService missingPersonService;
	private final AdditionalInfoService additionalInfoService;

	@Operation(summary = "실종자 추가정보 전송")
	@PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> addMissingPersonDetail(
		@Valid @RequestPart(value = "additional_info") String additionalInfo,
		@RequestPart(value = "additional_image") MultipartFile image) throws IOException {

		ObjectMapper objectMapper = new ObjectMapper();
		AdditionalInfoRequest additionalInfoRequest = objectMapper.readValue(additionalInfo,
			AdditionalInfoRequest.class);

		AdditionalInfoCreateResponse additionalInfoCreateResponse = additionalInfoService.createAdditionalInfo(
			additionalInfoRequest, image);
		return ResponseEntity.status(HttpStatus.CREATED).body(additionalInfoCreateResponse);
	}

	@Operation(summary = "실종자 전체정보 조회")
	@GetMapping("/all")
	public ResponseEntity<?> getAllMissingPersonDetails() {
		return ResponseEntity.ok(missingPersonService.getAllMissingPersonDetails());
	}

	@Operation(summary = "실종자 상세정보 조회")
	@GetMapping
	public ResponseEntity<?> getMissingPersonDetail(@RequestParam("situation_id") Long situationId) {
		return ResponseEntity.ok(missingPersonService.getMissingPersonDetail(situationId));
	}

	@Operation(summary = "실종자 발생 update")
	@PostMapping("/missing")
	public ResponseEntity<?> updateMissingPerson(@RequestBody MissingPersonRequest missingPersonRequest) {
		missingPersonService.updateMissingPerson(missingPersonRequest);
		return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Register MissingPerson!"));
	}
}
