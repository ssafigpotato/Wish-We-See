package com.ssafy.missing_back.domain.users.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.missing_back.domain.cautions.repository.DangerousSituationRepository;
import com.ssafy.missing_back.domain.users.model.dto.request.AppearanceCreateRequest;
import com.ssafy.missing_back.domain.users.model.dto.request.AppearanceImageRequest;
import com.ssafy.missing_back.domain.users.model.entity.AppearanceDetail;
import com.ssafy.missing_back.domain.users.model.entity.User;
import com.ssafy.missing_back.domain.users.repository.AppearanceDetailRepository;
import com.ssafy.missing_back.global.common.UserInfoProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AppearanceDetailServiceImpl implements AppearanceDetailService {

	private static final String bucketName = "missingbucket1";
	private static final String aiServerUrl = "http://222.107.238.44:8081/vectorizer/vectorize/"; // AI 서버 주소

	private final AmazonS3 amazonS3;
	private final AppearanceDetailRepository appearanceDetailRepository;
	private final DangerousSituationRepository dangerousSituationRepository;
	private final RestTemplate restTemplate;
	private final UserInfoProvider userInfoProvider;

	@Override
	@Transactional
	public void createAppearanceDetail(AppearanceCreateRequest appearanceCreateRequest, MultipartFile image) throws
		IOException {

		String originalName = image.getOriginalFilename();
		int index = originalName.lastIndexOf(".");
		String filename = UUID.randomUUID() + "." + originalName.substring(index);

		try {
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(image.getContentType());
			objectMetadata.setContentLength(image.getInputStream().available());

			amazonS3.putObject(bucketName, filename, image.getInputStream(), objectMetadata);

			String imgUrl = amazonS3.getUrl(bucketName, filename).toString();
			appearanceCreateRequest.setImgUrl(imgUrl);
			User currentUser = userInfoProvider.getCurrentUser();

			AppearanceDetail existingDetail = appearanceDetailRepository.findByUserId(currentUser.getUserId());
			if (existingDetail != null) {
				existingDetail.update(appearanceCreateRequest);
				appearanceDetailRepository.save(existingDetail);
			} else {
				AppearanceDetail appearanceDetail = appearanceCreateRequest.toEntity(currentUser);
				appearanceDetailRepository.save(appearanceDetail);
			}
			sendFileUrlToAIServer(imgUrl,
				dangerousSituationRepository.findByUser_UserId(currentUser.getUserId()).getSituationId());
		} catch (IOException e) {
			throw new IOException("S3에 이미지 업로드 중 오류가 발생했습니다.", e);
		}
	}

	private void sendFileUrlToAIServer(String fileUrl, Long situationId) {
		AppearanceImageRequest appearanceImageRequest = AppearanceImageRequest.builder()
			.imageUrl(fileUrl)
			.situationId(situationId)
			.build();

		try {
			String res = restTemplate.postForObject(aiServerUrl, appearanceImageRequest, String.class);
			log.info("restTemplate 반환값: {}", res);
		} catch (Exception e) {
			throw new RuntimeException("AI 서버와 통신 중 오류가 발생했습니다.", e);
		}
	}
}
