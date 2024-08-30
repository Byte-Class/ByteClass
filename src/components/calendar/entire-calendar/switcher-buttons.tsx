"use client";

import { useAtomValue, useSetAtom } from "jotai";
import {
  addDays,
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

import { ATOM_CURRENT_DAY } from "@/core/atoms/atom";

import { Button } from "@/components/ui/button";

export default function CalendarWeekButtonSwitcher() {
  const getDate = useAtomValue(ATOM_CURRENT_DAY);
  const setNewDate = useSetAtom(ATOM_CURRENT_DAY);

  const year = format(getDate, "uuuu");

  const dayInterval = eachDayOfInterval({
    start: startOfWeek(getDate),
    end: endOfWeek(getDate),
  });

  const firstMonth = dayInterval[0];
  const lastMonth = dayInterval[dayInterval.length - 1];

  return (
    <>
      <Button
        onClick={() => {
          setNewDate(addDays(getDate, -7));
        }}
      >
        Prev
      </Button>

      <Button
        onClick={() => {
          setNewDate(addDays(getDate, 7));
        }}
      >
        Prev
      </Button>

      <h2 className="text-2xl font-bold">
        <DisplayMonth
          firstMonth={firstMonth}
          lastMonth={lastMonth}
          year={year}
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
