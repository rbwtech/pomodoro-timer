-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 26, 2024 at 03:58 PM
-- Server version: 11.4.4-MariaDB-log
-- PHP Version: 8.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rbw_tech`
--

-- --------------------------------------------------------

--
-- Table structure for table `waqtify_sessions`
--

CREATE TABLE `waqtify_sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `type` enum('focus','break') DEFAULT NULL,
  `completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `waqtify_stats` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `total_focus_time` int(11) DEFAULT NULL,
  `sessions_completed` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `waqtify_todos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `waqtify_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `waqtify_user_settings` (
  `user_id` int(11) NOT NULL,
  `focus_duration` int(11) DEFAULT 25,
  `break_duration` int(11) DEFAULT 5,
  `sound_enabled` tinyint(1) DEFAULT 1,
  `volume` decimal(3,2) DEFAULT 0.50,
  `weekly_goal` int(11) DEFAULT 1200,
  `spotify_token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Indexes for table `waqtify_sessions`
--
ALTER TABLE `waqtify_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `waqtify_stats`
--
ALTER TABLE `waqtify_stats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `waqtify_todos`
--
ALTER TABLE `waqtify_todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `waqtify_users`
--
ALTER TABLE `waqtify_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `waqtify_user_settings`
--
ALTER TABLE `waqtify_user_settings`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `waqtify_sessions`
--
ALTER TABLE `waqtify_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `waqtify_stats`
--
ALTER TABLE `waqtify_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `waqtify_todos`
--
ALTER TABLE `waqtify_todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `waqtify_users`
--
ALTER TABLE `waqtify_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `waqtify_sessions`
--
ALTER TABLE `waqtify_sessions`
  ADD CONSTRAINT `waqtify_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `waqtify_users` (`id`);

--
-- Constraints for table `waqtify_stats`
--
ALTER TABLE `waqtify_stats`
  ADD CONSTRAINT `waqtify_stats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `waqtify_users` (`id`);

--
-- Constraints for table `waqtify_todos`
--
ALTER TABLE `waqtify_todos`
  ADD CONSTRAINT `waqtify_todos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `waqtify_users` (`id`);

--
-- Constraints for table `waqtify_user_settings`
--
ALTER TABLE `waqtify_user_settings`
  ADD CONSTRAINT `waqtify_user_settings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `waqtify_users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
