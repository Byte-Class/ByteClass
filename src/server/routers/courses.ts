import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { accounts, activeCourses } from "tables";
import { db } from "db";
import { classroom_v1, google } from "googleapis";

import { adminProcedure, router } from "../trpc";
import { authGoogle } from "@/core/utils/auth-google";

export const courses = router({
  handedInWorks: adminProcedure
    .input(
      z.object({
        courseIds: z.array(z.string()),
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

      let handedIn: classroom_v1.Schema$StudentSubmission[] = [];

      for (let i = 0; i < opts.input.courseIds.length; i++) {
        const courseId = opts.input.courseIds[i];

        const courseWorksTurnedIn = (
          await classroom.courses.courseWork.studentSubmissions.list({
            courseId: courseId,
            courseWorkId: "-",
            states: ["TURNED_IN"],
          })
        ).data.studentSubmissions;

        if (!courseWorksTurnedIn) {
          continue;
        }

        handedIn.push(...courseWorksTurnedIn);
      }

      return handedIn;
    }),
  overdueWorks: adminProcedure
    .input(
      z.object({
        courseIds: z.array(z.string()),
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

      const overdue: classroom_v1.Schema$StudentSubmission[] = [];

      for (let i = 0; i < opts.input.courseIds.length; i++) {
        const courseId = opts.input.courseIds[i];

        const courseWorkOverdue = (
          await classroom.courses.courseWork.studentSubmissions.list({
            courseId: courseId,
            courseWorkId: "-",
            late: "LATE_ONLY",
            states: ["CREATED"],
          })
        ).data.studentSubmissions;

        if (!courseWorkOverdue) {
          continue;
        }

        overdue.push(...courseWorkOverdue);
      }

      return overdue;
    }),
  activeCourses: adminProcedure.query(async (opts) => {
    try {
      return await db
        .select()
        .from(activeCourses)
        .where(
          and(
            eq(activeCourses.userId, opts.ctx.user.id),
            eq(activeCourses.active, true),
          ),
        );
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: err,
        message: "Error while requesting resource from database",
      });
    }
  }),
  fetchCourseWork: adminProcedure
    .input(
      z.object({
        courseId: z.string(),
        id: z.string(),
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

      const data = (
        await classroom.courses.courseWork.get({
          courseId: opts.input.courseId,
          id: opts.input.id,
        })
      ).data;

      return data;
    }),
});
