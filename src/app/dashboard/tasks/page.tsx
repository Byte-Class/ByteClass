import { auth, signOut } from "auth";
import { google } from "googleapis";

import { CourseList } from "@/core/types/interfaces";

import ClassPicker from "@/components/tasks/class-picker";

export default async function Tasks() {
  const session = await auth();

  if (!session) {
    return;
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    process.env.GOOGLE_CALLBACK,
  );

  oauth2Client.setCredentials({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  google.options({
    auth: oauth2Client,
  });

  const classroom = google.classroom("v1");

  const res = await classroom.courses.list({
    courseStates: ["ACTIVE"],
  });

  if (res.data.courses === undefined) {
    return;
  }

  const courses: CourseList[] = [];

  res.data.courses.map((course) => {
    courses.push({ name: course.name, id: course.id });
  });

  return (
    <>
      <h2>Your Tasks</h2>

      <div>
        <ClassPicker courses={courses} />

        {/* Pinned classes */}
      </div>
    </>
  );
}
