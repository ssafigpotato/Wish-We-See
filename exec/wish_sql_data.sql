CREATE DATABASE  IF NOT EXISTS `missing` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `missing`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: j11a202.p.ssafy.io    Database: missing
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accelerometer`
--

DROP TABLE IF EXISTS `accelerometer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accelerometer` (
  `accelerometer_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `situation_id` bigint NOT NULL,
  `accelerometer_x` float NOT NULL,
  `accelerometer_y` float NOT NULL,
  `accelerometer_z` float NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`accelerometer_id`),
  KEY `FK_dangerous_situations_TO_accelerometer_1` (`situation_id`),
  CONSTRAINT `FK_dangerous_situations_TO_accelerometer_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accelerometer`
--

LOCK TABLES `accelerometer` WRITE;
/*!40000 ALTER TABLE `accelerometer` DISABLE KEYS */;
/*!40000 ALTER TABLE `accelerometer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `additional_infos`
--

DROP TABLE IF EXISTS `additional_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `additional_infos` (
  `additional_info_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `situation_id` bigint NOT NULL,
  `info` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `additional_img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`additional_info_id`),
  KEY `FK_dangerous_situations_TO_additional_infos_1` (`situation_id`),
  CONSTRAINT `FK_dangerous_situations_TO_additional_infos_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `additional_infos`
--

LOCK TABLES `additional_infos` WRITE;
/*!40000 ALTER TABLE `additional_infos` DISABLE KEYS */;
INSERT INTO `additional_infos` VALUES (1,1,'키가 작았습니다.','2024-10-10 23:36:08','https://missingbucket1.s3.amazonaws.com/b9021a55-5cd4-480f-8f26-4385abd70b76..jpg'),(2,2,'반바지를 입고 있습니다.','2024-10-08 09:58:09','https://missingbucket1.s3.amazonaws.com/36ec3d13-73c6-4bfa-a411-404551a572ea..jpg'),(3,3,'코트를 입고 있습니다.','2024-10-08 09:58:09','https://missingbucket1.s3.amazonaws.com/36ec3d13-73c6-4bfa-a411-404551a572ea..jpg');
/*!40000 ALTER TABLE `additional_infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appearance_details`
--

DROP TABLE IF EXISTS `appearance_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appearance_details` (
  `user_id` bigint NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `top_color` varchar(255) DEFAULT NULL,
  `bottom_color` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FK_users_TO_appearance_details_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appearance_details`
--

LOCK TABLES `appearance_details` WRITE;
/*!40000 ALTER TABLE `appearance_details` DISABLE KEYS */;
INSERT INTO `appearance_details` VALUES (1,'https://missingbucket1.s3.amazonaws.com/46491411-7dd5-4f39-bc9a-0aeada2e2c3d..jpg','회색','검은색','눈이 작음','2024-10-11 00:51:38'),(2,'https://missingbucket1.s3.amazonaws.com/80dc577c-ba32-4b4b-9506-39c990979e79..jpg','갈색 셔츠','검은색 바지','얼굴 오른쪽에 점이 있습니다. ','2024-10-08 05:14:50'),(3,'https://missingbucket1.s3.amazonaws.com/80dc577c-ba32-4b4b-9506-39c990979e79..jpg','보라색 셔츠','검은색 바지','키가 컸습니다.','2024-10-08 05:14:50'),(4,'https://missingbucket1.s3.amazonaws.com/80dc577c-ba32-4b4b-9506-39c990979e79..jpg','보라색 셔츠','검은색 바지','나이는 30대 정도였습니다. ','2024-10-08 05:14:50');
/*!40000 ALTER TABLE `appearance_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `contact_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `accept` tinyint(1) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `user1_id` bigint NOT NULL,
  `user2_id` bigint NOT NULL,
  PRIMARY KEY (`contact_id`),
  KEY `FKodp5be0anhkx5inng7nnvkna` (`user2_id`),
  KEY `FKqst3wws0hb8xivubrlav1j1ar` (`user1_id`),
  CONSTRAINT `FKodp5be0anhkx5inng7nnvkna` FOREIGN KEY (`user2_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKqst3wws0hb8xivubrlav1j1ar` FOREIGN KEY (`user1_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,0,'2024-10-01 05:39:16',1,3),(2,0,'2024-10-01 05:39:16',1,102),(3,0,'2024-10-01 05:39:16',2,101),(4,0,'2024-10-01 05:39:16',2,102),(5,0,'2024-10-01 05:39:16',3,1),(6,0,'2024-10-01 05:39:16',3,103);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dangerous_areas`
--

DROP TABLE IF EXISTS `dangerous_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dangerous_areas` (
  `location_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `zone` polygon NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dangerous_areas`
--

LOCK TABLES `dangerous_areas` WRITE;
/*!40000 ALTER TABLE `dangerous_areas` DISABLE KEYS */;
/*!40000 ALTER TABLE `dangerous_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dangerous_situations`
--

DROP TABLE IF EXISTS `dangerous_situations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dangerous_situations` (
  `situation_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `user_id` bigint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_closed` tinyint(1) NOT NULL DEFAULT '0',
  `dangerous_level` int NOT NULL,
  PRIMARY KEY (`situation_id`),
  KEY `FK_users_TO_dangerous_situations_1` (`user_id`),
  CONSTRAINT `FK_users_TO_dangerous_situations_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dangerous_situations`
--

LOCK TABLES `dangerous_situations` WRITE;
/*!40000 ALTER TABLE `dangerous_situations` DISABLE KEYS */;
INSERT INTO `dangerous_situations` VALUES (1,1,'2024-10-06 00:00:00',0,2),(2,2,'2024-10-09 00:00:00',0,0),(3,3,'2024-10-09 00:00:00',0,0),(4,101,'2024-10-09 00:00:00',0,0),(5,102,'2024-10-09 00:00:00',0,0),(6,103,'2024-10-09 00:00:00',0,0);
/*!40000 ALTER TABLE `dangerous_situations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dangerous_time`
--

DROP TABLE IF EXISTS `dangerous_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dangerous_time` (
  `time_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`time_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dangerous_time`
--

LOCK TABLES `dangerous_time` WRITE;
/*!40000 ALTER TABLE `dangerous_time` DISABLE KEYS */;
/*!40000 ALTER TABLE `dangerous_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gps`
--

DROP TABLE IF EXISTS `gps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gps` (
  `gps_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `situation_id` bigint NOT NULL,
  `location_latitude` float DEFAULT NULL,
  `location_longitude` float DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gps_id`),
  KEY `FK_dangerous_situations_TO_gps_1` (`situation_id`),
  CONSTRAINT `FK_dangerous_situations_TO_gps_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gps`
--

LOCK TABLES `gps` WRITE;
/*!40000 ALTER TABLE `gps` DISABLE KEYS */;
INSERT INTO `gps` VALUES (1,1,37.5014,127.039,'2024-10-05 00:00:00'),(2,2,37.4989,127.03,'2024-10-06 00:00:00'),(3,2,37.4995,127.031,'2024-10-07 00:00:00'),(4,2,37.5665,126.978,'2024-10-09 05:00:03'),(5,2,37.5665,126.978,'2024-10-09 05:42:06'),(6,1,37.4849,126.981,'2024-10-09 08:47:09'),(7,1,37.4849,126.981,'2024-10-09 09:05:40'),(8,1,37.4849,126.981,'2024-10-09 09:14:31'),(9,1,37.4849,126.981,'2024-10-09 09:21:20'),(10,1,37.5014,127.04,'2024-10-10 03:53:40'),(11,1,37.5014,127.04,'2024-10-10 03:59:16'),(12,1,37.5014,127.04,'2024-10-10 04:01:11'),(13,1,37.5014,127.04,'2024-10-10 04:03:31'),(14,1,37.5014,127.04,'2024-10-10 04:08:22'),(15,1,37.5014,127.04,'2024-10-10 04:11:10'),(16,1,37.5014,127.04,'2024-10-10 04:11:47'),(17,1,37.5014,127.04,'2024-10-10 09:07:25'),(18,1,37.5014,127.04,'2024-10-10 09:10:53'),(19,1,37.5014,127.04,'2024-10-10 11:45:08'),(20,1,37.5014,127.04,'2024-10-10 11:45:08'),(21,1,37.5014,127.04,'2024-10-10 11:45:09'),(22,1,37.5014,127.04,'2024-10-10 11:45:09'),(23,1,37.5014,127.04,'2024-10-10 11:45:11'),(24,1,37.5014,127.04,'2024-10-10 11:45:11'),(25,1,37.5014,127.04,'2024-10-10 11:45:24'),(26,1,37.5014,127.04,'2024-10-10 11:45:24'),(27,1,37.5014,127.04,'2024-10-10 11:45:24'),(28,1,37.5014,127.04,'2024-10-10 11:45:24'),(29,1,37.5014,127.04,'2024-10-10 11:48:13'),(30,1,37.5014,127.04,'2024-10-10 11:51:33'),(31,1,37.5014,127.04,'2024-10-10 11:54:12'),(32,1,37.5014,127.04,'2024-10-10 11:54:37'),(33,1,37.5018,127.039,'2024-10-10 11:56:11'),(34,1,37.5014,127.04,'2024-10-10 11:59:33'),(35,1,37.5014,127.04,'2024-10-10 12:00:01'),(36,1,37.5014,127.04,'2024-10-10 12:00:48'),(37,1,37.5014,127.04,'2024-10-10 12:07:02'),(38,1,37.5014,127.04,'2024-10-10 12:07:08'),(39,1,37.5014,127.04,'2024-10-10 12:07:08'),(40,1,37.5014,127.04,'2024-10-10 12:07:08'),(41,1,37.5014,127.04,'2024-10-10 12:07:16'),(42,1,37.5014,127.04,'2024-10-10 12:07:16'),(43,1,37.5014,127.04,'2024-10-10 12:07:16'),(44,1,37.5014,127.04,'2024-10-10 12:38:45'),(45,1,37.5014,127.04,'2024-10-10 12:42:55'),(46,1,37.5014,127.04,'2024-10-10 12:44:28'),(47,1,37.5014,127.04,'2024-10-10 12:45:03'),(48,1,37.5014,127.04,'2024-10-10 12:46:10'),(49,1,37.5014,127.04,'2024-10-10 12:46:42'),(50,1,37.5014,127.04,'2024-10-10 12:47:58'),(51,3,37.5014,127.04,'2024-10-10 12:50:35'),(52,3,37.5014,127.04,'2024-10-10 12:52:28'),(53,1,37.5014,127.04,'2024-10-10 12:53:10'),(54,1,37.5014,127.04,'2024-10-10 12:55:02'),(55,3,37.5014,127.04,'2024-10-10 12:55:55'),(56,1,37.5014,127.04,'2024-10-10 12:59:57'),(57,1,37.5014,127.04,'2024-10-10 13:06:05'),(58,1,37.6786,127.057,'2024-10-10 14:58:41'),(59,1,37.6786,127.057,'2024-10-10 15:01:41'),(60,1,37.6786,127.057,'2024-10-10 15:01:44'),(61,1,37.6786,127.057,'2024-10-10 15:01:46'),(62,3,37.478,126.824,'2024-10-10 15:02:54'),(63,3,37.478,126.824,'2024-10-10 15:03:50'),(64,1,37.6786,127.057,'2024-10-10 15:24:06'),(65,1,37.6786,127.057,'2024-10-10 15:26:29'),(66,1,37.6786,127.057,'2024-10-10 15:34:44'),(67,1,37.6786,127.057,'2024-10-10 15:39:57'),(68,1,37.6786,127.057,'2024-10-10 15:43:20'),(69,1,37.6786,127.057,'2024-10-10 16:15:18'),(70,1,37.6786,127.057,'2024-10-10 16:58:45'),(71,1,37.6786,127.057,'2024-10-10 17:05:00'),(72,1,37.6786,127.057,'2024-10-10 17:05:56'),(73,1,37.6786,127.057,'2024-10-10 17:11:16'),(74,1,37.6786,127.057,'2024-10-10 17:13:40'),(75,1,37.6786,127.057,'2024-10-10 17:16:44'),(76,1,37.6786,127.057,'2024-10-10 17:20:32'),(77,1,37.6786,127.057,'2024-10-10 18:09:29'),(78,1,37.6786,127.057,'2024-10-10 18:11:07'),(79,1,37.5014,127.04,'2024-10-10 23:38:29'),(80,1,37.5014,127.04,'2024-10-10 23:51:27'),(81,1,37.5014,127.04,'2024-10-10 23:52:25'),(82,3,37.5012,127.039,'2024-10-10 23:53:10'),(83,1,37.5014,127.04,'2024-10-11 00:18:10'),(84,1,37.5014,127.04,'2024-10-11 00:18:59'),(85,1,37.5014,127.04,'2024-10-11 00:20:01'),(86,1,37.5014,127.04,'2024-10-11 00:28:05'),(87,1,37.5014,127.04,'2024-10-11 00:52:07');
/*!40000 ALTER TABLE `gps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gyroscope`
--

DROP TABLE IF EXISTS `gyroscope`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gyroscope` (
  `gyro_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `situation_id` bigint NOT NULL,
  `gyro_x` float NOT NULL,
  `gyro_y` float NOT NULL,
  `gyro_z` float NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gyro_id`),
  KEY `FK_dangerous_situations_TO_gyroscope_1` (`situation_id`),
  CONSTRAINT `FK_dangerous_situations_TO_gyroscope_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gyroscope`
--

LOCK TABLES `gyroscope` WRITE;
/*!40000 ALTER TABLE `gyroscope` DISABLE KEYS */;
/*!40000 ALTER TABLE `gyroscope` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `user_id` bigint NOT NULL COMMENT '제보자',
  `situation_id` bigint NOT NULL,
  `report_content` varchar(255) DEFAULT NULL,
  `report_location_latitude` float DEFAULT NULL,
  `report_location_longitude` float DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `report_img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `FK_dangerous_situations_TO_reports_1` (`situation_id`),
  KEY `FK_users_TO_reports_1` (`user_id`),
  CONSTRAINT `FK_dangerous_situations_TO_reports_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_users_TO_reports_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=514 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,2,1,'역삼역 근처에서 발견하였습니다.',37.5014,127.039,'2024-10-09 00:00:00','https://missingbucket1.s3.amazonaws.com/317c782f-db7b-4b56-81f7-956906552fd5..png');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `login_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` int NOT NULL,
  `age` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `height` int NOT NULL,
  `phone` varchar(255) NOT NULL,
  `face_img` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fcm_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'siljong','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','김성현',1,26,'서울시 강남구 역삼동',180,'010-1212-1241','https://missingbucket1.s3.amazonaws.com/KakaoTalk_20241011_011400937_04.jpg','2024-10-01 05:39:16','e74wP6hUN_2qQRHPRlyQSN:APA91bGlOTwnex6jKv61Es48o-XR1ekdW-aL3sD2WXRYUYpUBSD5QJocR6ExnRMSohDkWJ4RqVycMwec6TSBoR7Y-nUr39RTew2qDCf7MFPVKdm5IV-KN8oHZpdOjXTzuCS5e04FRNpu'),(2,'jebo','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','심재운',1,18,'서울시 강남구 역삼동',190,'010-3452-3485','https://missingbucket1.s3.amazonaws.com/KakaoTalk_20241011_011400937_02.png','2024-10-01 05:39:16','eCoUpJQ2XRl4Sj9uwGku7U:APA91bErSamFHXnPZz_77cdtBu2sM0wY1f_U2v5K1ovLUAVJdizBmHFT5mmZpbDYEc8W7S9imAwgR1LIWrfAhrETwLVNO-hTf1HrjxYc3nkVmnY8Y7q4494FwtACmF6bPEYN4DvPtZ1Q'),(3,'jiin','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','정현호',1,27,'서울시 동작구 사당동',180,'010-4382-5817','https://missingbucket1.s3.amazonaws.com/KakaoTalk_20241011_011400937_03.jpg','2024-10-01 05:39:16','dGQ5drGWhlYkccwgrQ5chJ:APA91bFUC2lXu8HYCghnSBndGCk_R8ZaiQF3b31y6Y3U-y4M2bveU89ULr88W9EuiTKO7XEDH4eezUe1dMCqmUrXGCy2qvhY4OCI-fJuoqSUmFBB_vUbwTdNF0MwanZ5cQH50SQzc1vN'),(4,'test','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','이름',1,20,'역삼역',200,'010-0000-0000','https://missingbucket1.s3.amazonaws.com/317c782f-db7b-4b56-81f7-956906552fd5..png','2024-10-01 05:29:53','en4ov3VfsXCbVrXlE8dmub:APA91bEsVAj7i9_ygvPOs86562LetGdA6BPzPP13Ug9er_a9ZpBkTzWBKF00EQqTDoevxZYCfMVaW2HJKZdYYRO1YOIx3ZKEzdghF-ZaBWGHA4ZHS6IRngYzPQGl0mrOoc-rgzipHfo_'),(5,'test1','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','이름',1,20,'역삼역',200,'010-1111-1111','https://missingbucket1.s3.amazonaws.com/052934fc-bf18-4e48-9d6c-e41a82a8ce10..png','2024-10-01 05:30:08',NULL),(7,'test2','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','이름',1,20,'역삼역',200,'010-2222-2222','https://missingbucket1.s3.amazonaws.com/cba83e40-bae8-4700-97ad-8b64eeda3f01..png','2024-10-01 05:31:26',NULL),(12,'test3','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','이름',1,20,'역삼역',200,'010-3333-3333','https://missingbucket1.s3.amazonaws.com/8cabbfc6-06f3-4e2c-a2ca-18a08d920939..png','2024-10-01 05:39:16',NULL),(100,'1234','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','지인2',1,20,'서울시 은평구 불광동',180,'010-1324-2421','https://missingbucket1.s3.amazonaws.com/8cabbfc6-06f3-4e2c-a2ca-18a08d920939..png','2024-10-01 05:39:16','eZCHTyX4wyWW56JKQID1Uu:APA91bHeNUwMFWtEAfsLnXE_rgN5gDtjmzOEXypZVLFjF78nvlTlIYaD7cSzLX_MLFqNsOV_i2kWM1dKDufxctq-FYsllBUvIjfs_emydPJLgvH13BJgZ5P-sm1PtuB5Q0zEW0dBsBPP'),(101,'jiin1','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','고동연',0,24,'서울시 동작구 사당동',184,'010-5495-1982','https://missingbucket1.s3.amazonaws.com/KakaoTalk_20241011_011400937_05.jpg','2024-10-01 05:39:16',NULL),(102,'jiin2','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','김성현',1,25,'서울시 종로구 사직동',180,'010-6843-5495','https://missingbucket1.s3.amazonaws.com/KakaoTalk_20241011_011400937.jpg','2024-10-01 05:39:16','dGQ5drGWhlYkccwgrQ5chJ:APA91bFUC2lXu8HYCghnSBndGCk_R8ZaiQF3b31y6Y3U-y4M2bveU89ULr88W9EuiTKO7XEDH4eezUe1dMCqmUrXGCy2qvhY4OCI-fJuoqSUmFBB_vUbwTdNF0MwanZ5cQH50SQzc1vN'),(103,'jiin3','{bcrypt}$2a$10$DRTmLdxae1Atgoy3i/IFAO/5BULBkbs0Anix7I4eQTlD3GMK6RW0a','문선정',0,20,'서울시 강남구 역삼동',178,'010-9844-8899','https://missingbucket1.s3.amazonaws.com/KakaoTalk_20241011_011400937_01.png','2024-10-01 05:39:16','eZCHTyX4wyWW56JKQID1Uu:AQ0zEW0dBsBPP');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voice`
--

DROP TABLE IF EXISTS `voice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voice` (
  `voice_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
  `situation_id` bigint NOT NULL,
  `voice_url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`voice_id`),
  KEY `FK_dangerous_situations_TO_voice_1` (`situation_id`),
  CONSTRAINT `FK_dangerous_situations_TO_voice_1` FOREIGN KEY (`situation_id`) REFERENCES `dangerous_situations` (`situation_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voice`
--

LOCK TABLES `voice` WRITE;
/*!40000 ALTER TABLE `voice` DISABLE KEYS */;
/*!40000 ALTER TABLE `voice` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-11 13:55:44
