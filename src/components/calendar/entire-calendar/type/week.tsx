import { format } from "date-fns";
import { and, eq } from "drizzle-orm";
import { auth } from "auth";

import { db } from "@/drizzle/db";
import { event, timeTable } from "@/drizzle/schema";
import type { EventsType } from "@/core/types/interfaces";

import DisplayDaysWeekCalendar from "@/components/calendar/entire-calendar/type/week/display-days";
import DisplayEventsWeekCalendar from "@/components/calendar/entire-calendar/type/week/display-events";
import DisplayTimesWeekCalendar from "@/components/calendar/entire-calendar/type/week/display-times";

export default async function CalendarWeek() {
  const session = await auth();

  // multiple queries necessary, since first we need to fetch the tables that the user has checked
  const tables = await db
    .select()
    .from(timeTable)
    .where(
      and(
        eq(timeTable.checked, true),
        eq(timeTable.userId, session?.user?.id as string),
      ),
    );

  const tableIds = tables.map((table) => table.id);

  const events: EventsType[][] = [];

  for (let i = 0; i < tableIds.length; i++) {
    const res = await db
      .select()
      .from(event)
      .where(eq(event.timetableId, tableIds[i]));

    events.push(res);
  }

  return (
    <div className="w-full">
      <div className="flex w-full">
        <div className="flex h-20 w-16 items-end text-xs font-bold text-gray-400">
          <p>{format(new Date(), "O")}</p>
        </div>

        <div className="flex flex-grow">
          <DisplayDaysWeekCalendar />
        </div>
      </div>

      <div className="flex h-[calc(100vh-18.5rem)] w-full overflow-y-scroll">
        <div className="w-16 text-xs font-bold text-gray-400">
          <DisplayTimesWeekCalendar />
        </div>

        <div className="flex flex-grow">
          <DisplayEventsWeekCalendar events={events} />
        </div>
      </div>
    </div>
  );
}
