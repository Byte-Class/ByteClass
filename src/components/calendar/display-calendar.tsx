"use client";

import { Children, ReactNode } from "react";
import { useAtomValue } from "jotai";

import { ATOM_CALENDAR_TYPE } from "@/core/atoms/atom";

export default function DisplayCalendar({ children }: { children: ReactNode }) {
  const calendarType = useAtomValue(ATOM_CALENDAR_TYPE);

  const calendars = Children.toArray(children);

  if (calendarType === "month") {
    return <>{calendars[0]}</>;
  }

  if (calendarType === "week") {
    return <>{calendars[1]}</>;
  }

  if (calendarType === "day") {
    return "day";
  }
}
