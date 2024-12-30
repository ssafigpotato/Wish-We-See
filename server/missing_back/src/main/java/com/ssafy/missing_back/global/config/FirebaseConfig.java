package com.ssafy.missing_back.global.config;

import java.io.FileNotFoundException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {

	@PostConstruct
	public void init() {
		try {
			InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json");
			if (serviceAccount == null) {
				throw new FileNotFoundException("serviceAccountKey.json 파일을 찾을 수 없습니다.");
			}
			FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();
			FirebaseApp.initializeApp(options);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
