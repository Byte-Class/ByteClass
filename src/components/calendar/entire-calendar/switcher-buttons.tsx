"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

import { ATOM_CALENDAR_TYPE, ATOM_CURRENT_DAY } from "@/core/atoms/atom";
import { daysToAdd } from "@/core/utils/days-to-add";

import { Button } from "@/components/ui/button";

export default function CalendarWeekButtonSwitcher() {
  const currentDay = useAtomValue(ATOM_CURRENT_DAY);
  const setNewDate = useSetAtom(ATOM_CURRENT_DAY);

  const calendarType = useAtomValue(ATOM_CALENDAR_TYPE);

  const displayWeeks = eachDayOfInterval({
    start: startOfWeek(currentDay),
    end: endOfWeek(currentDay),
  });

  return (
    <>
      <Button
        onClick={() => {
          setNewDate(daysToAdd(calendarType, currentDay, "remove"));
        }}
      >
        Prev
      </Button>

      <Button
        onClick={() => {
          setNewDate(daysToAdd(calendarType, currentDay, "add"));
        }}
      >
        Next
      </Button>

      <h2 className="text-2xl font-bold">
        <DisplayMonth
          firstMonth={displayWeeks[0]}
          lastMonth={displayWeeks[displayWeeks.length - 1]}
          year={format(currentDay, "uuuu")}
        />
      </h2>
    </>
  );
}

const DisplayMonth = ({
  firstMonth,
  lastMonth,
  year,
}: {
  firstMonth: Date;
  lastMonth: Date;
  year: string;
}) => {
  if (format(firstMonth, "MMM") === format(lastMonth, "MMM")) {
    return (
      <>
        {format(firstMonth, "MMMM")} {year}
      </>
    );
  }

  return (
    <>
      {format(firstMonth, "MMM")} - {format(lastMonth, "MMM")} {year}
    </>
  );
};
