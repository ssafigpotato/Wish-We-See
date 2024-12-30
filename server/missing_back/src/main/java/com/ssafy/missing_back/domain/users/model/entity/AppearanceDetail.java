package com.ssafy.missing_back.domain.users.model.entity;

import static jakarta.persistence.FetchType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import com.ssafy.missing_back.domain.users.model.dto.request.AppearanceCreateRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@Table(name = "appearance_details")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class AppearanceDetail {

	@Id
	@Column(name = "user_id", nullable = false)
	private Long userId;

	@OneToOne(fetch = LAZY)
	@MapsId
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "img_url")
	private String imgUrl;

	@Column(name = "top_color")
	private String topColor;

	@Column(name = "bottom_color")
	private String bottomColor;

	private String detail;

	@Builder.Default
	@Column(name = "created_at")
	private LocalDateTime createdAt = LocalDateTime.now();

	public void update(AppearanceCreateRequest request) {
		this.imgUrl = request.getImgUrl();
		this.topColor = request.getTopColor();
		this.bottomColor = request.getBottomColor();
		this.detail = request.getDetail();
		this.createdAt = LocalDateTime.now();
	}

}
