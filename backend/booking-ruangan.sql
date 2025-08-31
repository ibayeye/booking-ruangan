-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2025 at 06:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking-ruangan`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `duration` int(11) NOT NULL,
  `purpose` text NOT NULL,
  `status` enum('submit','approved','rejected') NOT NULL DEFAULT 'submit',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `room_id`, `date`, `start_time`, `duration`, `purpose`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 3, '2025-08-31', '13:45:00', 120, 'Rapat Internal', 'approved', '2025-08-30 04:49:16', '2025-08-30 11:03:42', NULL),
(2, 3, 1, '2025-08-31', '13:45:00', 90, 'Rapat evaluasi', 'submit', '2025-08-30 05:58:18', '2025-08-30 09:48:25', NULL),
(3, 3, 1, '2025-08-30', '12:00:00', 120, 'Evaluasi mingguan', 'submit', '2025-08-30 06:07:42', '2025-08-30 06:17:01', '2025-08-30 06:17:01'),
(4, 3, 6, '2025-08-30', '12:00:00', 120, 'Rapat Instansi', 'submit', '2025-08-30 06:13:56', '2025-08-30 06:16:09', '2025-08-30 06:16:09'),
(5, 3, 4, '2025-08-23', '12:12:00', 120, 'Rapat evaluasi', 'submit', '2025-08-30 06:17:26', '2025-08-30 06:55:07', '2025-08-30 06:55:07'),
(6, 3, 6, '2025-08-30', '12:12:00', 120, 'Rapat tahunan', 'submit', '2025-08-30 06:56:01', '2025-08-30 06:57:36', '2025-08-30 06:57:36'),
(7, 3, 2, '2025-08-30', '02:31:00', 90, 'rapat lagi', 'submit', '2025-08-30 08:32:18', '2025-08-30 08:32:27', '2025-08-30 08:32:27'),
(8, 2, 1, '2025-08-31', '12:12:00', 90, 'Rapat', 'submit', '2025-08-30 11:04:56', '2025-08-30 11:04:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(31, '0001_01_01_000000_create_users_table', 1),
(32, '0001_01_01_000001_create_cache_table', 1),
(33, '0001_01_01_000002_create_jobs_table', 1),
(34, '2025_08_29_134558_create_personal_access_tokens_table', 1),
(35, '2025_08_29_134647_create_rooms_table', 1),
(36, '2025_08_29_134716_create_bookings_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth-token', '8f14276b2d5deb1e0fbba7425b83caec5e770e4fdf9440cc58fa0403b97ebaf7', '[\"*\"]', '2025-08-30 04:33:42', '2025-08-31 03:30:09', '2025-08-30 03:30:09', '2025-08-30 04:33:42'),
(2, 'App\\Models\\User', 2, 'auth-token', 'cabe0b94270cde89985dc383582f6c7823a6869cfb399a21be5bc43bbde5e671', '[\"*\"]', NULL, '2025-08-31 03:31:26', '2025-08-30 03:31:26', '2025-08-30 03:31:26'),
(3, 'App\\Models\\User', 2, 'auth-token', '0e710ce2130bc293f6fd5564b2849719b0b0ac0247b317fd1c4f4bff6b6d1ba9', '[\"*\"]', NULL, '2025-08-31 03:35:34', '2025-08-30 03:35:34', '2025-08-30 03:35:34'),
(4, 'App\\Models\\User', 1, 'auth-token', '1501e823dd0d7f8f06318252f648f1c3bc1e44e17469b2a5e748594d863d0a15', '[\"*\"]', NULL, '2025-08-31 03:36:12', '2025-08-30 03:36:12', '2025-08-30 03:36:12'),
(5, 'App\\Models\\User', 2, 'auth-token', '10fff487ce922d15ad2be8cee2509da3afa752c3f7d49dbbda56e6de3deb0060', '[\"*\"]', NULL, '2025-08-31 03:38:25', '2025-08-30 03:38:25', '2025-08-30 03:38:25'),
(6, 'App\\Models\\User', 2, 'auth-token', '6247db0fe094dd7d22dc53c397c5aba9f882567375e97aabd473c32b928526e5', '[\"*\"]', NULL, '2025-08-31 03:44:37', '2025-08-30 03:44:37', '2025-08-30 03:44:37'),
(7, 'App\\Models\\User', 2, 'auth-token', '970dad8e72209633609014ddb2be6c18a6c1c8fb8d7e1eaa62416cb811ecb3b5', '[\"*\"]', NULL, '2025-08-31 03:45:24', '2025-08-30 03:45:24', '2025-08-30 03:45:24'),
(8, 'App\\Models\\User', 2, 'auth-token', 'f33ef89b7db007e371aa0ad969fedb095b3e4576ac9db8bc901161f8c4aece93', '[\"*\"]', NULL, '2025-08-31 03:45:50', '2025-08-30 03:45:50', '2025-08-30 03:45:50'),
(9, 'App\\Models\\User', 2, 'auth-token', '562a70d218145dd4c812a17860772c70ae352831bf44124656ad8e3ded92110d', '[\"*\"]', NULL, '2025-08-31 03:46:34', '2025-08-30 03:46:34', '2025-08-30 03:46:34'),
(10, 'App\\Models\\User', 2, 'auth-token', 'b19ae3de8e6e74d55ae5a4843c6a01237c67a4b109a9ac043299252d3cd4c70e', '[\"*\"]', '2025-08-30 04:26:29', '2025-08-31 03:49:02', '2025-08-30 03:49:02', '2025-08-30 04:26:29'),
(11, 'App\\Models\\User', 3, 'auth-token', '0dbb17f307606fb88985e5ada4d936a0aab9961aaa6a04aa8d5a43a61d7602f0', '[\"*\"]', '2025-08-30 04:34:44', '2025-08-31 04:32:39', '2025-08-30 04:32:39', '2025-08-30 04:34:44'),
(12, 'App\\Models\\User', 2, 'auth-token', '5ac4b578558c02b6e58dc84fd2963fd06ce426060e109e893dc85a4bc5942601', '[\"*\"]', '2025-08-30 04:47:10', '2025-08-31 04:34:04', '2025-08-30 04:34:04', '2025-08-30 04:47:10'),
(13, 'App\\Models\\User', 3, 'auth-token', '623cafa5d57908fa65d6a40eed47bfbcc84b0131593505bae6bbd4f714f2b107', '[\"*\"]', '2025-08-30 08:09:39', '2025-08-31 04:38:06', '2025-08-30 04:38:06', '2025-08-30 08:09:39'),
(14, 'App\\Models\\User', 1, 'auth-token', 'afa50a4fd585b7cb3101ed064084a8f666b471eaf05819e1ee30e460774982b1', '[\"*\"]', NULL, '2025-08-31 04:47:48', '2025-08-30 04:47:48', '2025-08-30 04:47:48'),
(15, 'App\\Models\\User', 3, 'auth-token', '0eaea0a35fe94f713f640ff4911aacaf2f9c7c6745a3376e34c07111dc5757a6', '[\"*\"]', '2025-08-30 08:45:09', '2025-08-31 04:49:04', '2025-08-30 04:49:04', '2025-08-30 08:45:09'),
(16, 'App\\Models\\User', 3, 'auth-token', '102e7ca76517d1daa165eede3dd8c531104dba016f5c8c35d4b303d33bc22ce5', '[\"*\"]', '2025-08-30 08:27:53', '2025-08-31 08:10:04', '2025-08-30 08:10:04', '2025-08-30 08:27:53'),
(17, 'App\\Models\\User', 1, 'auth-token', 'a23f5b6a965812b97b99df545e721a114a3b50b69fe49d551e3d8c9e6c49a6be', '[\"*\"]', NULL, '2025-08-31 08:31:18', '2025-08-30 08:31:18', '2025-08-30 08:31:18'),
(18, 'App\\Models\\User', 3, 'auth-token', 'c868d272ef99d4e7c334a8c71d2baf47f7ff3424436fe01d89a1c2da8c710943', '[\"*\"]', '2025-08-30 08:32:28', '2025-08-31 08:31:42', '2025-08-30 08:31:42', '2025-08-30 08:32:28'),
(19, 'App\\Models\\User', 1, 'auth-token', '2721330352eb9f1f4bc6d57d02b36451c311008fde13a6b0d89a9f030787142b', '[\"*\"]', NULL, '2025-08-31 08:32:39', '2025-08-30 08:32:39', '2025-08-30 08:32:39'),
(20, 'App\\Models\\User', 1, 'auth-token', 'bd534efa92440032bbc4d25c4bb0af3cf43628885358e43b15e488a3404fd9ed', '[\"*\"]', '2025-08-30 08:46:10', '2025-08-31 08:35:24', '2025-08-30 08:35:24', '2025-08-30 08:46:10'),
(21, 'App\\Models\\User', 1, 'auth-token', '8cbf24981599ab92b697cf62593312f45330cdcd868094e744a63348c3bea07b', '[\"*\"]', '2025-08-30 08:54:49', '2025-08-31 08:51:09', '2025-08-30 08:51:09', '2025-08-30 08:54:49'),
(22, 'App\\Models\\User', 3, 'auth-token', '85ecc5245194fcd0585f8efddbf486f4295642f1a4e7e5aa956a329fff0c47e1', '[\"*\"]', '2025-08-30 08:57:49', '2025-08-31 08:55:53', '2025-08-30 08:55:53', '2025-08-30 08:57:49'),
(23, 'App\\Models\\User', 1, 'auth-token', '6221b686a73cded375506241069387942a9ff25a13f2742a203eb17e60848f0c', '[\"*\"]', '2025-08-30 20:50:44', '2025-08-31 08:58:04', '2025-08-30 08:58:04', '2025-08-30 20:50:44'),
(24, 'App\\Models\\User', 2, 'auth-token', '8bc628fa10a791cfdc27f3dbdfc0abf3e9b821ba0d1df788a7a357015f1dd7e7', '[\"*\"]', '2025-08-30 11:14:56', '2025-08-31 11:04:11', '2025-08-30 11:04:11', '2025-08-30 11:14:56'),
(25, 'App\\Models\\User', 1, 'auth-token', '0409cf552ea1fe6947d159201d9220418a2f515d764bf8731239f6216810a40c', '[\"*\"]', '2025-08-30 20:53:28', '2025-08-31 20:51:42', '2025-08-30 20:51:42', '2025-08-30 20:53:28'),
(26, 'App\\Models\\User', 3, 'auth-token', '019e8d9a17efdbd91ffa9beb7267b4f24b4908b8f02b186967cf56f251c6c1c8', '[\"*\"]', '2025-08-30 20:57:01', '2025-08-31 20:53:56', '2025-08-30 20:53:56', '2025-08-30 20:57:01');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `image`, `name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'http://localhost:8000/storage/image/h4grVLI2csCSUR6pT9offFmkTxSwaGDeenbQWxeM.jpg', 'Aula Besar', 'Besar sekali', '2025-08-30 04:16:08', '2025-08-30 11:00:11', NULL),
(2, 'http://localhost:8000/storage/image/g4gyvjgLlBgqDVfh86YXmvdyLvHwtEMyfFDsPYAI.jpg', 'Aula 1', 'Kapasitas besar', '2025-08-30 04:16:36', '2025-08-30 04:16:36', NULL),
(3, 'http://localhost:8000/storage/image/Z3fzAvtMtKogWgebVP2GouHOVXFo6EGYdvKRwE8t.jpg', 'Aula 3', 'Kapasitas besar', '2025-08-30 04:16:47', '2025-08-30 04:16:47', NULL),
(4, 'http://localhost:8000/storage/image/IbyB76ImtoMFU4XcQp8lL52XEmoh8XXTuQrmudZm.jpg', 'Aula 4', 'Kapasitas besar', '2025-08-30 04:16:57', '2025-08-30 04:16:57', NULL),
(5, 'http://localhost:8000/storage/image/GsQROpUe23DX7qRfsS12CxR6Ec4hXoj1FHkj1YEP.jpg', 'Aula 5', 'Kapasitas besar', '2025-08-30 04:17:06', '2025-08-30 09:52:39', NULL),
(6, 'http://localhost:8000/storage/image/B5neZT4L4xQ10TIkUAKE3QeWVrXP39weT0TRNgV4.jpg', 'Aula 6', 'Kapasitas besar', '2025-08-30 04:18:13', '2025-08-30 09:52:19', NULL),
(7, 'http://localhost:8000/storage/image/wrqHdvmZG2833GernIukKZdrdn6lbfPIuAcR8zMB.jpg', 'Aula Kecil', 'Kecil banget', '2025-08-30 11:00:59', '2025-08-30 11:00:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2y$12$sj76E.V5Y6ED676li0BNY.BPjWZYY/SdpNauCHQVxIDuGe3RuUuTC', 'admin', NULL, '2025-08-30 03:28:34', '2025-08-30 03:28:34', NULL),
(2, 'User', 'user@gmail.com', '$2y$12$aC0XKq9GDL404zhq8J2qBOig7h0prHxa6M3NwxY2bLneRp4xhcEKi', 'user', NULL, '2025-08-30 03:28:35', '2025-08-30 03:28:35', NULL),
(3, 'Iqbal', 'iqbal@gmail.com', '$2y$12$BiYsoCQjch0ZDUWCv7Ff3O.xHBIZX34tquVy6aLmXLxF3whPgX4ZO', 'user', NULL, '2025-08-30 04:32:32', '2025-08-30 04:32:32', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_user_id_foreign` (`user_id`),
  ADD KEY `bookings_room_id_foreign` (`room_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
