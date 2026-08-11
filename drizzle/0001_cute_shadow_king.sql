CREATE INDEX `idx_diagnostics_user_id` ON `diagnostics` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_diagnostics_created_at` ON `diagnostics` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_events_name_created_at` ON `events` (`name`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_events_session_id` ON `events` (`session_id`);--> statement-breakpoint
CREATE INDEX `idx_purchases_user_id` ON `purchases` (`user_id`);