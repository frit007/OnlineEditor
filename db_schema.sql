CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(255) NOT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`google_id` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `projects` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`root_folder` VARCHAR(255) NOT NULL,
	`owner` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `user_projects` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`project_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `files` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`project_id` INT(11) NOT NULL,
	`path` BINARY NOT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `file_updates` (
	`id` INT(32) NOT NULL AUTO_INCREMENT,
	`file_id` INT(11) NOT NULL,
	`user_id` INT(11) NOT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

ALTER TABLE `projects` ADD CONSTRAINT `projects_fk0` FOREIGN KEY (`owner`) REFERENCES `users`(`id`) ON DELETE CASCADE;

ALTER TABLE `user_projects` ADD CONSTRAINT `user_projects_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;

ALTER TABLE `user_projects` ADD CONSTRAINT `user_projects_fk1` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE;

ALTER TABLE `files` ADD CONSTRAINT `files_fk0` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE;

ALTER TABLE `file_updates` ADD CONSTRAINT `file_updates_fk0` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE CASCADE;

ALTER TABLE `file_updates` ADD CONSTRAINT `file_updates_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
