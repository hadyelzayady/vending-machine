CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(256)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "users" ("full_name");