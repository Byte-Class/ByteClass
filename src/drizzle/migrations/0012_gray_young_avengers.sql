CREATE TABLE IF NOT EXISTS "active_courses" (
	"id" text NOT NULL,
	"userId" text NOT NULL,
	"isPinned" boolean NOT NULL,
	"courseName" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "active_courses" ADD CONSTRAINT "active_courses_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
