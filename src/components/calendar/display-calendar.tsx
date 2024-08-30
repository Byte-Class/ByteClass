"use client";

import { useAtomValue } from "jotai";

import { ATOM_CALENDAR_TYPE } from "@/core/atoms/atom";

import CalendarWeek from "@/components/calendar/entire-calendar/type/week";
import CalendarMonth from "@/components/calendar/entire-calendar/type/month";

export default function DisplayCalendar() {
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
