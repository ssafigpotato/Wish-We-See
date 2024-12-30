package com.ssafy.missing_back.domain.reports.model.entity;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.users.model.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@Table(name = "reports")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class Report {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "report_id")
	private Long reportId;

	// 제보자
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "situation_id", nullable = false)
	private DangerousSituation dangerousSituation;

	@Column(name = "report_content")
	private String reportContent;

	@Column(name = "report_location_latitude")
	private float reportLocationLatitude;

	@Column(name = "report_location_longitude")
	private float reportLocationLongitude;

	@Column(name = "report_img_url")
	private String reportImgUrl;

	@Builder.Default
	@Column(name = "created_at")
	private LocalDateTime createdAt = LocalDateTime.now();

}