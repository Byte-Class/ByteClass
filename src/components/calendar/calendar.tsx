"use client";

import { useSession } from "next-auth/react";
import { useAtomValue } from "jotai";

import { ATOM_CALENDAR_TYPE } from "@/core/atoms/atom";

import CalendarWeekSwitcher from "@/components/calendar/entire-calendar/switcher";
import CalendarWeek from "@/components/calendar/entire-calendar/type/week";
import CalendarMonth from "@/components/calendar/entire-calendar/type/month";
import CreateEventModal from "@/components/calendar/create-event-modal";
import CreateCalendarModal from "@/components/calendar/create-calendar-model";

export default function CalendarClient() {
  const session = useSession();

  return (
    <main className="w-full">
      <CalendarWeekSwitcher />

      <CreateEventModal />
      <CreateCalendarModal />

      <DisplayCalendar />
    </main>
  );
}

function DisplayCalendar() {
  const calendarType = useAtomValue(ATOM_CALENDAR_TYPE);

  if (calendarType === "month") {
    return <CalendarMonth />;
  }

  if (calendarType === "week") {
    return <CalendarWeek />;
  }

  if (calendarType === "day") {
    return "day";
  }
}
