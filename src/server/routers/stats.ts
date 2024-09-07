import { eq } from "drizzle-orm";
import { db } from "db";
import { accounts } from "tables";
import { classroom_v1, google } from "googleapis";

import { adminProcedure, router } from "../trpc";
import { authGoogle } from "@/core/utils/auth-google";

export const stats = router({
  getAllHandedInAssignments: adminProcedure.query(async (opts) => {
    const { refresh_token } = (
      await db
        .select({
          refresh_token: accounts.refresh_token,
        })
        .from(accounts)
        .where(eq(accounts.userId, opts.ctx.user.id))
    )[0];

    authGoogle(refresh_token);

    const classroom = google.classroom("v1");
    const courseWorks: classroom_v1.Schema$StudentSubmission[] = [];

    // First we need to fetch all the users classes
    const courseIds = (
      await classroom.courses.list({
        courseStates: ["ACTIVE"],
      })
    ).data.courses?.map((course) => course.id);

    if (!courseIds) {
      return [];
    }

    for (let i = 0; i < courseIds.length; i++) {
      const courseId = courseIds[i] ?? "";

      const courseWork = (
        await classroom.courses.courseWork.studentSubmissions.list({
          courseId: courseId,
          courseWorkId: "-",
          states: ["TURNED_IN"],
        })
      ).data.studentSubmissions;

      if (!courseWork) {
        continue;
      }

      courseWorks.push(...courseWork);
    }

    return courseWorks;
  }),
  getAllNotHandedInAssignments: adminProcedure.query(async (opts) => {
    const { refresh_token } = (
      await db
        .select({
          refresh_token: accounts.refresh_token,
        })
        .from(accounts)
        .where(eq(accounts.userId, opts.ctx.user.id))
    )[0];

    authGoogle(refresh_token);

    const classroom = google.classroom("v1");
    const courseWorks: classroom_v1.Schema$StudentSubmission[] = [];

    // First we need to fetch all the users classes
    const courseIds = (
      await classroom.courses.list({
        courseStates: ["ACTIVE"],
      })
    ).data.courses?.map((course) => course.id);

    if (!courseIds) {
      return [];
    }

    for (let i = 0; i < courseIds.length; i++) {
      const courseId = courseIds[i] ?? "";

      const courseWork = (
        await classroom.courses.courseWork.studentSubmissions.list({
          courseId: courseId,
          courseWorkId: "-",
          states: ["NEW", "CREATED", "RETURNED", "RECLAIMED_BY_STUDENT"],
        })
      ).data.studentSubmissions;

      if (!courseWork) {
        continue;
      }

      courseWorks.push(...courseWork);
    }

    return courseWorks;
  }),
});
