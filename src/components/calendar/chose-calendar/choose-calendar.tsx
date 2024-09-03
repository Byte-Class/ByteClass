import { auth } from "auth";
import { asc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { timeTable } from "@/drizzle/schema";

import CalendarCheckbox from "@/components/calendar/chose-calendar/calendar-checkbox";

export default async function ChoseCalendar() {
  const session = await auth();

  const data = await db
    .select()
    .from(timeTable)
    .where(eq(timeTable.userId, session?.user?.id as string))
    .orderBy(asc(timeTable.name));

  return (
    <div className="flex flex-col gap-2">
      {data.map((calendar) => (
        <CalendarCheckbox
          name={calendar.name}
          id={calendar.id}
          userId={calendar.userId}
          checked={calendar.checked}
          key={crypto.randomUUID()}
        />
      ))}
    </div>
  );
}
