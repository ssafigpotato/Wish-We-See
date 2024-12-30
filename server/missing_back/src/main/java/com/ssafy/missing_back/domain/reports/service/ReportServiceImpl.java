package com.ssafy.missing_back.domain.reports.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.cautions.repository.DangerousSituationRepository;
import com.ssafy.missing_back.domain.reports.model.dto.request.ReportCreateRequest;
import com.ssafy.missing_back.domain.reports.model.dto.request.SilhouetteRequest;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportDetailResponse;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportListResponse;
import com.ssafy.missing_back.domain.reports.model.dto.response.ReportResponse;
import com.ssafy.missing_back.domain.reports.model.entity.Report;
import com.ssafy.missing_back.domain.reports.repository.ReportRepository;
import com.ssafy.missing_back.domain.users.model.entity.User;
import com.ssafy.missing_back.global.common.UserInfoProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
// @Transactional(readOnly = true)
public class ReportServiceImpl implements ReportService {

	private static final String bucketName = "missingbucket1";
	private static final String aiServerUrl = "http://222.107.238.44:8081/compare/silhouette/"; // AI 서버 주소

	private final AmazonS3 amazonS3;
	private final ReportRepository reportRepository;
	private final DangerousSituationRepository dangerousSituationRepository;
	private final RestTemplate restTemplate;
	private final UserInfoProvider userInfoProvider;

	@Override
	public ReportListResponse getReports(Long dangerousSituationId) {
		DangerousSituation dangerousSituation = dangerousSituationRepository.findById(dangerousSituationId)
			.orElseThrow(() -> new IllegalArgumentException("해당 위험 상황이 존재하지 않습니다."));

		List<Report> reports = reportRepository.findAllByDangerousSituation_SituationId(dangerousSituationId);
		List<ReportDetailResponse> reportDetailResponses = reports.stream()
			.map(ReportDetailResponse::toDto)
			.toList();

		User missingUser = dangerousSituation.getUser();
		return ReportListResponse.toDto(missingUser, reportDetailResponses);
	}

	@Override
	public ReportDetailResponse getReport(Long reportId) {
		Report report = reportRepository.findById(reportId)
			.orElseThrow(() -> new IllegalArgumentException("해당 신고가 존재하지 않습니다."));

		return ReportDetailResponse.toDto(report);
	}

	@Override
	// @Transactional
	public ReportResponse createReport(Long dangerousSituationId, ReportCreateRequest reportCreateRequest,
		MultipartFile image) throws
		IOException {

		String originalName = image.getOriginalFilename();
		int index = originalName.lastIndexOf(".");
		String filename = UUID.randomUUID() + "." + originalName.substring(index);

		try {
			BufferedImage originalImage = ImageIO.read(image.getInputStream());

			// 2. 좌표값을 String에서 Double로 변환
			Double startX = Double.parseDouble(reportCreateRequest.getStartX());
			Double startY = Double.parseDouble(reportCreateRequest.getStartY());
			Double endX = Double.parseDouble(reportCreateRequest.getEndX());
			Double endY = Double.parseDouble(reportCreateRequest.getEndY());

			// 3. 좌표값으로 너비와 높이 계산 (소수점 단위 유지 후 반올림)
			int x1 = (int)Math.round(startX); // 반올림
			int y1 = (int)Math.round(startY);
			int x2 = (int)Math.round(endX);
			int y2 = (int)Math.round(endY);

			int width = x2 - x1;
			int height = y2 - y1;

			// 4. 좌표값을 사용해 이미지의 특정 영역을 자름
			BufferedImage croppedImage = originalImage.getSubimage(x1, y1, width, height);

			// 4. 자른 이미지를 메모리에서 처리하기 위해 ByteArrayOutputStream으로 변환
			ByteArrayOutputStream os = new ByteArrayOutputStream();
			ImageIO.write(croppedImage, originalName.substring(index + 1), os);
			byte[] imageBytes = os.toByteArray();

			// 5. ByteArrayInputStream으로 변환하여 Amazon S3에 업로드
			ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
			ObjectMetadata croppedMetadata = new ObjectMetadata();
			croppedMetadata.setContentType(image.getContentType());
			croppedMetadata.setContentLength(imageBytes.length);

			String croppedFilename = UUID.randomUUID() + "_cropped." + originalName.substring(index + 1);
			amazonS3.putObject(bucketName, croppedFilename, inputStream, croppedMetadata);
			String croppedImageUrl = amazonS3.getUrl(bucketName, croppedFilename).toString();

			// 6. ReportCreateRequest에 자른 이미지 URL 저장
			reportCreateRequest.setReportImgUrl(croppedImageUrl);

/*
			// ObjectMetadata objectMetadata = new ObjectMetadata();
			// objectMetadata.setContentType(image.getContentType());
			// objectMetadata.setContentLength(image.getInputStream().available());
			//
			// amazonS3.putObject(bucketName, filename, image.getInputStream(), objectMetadata);
			//
			// String reportImgUrl = amazonS3.getUrl(bucketName, filename).toString();
			// reportCreateRequest.setReportImgUrl(reportImgUrl);
*/

			User user = userInfoProvider.getCurrentUser();
			DangerousSituation dangerousSituation = dangerousSituationRepository.findById(dangerousSituationId)
				.orElseThrow(() -> new IllegalArgumentException("해당 위험 상황이 존재하지 않습니다."));
			Report report = reportRepository.save(reportCreateRequest.toEntity(user, dangerousSituation));

			String result = sendFileUrlToAIServer(croppedImageUrl, dangerousSituationId);

			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(result);

			JsonNode similarityScoreNode = jsonNode.get("similarity_score");
			Double faceScore = similarityScoreNode.get("face").asDouble();
			Double bodyScore = similarityScoreNode.get("body").asDouble();

			log.info("faceScore: {}", faceScore);
			log.info("bodyScore: {}", bodyScore);
			// 얼굴과 상의가 0.7 이상이면 통과
			if (faceScore >= 0.5) {
				log.info("이멀전시");
			} else {
				log.info("이멀전시 아님");
			}

			return ReportResponse.toDto(report);
		} catch (IOException e) {
			throw new IOException("S3에 이미지 업로드 중 오류가 발생했습니다.", e);
		}
	}

	private String sendFileUrlToAIServer(String fileUrl, Long situationId) {
		SilhouetteRequest silhouetteRequest = SilhouetteRequest.builder()
			.imageUrl(fileUrl)
			.situationId(situationId)
			.build();

		try {
			String res = restTemplate.postForObject(aiServerUrl, silhouetteRequest, String.class);
			log.info("restTemplate 반환값: {}", res);
			return res;
		} catch (Exception e) {
			throw new RuntimeException("AI 서버와 통신 중 오류가 발생했습니다.", e);
		}
	}

}
