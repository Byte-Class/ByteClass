import type { Metadata } from "next";
import { auth } from "auth";
import { google } from "googleapis";

import { db } from "@/drizzle/db";
import { accounts } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import ClassPicker from "@/components/tasks/class-picker/class-picker";
import PinnedClasses from "@/components/tasks/pinned-classes";
import SectionTasks from "@/components/tasks/section-tasks";

export const metadata: Metadata = {
  title: "Tasks | Byte Class",
};

export default async function Tasks() {
  const session = await auth();

  if (!session) {
    return;
  }

  // OAuth
  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    process.env.GOOGLE_CALLBACK,
  );

  const { access_token, refresh_token } = (
    await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, session.user?.id as string))
  )[0];

  oauth2Client.setCredentials({
    access_token,
    refresh_token,
  });

  google.options({
    auth: oauth2Client,
  });

  const classroom = google.classroom("v1");

  const courseWorksTurnedIn = (
    await classroom.courses.courseWork.studentSubmissions.list({
      courseId: "702720364512",
      courseWorkId: "-",
      states: ["TURNED_IN"],
    })
  ).data.studentSubmissions;

  const courseWorkReclaimedReturned = (
    await classroom.courses.courseWork.studentSubmissions.list({
      courseId: "702720364512",
      courseWorkId: "-",
      states: ["RETURNED", "RECLAIMED_BY_STUDENT"],
    })
  ).data.studentSubmissions;

  const courseWorkOverdue = (
    await classroom.courses.courseWork.studentSubmissions.list({
      courseId: "702720364512",
      courseWorkId: "-",
      late: "LATE_ONLY",
      states: ["CREATED"],
    })
  ).data.studentSubmissions;

  if (
    courseWorksTurnedIn === undefined ||
    courseWorkReclaimedReturned === undefined ||
    courseWorkOverdue === undefined
  ) {
    return;
  }

  return (
    <div className="w-full">
      <h2 className="text-5xl font-bold">Your Tasks</h2>

      <div className="mt-4 flex w-full gap-4">
        <ClassPicker />

        <PinnedClasses />
      </div>

      <div className="ml-auto mr-auto mt-4 w-11/12">
        <SectionTasks sectionHeader="Overdue" itemsToShow={courseWorkOverdue} />

        <SectionTasks
          sectionHeader="Returned"
          itemsToShow={courseWorkReclaimedReturned}
        />
        <SectionTasks
          sectionHeader="Handed In"
          itemsToShow={courseWorksTurnedIn}
        />
      </div>
    </div>
  );
}
