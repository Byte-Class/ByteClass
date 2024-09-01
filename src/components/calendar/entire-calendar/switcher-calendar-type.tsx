"use client";

import { useAtomValue, useSetAtom } from "jotai";

import { ATOM_CALENDAR_TYPE } from "@/core/atoms/atom";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function CalendarWeekToggleCalendar() {
  const setCalendarType = useSetAtom(ATOM_CALENDAR_TYPE);
  const getCalendarType = useAtomValue(ATOM_CALENDAR_TYPE);

  return (
    <ToggleGroup
      type="single"
      defaultValue={getCalendarType}
      onValueChange={(value: "month" | "week" | "day") => {
        setCalendarType(value);
      }}
    >
      {/* <ToggleGroupItem
        value="month"
        aria-label="Toggle Month"
        variant={"outline"}
        className="font-bold"
      >
        Month
      </ToggleGroupItem> */}
      <ToggleGroupItem
        value="week"
        aria-label="Toggle Week"
        variant={"outline"}
        className="font-bold"
      >
        Week
      </ToggleGroupItem>
      {/* <ToggleGroupItem
        value="day"
        aria-label="Toggle Day"
        variant={"outline"}
        className="font-bold"
      >
        Day
      </ToggleGroupItem> */}
    </ToggleGroup>
  );
}
