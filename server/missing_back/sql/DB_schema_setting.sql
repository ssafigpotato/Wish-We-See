DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`
(
    `user_id`    bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `login_id`   varchar(20)  NOT NULL,
    `password`   varchar(100) NOT NULL,
    `name`       varchar(20)  NOT NULL,
    `gender`     tinyint(1)	NOT NULL,
    `age`        int(11)	NOT NULL,
    `address`    point        NOT NULL,
    `height`     int(11)	NOT NULL,
    `phone`      varchar(20)  NOT NULL,
    `face_img`   text         NOT NULL,
    `created_at` datetime     NOT NULL DEFAULT now(),
    PRIMARY KEY (`user_id`)
);

DROP TABLE IF EXISTS `dangerous_situations`;
CREATE TABLE `dangerous_situations`
(
    `situation_id`    bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `user_id`         bigint(20)	NOT NULL,
    `created_at`      datetime NOT NULL DEFAULT now(),
    `is_closed`       boolean  NOT NULL DEFAULT false,
    `dangerous_level` smallint(2)	NOT NULL	DEFAULT 1,
    PRIMARY KEY (`situation_id`),
    CONSTRAINT `FK_users_TO_dangerous_situations_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

DROP TABLE IF EXISTS `dangerous_areas`;
CREATE TABLE `dangerous_areas`
(
    `location_id` bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `zone`        polygon NOT NULL,
    PRIMARY KEY (`location_id`)
);

DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports`
(
    `report_id`       bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `user_id`         bigint(20)	NOT NULL	COMMENT '제보자',
    `situation_id`    bigint(20)	NOT NULL,
    `report_content`  text NULL,
    `report_location` point    NOT NULL,
    `created_report`  datetime NOT NULL DEFAULT now(),
    PRIMARY KEY (`report_id`),
    CONSTRAINT `FK_users_TO_reports_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
    CONSTRAINT `FK_dangerous_situations_TO_reports_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`)
);

DROP TABLE IF EXISTS `dangerous_time`;
CREATE TABLE `dangerous_time`
(
    `time_id`    bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `start_time` time NOT NULL,
    `end_time`   time NOT NULL,
    PRIMARY KEY (`time_id`)
);

DROP TABLE IF EXISTS `appearance_details`;
CREATE TABLE `appearance_details`
(
    `user_id`      bigint(20)	NOT NULL,
    `img_url`      text NULL,
    `top_color`    varchar(100) NULL,
    `bottom_color` varchar(100) NULL,
    `detail`       text NULL,
    `created_at`   datetime NOT NULL DEFAULT now(),
    PRIMARY KEY (`user_id`),
    CONSTRAINT `FK_users_TO_appearance_details_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

DROP TABLE IF EXISTS `report_images`;
CREATE TABLE `report_images`
(
    `report_img_id`  bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `report_id`      bigint(20)	NOT NULL,
    `report_img_url` text NOT NULL,
    PRIMARY KEY (`report_img_id`),
    CONSTRAINT `FK_reports_TO_report_images_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`report_id`)
);

DROP TABLE IF EXISTS `voice`;
CREATE TABLE `voice`
(
    `voice_id`     bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `situation_id` bigint(20)	NOT NULL,
    `voice_url`    text     NOT NULL,
    `created_at`   datetime NOT NULL DEFAULT now(),
    PRIMARY KEY (`voice_id`),
    CONSTRAINT `FK_dangerous_situations_TO_voice_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`)
);

DROP TABLE IF EXISTS `gps`;
CREATE TABLE `gps`
(
    `gps_id`       bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `situation_id` bigint(20)	NOT NULL,
    `location`     point    NOT NULL,
    `created_at`   datetime NOT NULL DEFAULT now(),
    PRIMARY KEY (`gps_id`),
    CONSTRAINT `FK_dangerous_situations_TO_gps_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`)
);

DROP TABLE IF EXISTS `gyroscope`;
CREATE TABLE `gyroscope`
(
    `gyro_id`      bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `situation_id` bigint(20)	NOT NULL,
    `gyro_x`       float    NOT NULL,
    `gyro_y`       float    NOT NULL,
    `gyro_z`       float    NOT NULL,
    `created_at`   datetime NOT NULL DEFAULT now(),
    PRIMARY KEY (`gyro_id`),
    CONSTRAINT `FK_dangerous_situations_TO_gyroscope_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`)
);

DROP TABLE IF EXISTS `accelerometer`;
CREATE TABLE `accelerometer`
(
    `accelerometer_id` bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `situation_id`     bigint(20)	NOT NULL,
    `accelerometer_x`  float    NOT NULL,
    `accelerometer_y`  float    NOT NULL,
    `accelerometer_z`  float    NOT NULL,
    `created_at`       datetime NOT NULL DEFAULT now(),
    PRIMARY KEY (`accelerometer_id`),
    CONSTRAINT `FK_dangerous_situations_TO_accelerometer_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`)
);

DROP TABLE IF EXISTS `additional_infos`;
CREATE TABLE `additional_infos`
(
    `additional_info_id` bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `situation_id` bigint(20)	NOT NULL,
    `info`         text NULL,
    `created_at`   datetime NOT NULL DEFAULT now(),
    PRIMARY KEY (`additional_info_id`),
    CONSTRAINT `FK_dangerous_situations_TO_additional_infos_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`)
);

DROP TABLE IF EXISTS `additional_images`;
CREATE TABLE `additional_images`
(
    `additional_img_id`  bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `situation_id`       bigint(20)	NOT NULL,
    `additional_img_url` text NOT NULL,
    PRIMARY KEY (`additional_img_id`),
    CONSTRAINT `FK_dangerous_situations_TO_additional_images_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`)
);

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts`
(
    `contact_id` bigint(20)	NOT NULL AUTO_INCREMENT	COMMENT 'auto increment',
    `user_id`    bigint(20)	NOT NULL,
    `user_id2`   bigint(20)	NOT NULL,
    `accept`     boolean  NOT NULL,
    `created_at` datetime NOT NULL DEFAULT now(),
    PRIMARY KEY (`contact_id`),
    CONSTRAINT `FK_users_TO_contacts_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
    CONSTRAINT `FK_users_TO_contacts_2` FOREIGN KEY (`user_id2`) REFERENCES `users` (`user_id`)
);
