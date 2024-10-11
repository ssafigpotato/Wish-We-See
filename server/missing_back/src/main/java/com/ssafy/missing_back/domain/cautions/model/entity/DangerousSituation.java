package com.ssafy.missing_back.domain.cautions.model.entity;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.ssafy.missing_back.domain.missing_persons.model.entity.AdditionalInfo;
import com.ssafy.missing_back.domain.reports.model.entity.Report;
import com.ssafy.missing_back.domain.users.model.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@Table(name = "dangerous_situations")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class DangerousSituation {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "situation_id")
	private Long situationId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Builder.Default
	@Column(name = "is_closed", nullable = false)
	private Boolean isClosed = false;

	@Column(name = "dangerous_level", nullable = false)
	private Integer dangerousLevel;

	@Builder.Default
	@OneToMany(mappedBy = "dangerousSituation", cascade = ALL, orphanRemoval = true, fetch = LAZY)
	private List<Voice> voices = new ArrayList<>();

	@Builder.Default
	@OneToMany(mappedBy = "dangerousSituation", cascade = ALL, orphanRemoval = true, fetch = LAZY)
	private List<Report> reports = new ArrayList<>();

	@Builder.Default
	@OneToMany(mappedBy = "dangerousSituation", cascade = ALL, orphanRemoval = true, fetch = LAZY)
	private List<GPS> gpsList = new ArrayList<>();

	@Builder.Default
	@OneToMany(mappedBy = "dangerousSituation", cascade = ALL, orphanRemoval = true, fetch = LAZY)
	private List<AdditionalInfo> additionalInfos = new ArrayList<>();

	// 상황이 종료되었음을 나타내기 위한 메서드
	public void closeSituation() {
		this.isClosed = true;
	}

	public void setDangerousLevel(int level) {
		this.dangerousLevel = level;
	}
}
