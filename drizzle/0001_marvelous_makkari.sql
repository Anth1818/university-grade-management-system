ALTER TABLE `grades` ADD `subject_code` text REFERENCES subjects(code);--> statement-breakpoint
ALTER TABLE `grades` ADD `semester` text NOT NULL;--> statement-breakpoint
ALTER TABLE `grades` ADD `career` text NOT NULL;