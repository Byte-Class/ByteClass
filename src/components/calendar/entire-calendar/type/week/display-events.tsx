"use client";

import { eachDayOfInterval, startOfWeek, endOfWeek, formatISO } from "date-fns";
import { useAtomValue } from "jotai";

import { ATOM_CURRENT_DAY } from "@/core/atoms/atom";
import type { EventsType } from "@/core/types/interfaces";

export default function DisplayEventsWeekCalendar({
  events,
}: {
  events: EventsType[][];
}) {
  const currentDate = useAtomValue(ATOM_CURRENT_DAY);

  const daysInWeek = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate),
  });

  const isoWeekMap = daysInWeek.map((day) => formatISO(day));

  const filteredEvents: EventsType[] = [];

  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < events[i].length; j++) {
      const event = events[i][j];

      if (isoWeekMap.includes(event.day as string)) {
        console.log("ran");
        filteredEvents.push(event);
      }
    }
  }

  return (
    <>
      {daysInWeek.map((day) => {
        return (
          <div
            className="relative h-full flex-1 flex-grow border-r-2 border-solid border-gray-400 first:border-l-2"
            key={crypto.randomUUID()}
          >
            <h2 className="text-xl font-bold">A COLUMN</h2>
          </div>
        );
      })}
    </>
  );
}

function Event({ event }: { event: EventsType }) {}
