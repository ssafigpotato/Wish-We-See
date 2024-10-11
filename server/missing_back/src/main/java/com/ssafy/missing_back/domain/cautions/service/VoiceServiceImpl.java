package com.ssafy.missing_back.domain.cautions.service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.missing_back.domain.cautions.model.dto.request.VoiceRequest;
import com.ssafy.missing_back.domain.cautions.model.dto.response.VoiceResponse;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.cautions.repository.DangerousSituationRepository;
import com.ssafy.missing_back.global.common.UserInfoProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VoiceServiceImpl implements VoiceService {
	private static final String bucketName = "missingbucket1";
	private static final String aiServerUrl = "http://222.107.238.44:8081/emergency/detect/"; // AI 서버 주소

	private final AmazonS3 amazonS3;
	private final RestTemplate restTemplate;
	private final UserInfoProvider userInfoProvider;
	private final DangerousSituationRepository dangerousSituationRepository;

	@Transactional
	@Override
	public VoiceResponse uploadFile(MultipartFile file) throws IOException {
		String fileName = file.getOriginalFilename(); // 파일 이름 가져오기
		InputStream inputStream = file.getInputStream();

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(file.getSize());
		metadata.setContentType(file.getContentType());

		// S3에 파일 업로드
		amazonS3.putObject(bucketName, fileName, inputStream, metadata);

		// 업로드 후 S3 파일 URL 반환
		String fileUrl = amazonS3.getUrl(bucketName, fileName).toString();

		// AI 서버로 파일 URL 전송 후 결과 받기
		String result = sendFileUrlToAIServer(fileUrl);

		ObjectMapper objectMapper = new ObjectMapper();

		JsonNode jsonNode = objectMapper.readTree(result);

		String classification = jsonNode.get("classification").asText();

		// AI 서버의 응답을 처리하여 프론트로 보낼 status 설정
		int status = processAiResponse(classification);

		// 위험 상황 레벨 table 업데이트 해주자
		if (status == 1) {  // 위험 상태인 경우
			updateDangerousSituationLevel(userInfoProvider.getCurrentUserId());  // 위험 레벨을 2로 업데이트
		}

		// VoiceResponse 생성 후 반환
		return VoiceResponse.toDto(status);
	}

	private String sendFileUrlToAIServer(String fileUrl) {

		// FileUrlRequest DTO 생성
		VoiceRequest fileUrlRequest = VoiceRequest.builder()
			.fileUrl(fileUrl)
			.build();

		try {
			String res = restTemplate.postForObject(aiServerUrl, fileUrlRequest, String.class);
			log.info("restTemplate 반환값: {}", res);
			return res;
		} catch (Exception e) {
			log.error("Error occurred while sending file URL to AI server: ", e);
			throw new RuntimeException("AI 서버와 통신 중 오류가 발생했습니다.");
		}

	}

	private int processAiResponse(String classification) {
		if (classification == null) {
			throw new IllegalArgumentException("AI 서버에서 classification 값이 null로 반환되었습니다.");
		}

		// classification에 따라 status 값을 설정
		if ("Dangerous".equalsIgnoreCase(classification)) {
			return 1;  // "danger"면 1
		} else if ("Safe".equalsIgnoreCase(classification)) {
			return 0;  // "safe"면 0
		} else {
			throw new IllegalArgumentException("알 수 없는 classification 값: " + classification);
		}
	}

	// 위험 상황 레벨 업데이트 메서드
	private void updateDangerousSituationLevel(Long userId) {
		DangerousSituation situation = dangerousSituationRepository.findByUser_UserId(userId);

		if (situation != null) {
			if (!situation.getIsClosed()) {  // 상황이 종료되지 않은 경우에만 업데이트
				situation.setDangerousLevel(2);  // 위험 레벨을 2로 설정
				dangerousSituationRepository.save(situation);
			} else {
				log.info("해당 사용자의 상황은 이미 종료되었습니다. 업데이트를 수행하지 않습니다. userId: {}", userId);
			}
		} else {
			log.warn("해당 사용자의 위험 상황을 찾을 수 없습니다. userId: {}", userId);
		}
	}
}
