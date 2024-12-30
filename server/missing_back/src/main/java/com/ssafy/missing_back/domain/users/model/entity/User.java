package com.ssafy.missing_back.domain.users.model.entity;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.reports.model.entity.Report;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@Table(name = "users")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "user_id")
	private Long userId;

	@Column(name = "login_id", nullable = false)
	private String loginId;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "gender", nullable = false)
	private int gender;

	@Column(name = "age", nullable = false)
	private int age;

	@Column(name = "address", nullable = false)
	private String address;

	@Column(name = "height", nullable = false)
	private int height;

	@Column(name = "phone", nullable = false)
	private String phone;

	@Column(name = "face_img", nullable = false)
	private String faceImg;

	@Column(name = "fcm_token", nullable = false)
	private String fcmToken;

	@Builder.Default
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

	@Builder.Default
	@OneToMany(mappedBy = "user1", cascade = ALL, fetch = LAZY, orphanRemoval = true)
	private List<Contact> contactsFromMe = new ArrayList<>();

	@Builder.Default
	@OneToMany(mappedBy = "user2", cascade = ALL, fetch = LAZY, orphanRemoval = true)
	private List<Contact> contactsToMe = new ArrayList<>();

	@OneToOne(mappedBy = "user", cascade = ALL, fetch = LAZY, orphanRemoval = true)
	private AppearanceDetail appearanceDetail;

	@Builder.Default
	@OneToMany(mappedBy = "user", cascade = ALL, fetch = LAZY, orphanRemoval = true)
	private List<Report> reports = new ArrayList<>();

	@Builder.Default
	@OneToMany(mappedBy = "user", cascade = ALL, fetch = LAZY, orphanRemoval = true)
	private List<DangerousSituation> dangerousSituations = new ArrayList<>();

	@Override
	public String getUsername() {
		return this.loginId;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("ROLE_USER"));
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
