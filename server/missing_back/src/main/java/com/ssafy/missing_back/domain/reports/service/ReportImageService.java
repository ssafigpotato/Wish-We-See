package com.ssafy.missing_back.domain.reports.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.missing_back.domain.reports.model.entity.Report;

public interface ReportImageService {
	List<String> saveReportImages(Long reportId, List<MultipartFile> reportImages) throws IOException;

	String saveReportImage(MultipartFile multipartFile, Report report);
}
