package com.ssafy.missing_back.domain.cautions.service;

import com.ssafy.missing_back.domain.cautions.model.dto.request.SituationRequest;

public interface SituationService {
	void EndSituation(SituationRequest situationRequest);
}
