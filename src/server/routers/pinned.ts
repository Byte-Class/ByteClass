import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { adminProcedure, router } from "../trpc";
import { db } from "@/drizzle/db";
import { pinnedCourses } from "@/drizzle/schema";

export const courses = router({
  pinned: adminProcedure.query(async (opts) => {
    try {
      return await db
        .select()
        .from(pinnedCourses)
        .where(
          and(
            eq(pinnedCourses.userId, opts.ctx.user.id),
            eq(pinnedCourses.isPinned, true),
          ),
        );
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
