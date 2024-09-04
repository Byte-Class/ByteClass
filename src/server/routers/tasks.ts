import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { adminProcedure, router } from "../trpc";
import { db } from "@/drizzle/db";
import { pinnedCourses } from "@/drizzle/schema";

export const tasks = router({
  togglePin: adminProcedure
    .input(
      z.object({
        courseId: z.string(),
        courseName: z.string(),
      }),
    )
    .mutation(async (opts) => {
      let drizzle;

      try {
        drizzle = await db
          .select()
          .from(pinnedCourses)
          .where(
            and(
              eq(pinnedCourses.userId, opts.ctx.user.id),
              eq(pinnedCourses.courseId, opts.input.courseId),
            ),
          );
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
          message: "Error while requesting resource from database",
        });
      }

      // if the resource does not exist, we add it to the database with pinned = true
      if (drizzle.length === 0) {
        try {
          await db.insert(pinnedCourses).values({
            courseId: opts.input.courseId,
            isPinned: true,
            userId: opts.ctx.user.id,
            courseName: opts.input.courseName,
          });
        } catch (err) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            cause: err,
            message: "Error while inserting course into database",
          });
        }

        return { message: "Successfully Pinned Course" };
      }

      // else we just update the resource
      try {
        await db
          .update(pinnedCourses)
          .set({
            isPinned: !drizzle[0].isPinned,
          })
          .where(
            and(
              eq(pinnedCourses.userId, opts.ctx.user.id),
              eq(pinnedCourses.courseId, opts.input.courseId),
            ),
          );
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
          message: "Error while updating resource from database",
        });
      }

      return { message: "Successfully Pinned Course" };
    }),
  pinnedState: adminProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .query(async (opts) => {
      let drizzle;

      try {
        drizzle = await db
          .select()
          .from(pinnedCourses)
          .where(
            and(
              eq(pinnedCourses.userId, opts.ctx.user.id),
              eq(pinnedCourses.courseId, opts.input.courseId),
            ),
          );
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
          message: "Error while requesting resource from database",
        });
      }

      if (drizzle.length === 0 || drizzle[0].isPinned === false) {
        return {
          message: "Success",
          pinned: false,
        };
      }

      return {
        message: "Success",
        pinned: true,
      };
    }),
});
