package com.ssafy.missing_back.domain.cautions.service;

import com.ssafy.missing_back.domain.cautions.model.dto.request.GpsRequest;

public interface LatestLocationService {
	void LatestLocation(GpsRequest gpsRequest);
}
