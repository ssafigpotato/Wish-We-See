package com.ssafy.missing_back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MissingBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(MissingBackApplication.class, args);
	}

}
