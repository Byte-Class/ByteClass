import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { adminProcedure, router } from "../trpc";
import { db } from "@/drizzle/db";
import { accounts, activeCourses, pinnedCourses } from "@/drizzle/schema";
import { authGoogle } from "@/core/utils/auth-google";
import { classroom_v1, google } from "googleapis";
import { compareAsc, getDate, getDay, getMonth, getYear } from "date-fns";

export const todo = router({
  fetchTasksDue: adminProcedure
    .input(
      z.object({
        n: z.number(),
      }),
    )
    .query(async (opts) => {
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

      let courseWorks: classroom_v1.Schema$CourseWork[] = [];

      // fetch all courses
      const courses = (
        await classroom.courses.list({
          courseStates: ["ACTIVE"],
        })
      ).data.courses
        ?.map((course) => course.id ?? "")!
        .filter((id) => id !== "")!;

      for (let i = 0; i < courses.length; i++) {
        const courseId = courses[i];

        const courseWork = (
          await classroom.courses.courseWork.list({
            courseId: courseId,
            courseWorkStates: ["PUBLISHED"],
            orderBy: "dueDate desc",
          })
        ).data.courseWork;

        if (!courseWork) {
          continue;
        }

        courseWorks.push(
          ...courseWork.filter((work) => work.dueDate !== undefined),
        );
      }

      const today = new Date();
      const todayYear = getYear(today);
      const todayMonth = getMonth(today) + 1;
      const todayDate = getDate(today);

      courseWorks = courseWorks.filter(
        (courseWork) =>
          courseWork.dueDate?.year! >= todayYear &&
          courseWork.dueDate?.month! >= todayMonth &&
          courseWork.dueDate?.day! >= todayDate,
      );

      courseWorks.sort((a, b) =>
        compareAsc(
          new Date(a.dueDate?.year!, a.dueDate?.month! - 1, a.dueDate?.day!),
          new Date(b.dueDate?.year!, b.dueDate?.month! - 1, b.dueDate?.day!),
        ),
      );

      return courseWorks.slice(0, opts.input.n);
    }),
});
