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

  const dayInterval = eachDayOfInterval({
    start: startOfWeek(getDate),
    end: endOfWeek(getDate),
  });

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
        Next
      </Button>

      <h2 className="text-2xl font-bold">
        <DisplayMonth
          firstMonth={dayInterval[0]}
          lastMonth={dayInterval[dayInterval.length - 1]}
          year={format(getDate, "uuuu")}
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
