import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { adminProcedure, router } from "../trpc";
import { db } from "@/drizzle/db";
import { timeTable } from "@/drizzle/schema";

export const calendar = router({
  toggleCalendar: adminProcedure
    .input(
      z.object({
        calendarId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { calendarId } = opts.input;

      let drizzleRes;

      // Check of the calendar exists, and if the user owns the calendar
      try {
        drizzleRes = await db
          .select({
            checked: timeTable.checked,
          })
          .from(timeTable)
          .where(
            and(
              eq(timeTable.userId, opts.ctx.user.id),
              eq(timeTable.id, calendarId),
            ),
          );
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
          message: "Internal server error when fetching data from database",
        });
      }

      if (drizzleRes.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause:
            "Unable to process error because the resource requested does not exist ",
          message: "This could be caused by you now owning the table requested",
        });
      }

      // Toggle calendar
      const toggle = !drizzleRes[0].checked;

      // Toggle the calendar in the database
      try {
        await db
          .update(timeTable)
          .set({
            checked: toggle,
          })
          .where(eq(timeTable.id, calendarId));
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
          message: "Unable to toggle calendar",
        });
      }

      return {
        message: "Successfully updated table",
      };
    }),
});
