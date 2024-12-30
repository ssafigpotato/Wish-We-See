package com.ssafy.missing_back.domain.missing_persons.service;

import java.util.List;

import com.ssafy.missing_back.domain.missing_persons.model.dto.request.MissingPersonRequest;
import com.ssafy.missing_back.domain.missing_persons.model.dto.response.MissingPersonDetailResponse;

public interface MissingPersonService {

	List<MissingPersonDetailResponse> getAllMissingPersonDetails();

	MissingPersonDetailResponse getMissingPersonDetail(Long situationId);

	void updateMissingPerson(MissingPersonRequest missingPersonRequest);
}
