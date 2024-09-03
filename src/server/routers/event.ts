import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import { adminProcedure, router } from "../trpc";
import { db } from "@/drizzle/db";
import { timeTable, event } from "@/drizzle/schema";
import { ColourType } from "@/core/types/interfaces";
import { formatISO, parseISO } from "date-fns";

const INVALID_DATE = "Invalid Date";

export const events = router({
  createEvent: adminProcedure
    .input(
      z.object({
        eventName: z.string(),
        description: z.string(),
        location: z.string(),
        dayOfEvent: z.string(),
        start: z.string(),
        end: z.string(),
        calendarId: z.string(),
        colour: z.custom<ColourType>(),
      }),
    )
    .mutation(async (opts) => {
      const day = parseISO(opts.input.dayOfEvent);
      const start = parseISO(opts.input.start);
      const end = parseISO(opts.input.end);

      // Parse data from inputs
      if (
        day.toString() === INVALID_DATE ||
        start.toString() === INVALID_DATE ||
        end.toString() === INVALID_DATE
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "Date Invalid",
          message: "day, start, or end times are invalid ISO times",
        });
      }

      // Check if calendar exists
      let calendarExists;

      try {
        calendarExists = await db
          .select()
          .from(timeTable)
          .where(eq(timeTable.id, opts.input.calendarId));
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
          message: "Error while requesting resource from database",
        });
      }

      if (calendarExists.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "Resource does not exist",
          message: "The calendar you requested does not exist",
        });
      }

      opts.input.eventName;

      // Now we make the event
      try {
        await db.insert(event).values({
          name: opts.input.eventName,
          day: opts.input.dayOfEvent,
          description: opts.input.description,
          timetableId: opts.input.calendarId,
          time: {
            start: opts.input.start,
            end: opts.input.end,
          },
          colour: opts.input.colour,
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
          message: "Error while inserting data into database",
        });
      }

      return { message: "Successfully Created Event" };
    }),
});
