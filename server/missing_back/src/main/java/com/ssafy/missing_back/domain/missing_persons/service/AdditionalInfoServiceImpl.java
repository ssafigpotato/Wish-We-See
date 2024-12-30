package com.ssafy.missing_back.domain.missing_persons.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.cautions.repository.DangerousSituationRepository;
import com.ssafy.missing_back.domain.missing_persons.model.dto.request.AdditionalInfoRequest;
import com.ssafy.missing_back.domain.missing_persons.model.dto.response.AdditionalInfoCreateResponse;
import com.ssafy.missing_back.domain.missing_persons.model.entity.AdditionalInfo;
import com.ssafy.missing_back.domain.missing_persons.repository.AdditionalInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdditionalInfoServiceImpl implements AdditionalInfoService {

	private static final String bucketName = "missingbucket1";

	private final AmazonS3 amazonS3;
	private final AdditionalInfoRepository additionalInfoRepository;
	private final DangerousSituationRepository dangerousSituationRepository;

	@Override
	@Transactional
	public AdditionalInfoCreateResponse createAdditionalInfo(AdditionalInfoRequest additionalInfoRequest,
		MultipartFile additionalImg) throws IOException {

		String originalName = additionalImg.getOriginalFilename();
		int index = originalName.lastIndexOf(".");
		String filename = UUID.randomUUID() + "." + originalName.substring(index);

		try {
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(additionalImg.getContentType());
			objectMetadata.setContentLength(additionalImg.getInputStream().available());

			amazonS3.putObject(bucketName, filename, additionalImg.getInputStream(), objectMetadata);

			String imgUrl = amazonS3.getUrl(bucketName, filename).toString();
			additionalInfoRequest.setAdditionalImgUrl(imgUrl);

			DangerousSituation dangerousSituation = dangerousSituationRepository.findByUser_UserId(
				additionalInfoRequest.getMissingPersonId());

			AdditionalInfo additionalInfo = additionalInfoRepository.findByDangerousSituation_SituationId(
				dangerousSituation.getSituationId());
			if (additionalInfo != null) {
				additionalInfo.update(additionalInfoRequest);
				return AdditionalInfoCreateResponse.toDto(additionalInfoRepository.save(additionalInfo));
			} else {
				return AdditionalInfoCreateResponse.toDto(
					additionalInfoRepository.save(additionalInfoRequest.toEntity(dangerousSituation)));
			}

		} catch (IOException e) {
			throw new IOException("S3에 이미지 업로드 중 오류가 발생했습니다.", e);
		}
	}

}
