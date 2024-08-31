import type { Metadata } from "next";

import CalendarWeekSwitcher from "@/components/calendar/entire-calendar/switcher";
import CreateCalendarModal from "@/components/calendar/create-calendar-model";
import DisplayCalendar from "@/components/calendar/display-calendar";
import CalendarWeek from "@/components/calendar/entire-calendar/type/week";
import CalendarMonth from "@/components/calendar/entire-calendar/type/month";
import CreateEventModal from "@/components/calendar/modal/event/modal";

export const metadata: Metadata = {
  title: "Calendar | Byte Class",
};

export const dynamic = "force-dynamic";

export default async function Calendar() {
  return (
    <main className="w-full">
      <CalendarWeekSwitcher />

      <CreateEventModal />
      <CreateCalendarModal />

      <DisplayCalendar>
        <CalendarMonth />
        <CalendarWeek />
      </DisplayCalendar>
    </main>
  );
}
