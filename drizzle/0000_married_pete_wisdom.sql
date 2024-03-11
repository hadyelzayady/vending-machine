CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"amount_available" integer,
	"cost" numeric,
	"seller_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100),
	"deposite" numeric,
	"password" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"role_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_seller_id_user_id_fk" FOREIGN KEY ("seller_id") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
