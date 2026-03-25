CREATE TABLE `academic_histories` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`career_id` text NOT NULL,
	`degree_name` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`career_id`) REFERENCES `careers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `academic_semester_grades` (
	`id` text PRIMARY KEY NOT NULL,
	`academic_semester_id` text NOT NULL,
	`subject_id` text,
	`subject_name` text NOT NULL,
	`evaluation1` real DEFAULT 0,
	`evaluation2` real DEFAULT 0,
	`evaluation3` real DEFAULT 0,
	`evaluation4` real DEFAULT 0,
	`evaluation5` real DEFAULT 0,
	`evaluation6` real DEFAULT 0,
	`evaluation7` real DEFAULT 0,
	`evaluation8` real DEFAULT 0,
	`final_grade` real DEFAULT 0,
	FOREIGN KEY (`academic_semester_id`) REFERENCES `academic_semesters`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `academic_semesters` (
	`id` text PRIMARY KEY NOT NULL,
	`academic_history_id` text NOT NULL,
	`semester_label` text NOT NULL,
	`status` text NOT NULL,
	`credits_earned` integer NOT NULL,
	`credits_total` integer NOT NULL,
	`gpa` real DEFAULT 0 NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`academic_history_id`) REFERENCES `academic_histories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `careers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `careers_name_unique` ON `careers` (`name`);--> statement-breakpoint
CREATE TABLE `cohort_sections` (
	`id` text PRIMARY KEY NOT NULL,
	`external_code` text NOT NULL,
	`career_id` text NOT NULL,
	`semester` integer NOT NULL,
	`turn` text NOT NULL,
	`total_students` integer NOT NULL,
	`classroom` text,
	`day` text,
	`time` text,
	`created_at` integer,
	FOREIGN KEY (`career_id`) REFERENCES `careers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cohort_sections_external_code_unique` ON `cohort_sections` (`external_code`);--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`section_id` text NOT NULL,
	`status` text DEFAULT 'enrolled' NOT NULL,
	`recovery` integer DEFAULT false,
	`created_at` integer,
	FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `grades` (
	`id` text PRIMARY KEY NOT NULL,
	`enrollment_id` text NOT NULL,
	`student_id` text NOT NULL,
	`evaluation1` real DEFAULT 0,
	`evaluation2` real DEFAULT 0,
	`evaluation3` real DEFAULT 0,
	`evaluation4` real DEFAULT 0,
	`evaluation5` real DEFAULT 0,
	`evaluation6` real DEFAULT 0,
	`evaluation7` real DEFAULT 0,
	`evaluation8` real DEFAULT 0,
	`final_grade` real DEFAULT 0,
	FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `requests` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`type` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `section_teacher_options` (
	`id` text PRIMARY KEY NOT NULL,
	`section_id` text NOT NULL,
	`teacher_id` text NOT NULL,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sections` (
	`id` text PRIMARY KEY NOT NULL,
	`career_id` text NOT NULL,
	`subject_id` text NOT NULL,
	`teacher_id` text,
	`semester_label` text NOT NULL,
	`semester_order` integer,
	`turn` text NOT NULL,
	`classroom` text NOT NULL,
	`day` text NOT NULL,
	`time` text NOT NULL,
	`block` text,
	`is_recovery` integer DEFAULT false,
	`source` text DEFAULT 'manual' NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`career_id`) REFERENCES `careers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `student_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`phone` text,
	`address` text,
	`cohort_section_id` text,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cohort_section_id`) REFERENCES `cohort_sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `student_profiles_user_id_unique` ON `student_profiles` (`user_id`);--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`credits` integer NOT NULL,
	`career_id` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`career_id`) REFERENCES `careers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subjects_code_unique` ON `subjects` (`code`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);