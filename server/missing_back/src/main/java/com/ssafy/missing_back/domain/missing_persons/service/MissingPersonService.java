package com.ssafy.missing_back.domain.missing_persons.service;

import com.ssafy.missing_back.domain.missing_persons.model.dto.response.MissingPersonDetailResponse;

public interface MissingPersonService {

	MissingPersonDetailResponse getMissingPersonDetail(Long situationId);
}
