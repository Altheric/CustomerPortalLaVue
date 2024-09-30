CREATE TABLE `User` (
  `id` BIGINT UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  `email` VARCHAR(60) NOT NULL,
  `username` VARCHAR(60) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE `Ticket` (
  `id` BIGINT UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  `title` TINYTEXT NOT NULL,
  `content` TEXT NOT NULL,
  `status` VARCHAR(20) DEFAULT 'in progress',
  `category_id` BIGINT,
  `user_id` BIGINT,
  `admin_id` BIGINT
);

CREATE TABLE `Category` (
  `id` BIGINT UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  `category` VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE `Message` (
  `id` BIGINT UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  `content` TEXT NOT NULL,
  `type` VARCHAR(20) DEFAULT 'note',
  `ticket_id` BIGINT,
  `user_id` BIGINT
);

ALTER TABLE `Ticket` ADD FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`);

ALTER TABLE `Ticket` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Ticket` ADD FOREIGN KEY (`admin_id`) REFERENCES `User` (`id`);

ALTER TABLE `Message` ADD FOREIGN KEY (`ticket_id`) REFERENCES `Ticket` (`id`);

ALTER TABLE `Message` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);
