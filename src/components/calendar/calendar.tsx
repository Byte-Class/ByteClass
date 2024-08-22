"use client";

import { useSession } from "next-auth/react";
import { useAtomValue } from "jotai";

import CalendarWeekSwitcher from "@/components/calendar/entire-calendar/switcher";
import CalendarWeek from "@/components/calendar/entire-calendar/type/week";
import { ATOM_CALENDAR_TYPE } from "@/core/atoms/atom";
import CalendarMonth from "./entire-calendar/type/month";
import CalendarModal from "./modal";

export default function CalendarClient() {
  const session = useSession();

  return (
    <main className="w-full">
      <CalendarWeekSwitcher />

      <CalendarModal />

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
