package com.ssafy.missing_back.domain.users.service;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FCMService {

	public void sendNotification(String token, String title, String body, String url) {
		try {
			Message message = Message.builder()
				.setToken(token)  // Firebase 클라이언트 토큰
				.setNotification(Notification.builder()
					.setTitle(title)
					.setBody(body)
					.build())
				.putData("click_action", url)
				.build();

			String response = FirebaseMessaging.getInstance().send(message);
			log.info("FCM 메시지 전송 완료: {}", response);
		} catch (Exception e) {
			log.error("FCM 메시지 전송 실패: {}", e.getMessage());
		}
	}
}
