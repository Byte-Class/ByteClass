CREATE TABLE IF NOT EXISTS "pinned_courses" (
	"id" text NOT NULL,
	"userId" text NOT NULL,
	"isPinned" boolean NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pinned_courses" ADD CONSTRAINT "pinned_courses_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
