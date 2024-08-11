CREATE TABLE IF NOT EXISTS "event" (
	"id" text PRIMARY KEY NOT NULL,
	"timetableId" text NOT NULL,
	"name" text,
	"description" text,
	"time" json,
	"location" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kamar" (
	"userId" text NOT NULL,
	"loginCreds" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timetable" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_timetableId_timetable_id_fk" FOREIGN KEY ("timetableId") REFERENCES "public"."timetable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kamar" ADD CONSTRAINT "kamar_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timetable" ADD CONSTRAINT "timetable_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
