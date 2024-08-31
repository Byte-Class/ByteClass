"use client";

import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  isToday,
} from "date-fns";
import { useAtomValue } from "jotai";

import { ATOM_CURRENT_DAY } from "@/core/atoms/atom";

export default function DisplayDaysWeekCalendar() {
  const currentDate = useAtomValue(ATOM_CURRENT_DAY);

  const daysInWeek = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate),
  });

  return (
    <>
      {daysInWeek.map((day) => {
        return (
          <div
            className="flex h-20 flex-1 flex-col items-center justify-center"
            key={crypto.randomUUID()}
          >
            <h2 className="text-xl font-bold">{format(day, "EEEE")}</h2>

            {isToday(day) ? (
              <h2 className="aspect-square rounded-full bg-blue-700 p-2 text-center text-xl font-bold">
                {format(day, "dd")}
              </h2>
            ) : (
              <h2 className="aspect-square rounded-full p-2 text-xl font-bold">
                {format(day, "dd")}
              </h2>
            )}
          </div>
        );
      })}
    </>
  );
}
