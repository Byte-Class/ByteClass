import { google } from "googleapis";
import { toast } from "react-toastify";
import { db } from "db";
import { auth } from "auth";
import { accounts } from "tables";
import { eq } from "drizzle-orm";

import { authGoogle } from "@/core/utils/auth-google";

import ClassPickerFilter from "./filter";

export default async function ClassPicker() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return toast.error("You are not authorized");
  }

  const { refresh_token } = (
    await db.select().from(accounts).where(eq(accounts.userId, session.user.id))
  )[0];

  // OAuth
  authGoogle(refresh_token);

  const classroom = google.classroom("v1");

  // Fetch Courses from google
  const courses = (
    await classroom.courses.list({
      courseStates: ["ACTIVE"],
    })
  ).data.courses;

  if (courses === undefined) {
    toast.error("Unknown error while fetching classes");
    return;
  }

  return <ClassPickerFilter courses={courses} />;
}
