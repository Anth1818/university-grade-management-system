CREATE TABLE `student_programs` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`career_id` text NOT NULL,
	`current_semester_order` integer DEFAULT 1 NOT NULL,
	`current_semester_label` text,
	`current_turn` text DEFAULT 'Por definir' NOT NULL,
	`admission_period` text,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`career_id`) REFERENCES `careers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `student_programs_student_id_unique` ON `student_programs` (`student_id`);--> statement-breakpoint
CREATE TABLE `student_semester_history` (
	`id` text PRIMARY KEY NOT NULL,
	`student_program_id` text NOT NULL,
	`semester_order` integer NOT NULL,
	`semester_label` text NOT NULL,
	`turn` text DEFAULT 'Por definir' NOT NULL,
	`status` text NOT NULL,
	`credits_taken` integer DEFAULT 0 NOT NULL,
	`credits_approved` integer DEFAULT 0 NOT NULL,
	`gpa` real DEFAULT 0 NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`student_program_id`) REFERENCES `student_programs`(`id`) ON UPDATE no action ON DELETE no action
);
