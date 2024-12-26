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

--
-- Dumping data for table `waqtify_sessions`
--

INSERT INTO `waqtify_sessions` (`id`, `user_id`, `start_time`, `duration`, `type`, `completed`) VALUES
(1, 1, NULL, 25, 'focus', 0),
(2, 1, NULL, 25, 'focus', 0),
(3, 1, NULL, 25, 'focus', 0),
(4, 1, NULL, 25, 'focus', 0),
(5, 1, NULL, 25, 'focus', 0),
(6, 1, NULL, 24, 'focus', 0),
(7, 1, '2024-12-25 04:17:57', 25, 'focus', 0),
(8, 1, '2024-12-25 04:20:18', 25, 'focus', 0),
(9, 1, '2024-12-25 04:21:47', 25, 'focus', 0),
(10, 1, '2024-12-25 04:29:43', 25, 'focus', 0),
(11, 1, '2024-12-25 04:30:09', 25, 'focus', 0),
(12, 1, '2024-12-25 04:30:12', 15, 'focus', 0),
(13, 1, '2024-12-25 04:30:15', 25, 'focus', 0),
(14, 1, '2024-12-25 04:30:19', 12, 'focus', 0),
(15, 1, '2024-12-25 04:31:19', 15, 'focus', 0),
(16, 1, '2024-12-25 04:32:25', 25, 'focus', 0),
(17, 1, '2024-12-25 04:40:21', 25, 'focus', 0),
(18, 1, '2024-12-25 04:42:10', 1, 'focus', 0),
(19, 1, '2024-12-25 04:43:06', 25, 'focus', 0),
(20, 1, '2024-12-25 23:02:15', 25, 'focus', 0),
(21, 1, '2024-12-25 23:36:58', 25, 'focus', 0),
(22, 1, '2024-12-25 23:50:11', 25, 'focus', 0),
(23, 1, '2024-12-25 23:50:14', 25, 'focus', 0),
(24, 1, '2024-12-25 23:50:15', 25, 'focus', 0),
(25, 1, '2024-12-25 23:50:17', 25, 'focus', 0),
(26, 1, '2024-12-25 23:50:19', 5, 'break', 0),
(27, 1, '2024-12-25 23:50:26', 1, 'focus', 0),
(28, 1, '2024-12-25 23:50:32', 25, 'focus', 0),
(29, 1, '2024-12-25 23:50:40', 1, 'focus', 0),
(30, 1, '2024-12-26 00:15:12', 25, 'focus', 0),
(31, 1, '2024-12-26 00:23:17', 25, 'focus', 0),
(32, 1, '2024-12-26 00:42:32', 25, 'focus', 0),
(33, 1, '2024-12-26 00:42:37', 25, 'focus', 0),
(34, 1, '2024-12-26 01:13:32', 25, 'focus', 0),
(35, 1, '2024-12-26 01:13:33', 25, 'focus', 0),
(36, 1, '2024-12-26 02:04:42', 25, 'focus', 0),
(37, 1, '2024-12-26 02:04:51', 25, 'focus', 0),
(38, 1, '2024-12-26 02:04:52', 5, 'break', 0),
(39, 1, '2024-12-26 02:10:04', 25, 'focus', 0),
(40, 1, '2024-12-26 02:31:36', 25, 'focus', 0),
(41, 1, '2024-12-26 02:31:46', 25, 'focus', 0),
(42, 1, '2024-12-26 02:31:52', 25, 'focus', 0),
(43, 1, '2024-12-26 02:32:25', 1, 'focus', 0),
(44, 1, '2024-12-26 03:21:02', 25, 'focus', 0),
(45, 1, '2024-12-26 05:24:01', 25, 'focus', 0),
(46, 1, '2024-12-26 05:34:53', 25, 'focus', 0),
(47, 1, '2024-12-26 05:42:20', 15, 'focus', 0),
(48, 1, '2024-12-26 05:53:39', 25, 'focus', 0),
(49, 1, '2024-12-26 07:44:29', 25, 'focus', 0),
(50, 1, '2024-12-26 07:44:37', 1, 'focus', 0),
(51, 1, '2024-12-26 07:47:00', 1, 'break', 0),
(52, 1, '2024-12-26 07:51:00', 1, 'focus', 0),
(53, 1, '2024-12-26 07:54:11', 1, 'focus', 0),
(54, 1, '2024-12-26 07:55:28', 25, 'focus', 0),
(55, 1, '2024-12-26 07:55:31', 1, 'focus', 0),
(56, 1, '2024-12-26 07:58:07', 1, 'focus', 0),
(57, 1, '2024-12-26 07:58:52', 1, 'focus', 0),
(58, 1, '2024-12-26 08:02:07', 1, 'focus', 0);

-- --------------------------------------------------------

--
-- Table structure for table `waqtify_stats`
--

CREATE TABLE `waqtify_stats` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `total_focus_time` int(11) DEFAULT NULL,
  `sessions_completed` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `waqtify_stats`
--

INSERT INTO `waqtify_stats` (`id`, `user_id`, `date`, `total_focus_time`, `sessions_completed`) VALUES
(1, 1, '2024-12-20', 150, 3),
(2, 1, '2024-12-21', 200, 4),
(3, 1, '2024-12-22', 175, 3),
(4, 1, '2024-12-23', 120, 2),
(5, 1, '2024-12-24', 240, 5),
(6, 1, '2024-12-25', 300, 6);

-- --------------------------------------------------------

--
-- Table structure for table `waqtify_todos`
--

CREATE TABLE `waqtify_todos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `waqtify_todos`
--

INSERT INTO `waqtify_todos` (`id`, `user_id`, `title`, `completed`, `created_at`) VALUES
(33, 1, 'testing', 0, '2024-12-26 06:28:20'),
(34, 1, 'testing 2', 0, '2024-12-26 06:28:24'),
(35, 1, 'testing 3', 0, '2024-12-26 06:28:25'),
(36, 1, 'WFH OK', 0, '2024-12-26 06:28:30'),
(37, 1, 'HOMEWORK', 1, '2024-12-26 06:28:34'),
(38, 1, 'PROJECT', 1, '2024-12-26 06:28:37'),
(39, 1, 'PROJECT 2', 1, '2024-12-26 06:28:40'),
(40, 1, 'EATING', 1, '2024-12-26 06:28:44'),
(41, 1, 'READING', 1, '2024-12-26 06:28:47');

-- --------------------------------------------------------

--
-- Table structure for table `waqtify_users`
--

CREATE TABLE `waqtify_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `waqtify_users`
--

INSERT INTO `waqtify_users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'RBW-Tech', 'radipta111@gmail.com', '$2a$10$Mzkg33h9EBSgLrasBuc96.ghTT94EOa9AHS1MbRt4Y2vHqi4H8Rii', '2024-12-23 14:52:56');

-- --------------------------------------------------------

--
-- Table structure for table `waqtify_user_settings`
--

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
-- Dumping data for table `waqtify_user_settings`
--

INSERT INTO `waqtify_user_settings` (`user_id`, `focus_duration`, `break_duration`, `sound_enabled`, `volume`, `weekly_goal`, `spotify_token`) VALUES
(1, 25, 5, 1, 0.75, 1200, 'sample_spotify_token_123');

--
-- Indexes for dumped tables
--

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
