CREATE TABLE `career_semesters` (
	`id` text PRIMARY KEY NOT NULL,
	`career_id` text NOT NULL,
	`trayect` integer NOT NULL,
	`semester_order` integer NOT NULL,
	`semester_label` text NOT NULL,
	`turn` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`career_id`) REFERENCES `careers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_student_programs` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`career_id` text NOT NULL,
	`current_semester_order` integer DEFAULT 1 NOT NULL,
	`current_semester_label` text,
	`current_turn` text DEFAULT 'matutino' NOT NULL,
	`admission_period` text,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`career_id`) REFERENCES `careers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_student_programs`("id", "student_id", "career_id", "current_semester_order", "current_semester_label", "current_turn", "admission_period", "status", "created_at", "updated_at") SELECT "id", "student_id", "career_id", "current_semester_order", "current_semester_label", "current_turn", "admission_period", "status", "created_at", "updated_at" FROM `student_programs`;--> statement-breakpoint
DROP TABLE `student_programs`;--> statement-breakpoint
ALTER TABLE `__new_student_programs` RENAME TO `student_programs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `student_programs_student_id_unique` ON `student_programs` (`student_id`);--> statement-breakpoint
CREATE TABLE `__new_student_semester_history` (
	`id` text PRIMARY KEY NOT NULL,
	`student_program_id` text NOT NULL,
	`semester_order` integer NOT NULL,
	`semester_label` text NOT NULL,
	`turn` text DEFAULT 'matutino' NOT NULL,
	`status` text NOT NULL,
	`credits_taken` integer DEFAULT 0 NOT NULL,
	`credits_approved` integer DEFAULT 0 NOT NULL,
	`gpa` real DEFAULT 0 NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`student_program_id`) REFERENCES `student_programs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_student_semester_history`("id", "student_program_id", "semester_order", "semester_label", "turn", "status", "credits_taken", "credits_approved", "gpa", "created_at") SELECT "id", "student_program_id", "semester_order", "semester_label", "turn", "status", "credits_taken", "credits_approved", "gpa", "created_at" FROM `student_semester_history`;--> statement-breakpoint
DROP TABLE `student_semester_history`;--> statement-breakpoint
ALTER TABLE `__new_student_semester_history` RENAME TO `student_semester_history`;