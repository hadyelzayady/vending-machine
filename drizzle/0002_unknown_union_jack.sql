ALTER TABLE "user_role" DROP CONSTRAINT "user_role_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "role" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "role" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "role" ADD CONSTRAINT "role_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_role_id_unique" UNIQUE("user_id","role_id");