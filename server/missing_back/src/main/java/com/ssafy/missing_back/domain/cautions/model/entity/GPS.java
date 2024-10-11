package com.ssafy.missing_back.domain.cautions.model.entity;

import static jakarta.persistence.FetchType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Table(name = "gps")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class GPS {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "gps_id")
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "situation_id", nullable = false)
	private DangerousSituation dangerousSituation;

	@Column(name = "location_latitude")
	private Float locationLatitude;

	@Column(name = "location_longitude")
	private Float locationLongitude;

	@Builder.Default
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

}
