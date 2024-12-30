package com.ssafy.missing_back.domain.users.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.missing_back.domain.cautions.model.entity.DangerousSituation;
import com.ssafy.missing_back.domain.cautions.repository.DangerousSituationRepository;
import com.ssafy.missing_back.domain.users.model.dto.request.UserGpsRequest;
import com.ssafy.missing_back.domain.users.model.dto.request.UserSignUpRequest;
import com.ssafy.missing_back.domain.users.model.dto.response.AppearanceResponse;
import com.ssafy.missing_back.domain.users.model.dto.response.ContactResponse;
import com.ssafy.missing_back.domain.users.model.dto.response.MyPageResponse;
import com.ssafy.missing_back.domain.users.model.dto.response.UserConditionResponse;
import com.ssafy.missing_back.domain.users.model.dto.response.UserFindResponse;
import com.ssafy.missing_back.domain.users.model.entity.AppearanceDetail;
import com.ssafy.missing_back.domain.users.model.entity.Contact;
import com.ssafy.missing_back.domain.users.model.entity.User;
import com.ssafy.missing_back.domain.users.repository.AppearanceDetailRepository;
import com.ssafy.missing_back.domain.users.repository.ContactRepository;
import com.ssafy.missing_back.domain.users.repository.UserRepository;
import com.ssafy.missing_back.global.auth.jwt.JwtTokenProvider;
import com.ssafy.missing_back.global.auth.jwt.dto.JwtToken;
import com.ssafy.missing_back.global.common.UserInfoProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

	private static final String bucketName = "missingbucket1";

	private final AmazonS3 amazonS3;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final ContactRepository contactRepository;
	private final AppearanceDetailRepository appearanceDetailRepository;
	private final DangerousSituationRepository dangerousSituationRepository;
	private final FCMService fcmService;
	private final UserInfoProvider userInfoProvider;
	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;

	@Override
	@Transactional
	public UserFindResponse signUp(UserSignUpRequest userSignUpRequest, MultipartFile image) throws IOException {
		String encodedPassword = passwordEncoder.encode(userSignUpRequest.getPassword());

		String originalName = image.getOriginalFilename();
		int index = originalName.lastIndexOf(".");
		String filename = UUID.randomUUID() + "." + originalName.substring(index);

		try {
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(image.getContentType());
			objectMetadata.setContentLength(image.getInputStream().available());

			amazonS3.putObject(bucketName, filename, image.getInputStream(), objectMetadata);

			String faceImgUrl = amazonS3.getUrl(bucketName, filename).toString();
			userSignUpRequest.setFaceImg(faceImgUrl);
		} catch (IOException e) {
			throw new IOException("S3에 이미지 업로드 중 오류가 발생했습니다.", e);
		}

		User user = userRepository.save(userSignUpRequest.toEntity(encodedPassword));
		if (userSignUpRequest.getContacts() != null)
			createUserContacts(user, userSignUpRequest.getContacts());
		return UserFindResponse.toDto(user);
	}

	@Transactional
	public void createUserContacts(User user, List<Map<String, String>> contacts) {
		for (Map<String, String> contact : contacts) {
			User user2 = userRepository.findByPhone(contact.get("contact_phone")).orElse(null);
			contactRepository.save(Contact.builder().user1(user).user2(user2).build());
		}
	}

	@Override
	public JwtToken signIn(String loginId, String password) {
		// loginId + password를 기반으로 Authentication 객체 생성
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginId,
			password);
		// authenticate() 메서드를 통해 요청된 User에 대한 검증 진행
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
		// 인증 정보 기반으로 JWT 토큰 생성
		JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);
		// User user = userRepository.findByLoginId(loginId).get();
		// user.setRefreshToken(jwtToken.getRefreshToken());
		// userRepository.save(user);
		return jwtToken;
	}

	@Override
	@Transactional
	public void updateFcmToken(String loginId, String fcmToken) {
		if (fcmToken == null)
			return;
		userRepository.updateFcmTokenByLoginId(loginId, fcmToken);  // FCM 토큰 업데이트
	}

	@Override
	public void logout() {
		User user = userRepository.findByLoginId(userInfoProvider.getCurrentLoginId()).get();
		// user.setRefreshToken(null);
		// userRepository.save(user);
		SecurityContextHolder.clearContext();
	}

	@Override
	public void sendLocationNotification(UserGpsRequest userGpsRequest) {
		// 알림 내용 설정
		String title = "안전 유의 지역 알림";
		String body = "안전유의 지역에 접근하였습니다. \n"
			+ "인상착의를 등록하시겠습니까?\n";
		String url = "http: //localhost:3000";

		// FCM을 통해 알림 전송
		fcmService.sendNotification(userInfoProvider.getCurrentUser().getFcmToken(), title, body, url);
	}

	@Override
	public List<UserConditionResponse> getUserCondition() {
		User currentUser = userInfoProvider.getCurrentUser();
		List<Contact> contacts = contactRepository.findAllByUser1_UserId(currentUser.getUserId());

		List<UserConditionResponse> userConditionResponses = new ArrayList<>();

		for (Contact contact : contacts) {
			User user = contact.getUser2();
			DangerousSituation dangerousSituation = dangerousSituationRepository.findByUser_UserId(user.getUserId());
			userConditionResponses.add(UserConditionResponse.toDto(user, dangerousSituation));
		}

		return userConditionResponses;
	}

	@Override
	public MyPageResponse getMyPage() {
		User user = userInfoProvider.getCurrentUser();

		UserFindResponse userFindResponse = UserFindResponse.toDto(user);

		AppearanceDetail appearanceDetail = appearanceDetailRepository.findByUserId(user.getUserId());
		AppearanceResponse appearanceResponse = null;
		if (appearanceDetail != null)
			appearanceResponse = AppearanceResponse.toDto(appearanceDetailRepository.findByUserId(user.getUserId()));

		List<Contact> contacts = contactRepository.findAllByUser1_UserId(user.getUserId());
		List<ContactResponse> contactResponses = new ArrayList<>();
		for (Contact contact : contacts) {
			contactResponses.add(ContactResponse.toDto(contact.getContactId(), contact.getUser2()));
		}

		return MyPageResponse.toDto(userFindResponse, appearanceResponse, contactResponses);
	}

}
