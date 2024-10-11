package com.ssafy.missing_back.domain.missing_persons.model.entity;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.missing_persons.model.dto.request.AdditionalInfoRequest;

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
@Table(name = "additional_infos")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class AdditionalInfo {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "additional_info_id")
	private Long additionalInfoId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "situation_id", nullable = false)
	private DangerousSituation dangerousSituation;

	@Column(name = "info")
	private String info;

	@Column(name = "additional_img_url")
	private String additionalImgUrl;

	@Builder.Default
	@Column(name = "created_at")
	private LocalDateTime createdAt = LocalDateTime.now();

	public void update(AdditionalInfoRequest additionalInfo) {
		this.info = additionalInfo.getAdditionalContent();
		this.additionalImgUrl = additionalInfo.getAdditionalImgUrl();
		this.createdAt = LocalDateTime.now();
	}

}
