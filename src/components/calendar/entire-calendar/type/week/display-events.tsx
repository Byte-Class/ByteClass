"use client";

import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  formatISO,
  format,
  differenceInMinutes,
  getHours,
  parseISO,
  getMinutes,
} from "date-fns";
import { useAtomValue } from "jotai";

import { ATOM_CURRENT_DAY } from "@/core/atoms/atom";
import type { EventsType } from "@/core/types/interfaces";
import { convertPxToRem } from "@/core/utils/convert-to-rem";
import { formatDate } from "@/core/utils/format-date-event";

type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

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
        filteredEvents.push(event);
      }
    }
  }

  // now that we have all the events for the week, we now need to display them in each column
  // Create a dict
  const eventOrdered: Record<DayOfWeek, EventsType[]> = {
    sunday: filteredEvents.filter((event) => event.day === isoWeekMap[0]),
    monday: filteredEvents.filter((event) => event.day === isoWeekMap[1]),
    tuesday: filteredEvents.filter((event) => event.day === isoWeekMap[2]),
    wednesday: filteredEvents.filter((event) => event.day === isoWeekMap[3]),
    thursday: filteredEvents.filter((event) => event.day === isoWeekMap[4]),
    friday: filteredEvents.filter((event) => event.day === isoWeekMap[5]),
    saturday: filteredEvents.filter((event) => event.day === isoWeekMap[6]),
  };

  return (
    <>
      {daysInWeek.map((day) => {
        return (
          <div
            className="relative h-[96rem] flex-1 flex-grow border-r-2 border-solid border-gray-400 first:border-l-2"
            key={crypto.randomUUID()}
          >
            <ChooseWhichEventsToDisplay
              day={format(day, "EEEE").toLowerCase()}
              events={eventOrdered}
            />
          </div>
        );
      })}
    </>
  );
}

function ChooseWhichEventsToDisplay({
  events,
  day,
}: {
  events: Record<DayOfWeek, EventsType[]>;
  day: string;
}) {
  if (day === "sunday") {
    return (
      <>
        {events.sunday.map((event) => {
          return <Event event={event} key={crypto.randomUUID()} />;
        })}
      </>
    );
  }

  if (day === "monday") {
    return (
      <>
        {events.monday.map((event) => {
          return <Event event={event} key={crypto.randomUUID()} />;
        })}
      </>
    );
  }

  if (day === "tuesday") {
    return (
      <>
        {events.tuesday.map((event) => {
          return <Event event={event} key={crypto.randomUUID()} />;
        })}
      </>
    );
  }

  if (day === "wednesday") {
    return (
      <>
        {events.wednesday.map((event) => {
          return <Event event={event} key={crypto.randomUUID()} />;
        })}
      </>
    );
  }

  if (day === "thursday") {
    return (
      <>
        {events.thursday.map((event) => {
          return <Event event={event} key={crypto.randomUUID()} />;
        })}
      </>
    );
  }

  if (day === "friday") {
    return (
      <>
        {events.friday.map((event) => {
          return <Event event={event} key={crypto.randomUUID()} />;
        })}
      </>
    );
  }

  if (day === "saturday") {
    return (
      <>
        {events.saturday.map((event) => {
          return <Event event={event} key={crypto.randomUUID()} />;
        })}
      </>
    );
  }
}

function Event({ event }: { event: EventsType }) {
  const day = parseISO(event.day as string);
  const start = parseISO(event.time?.start as string);
  const end = parseISO(event.time?.end as string);

  const height = convertPxToRem(
    (differenceInMinutes(
      event.time?.end as string,
      event.time?.start as string,
    ) /
      60) *
      64,
  );

  const defaultMarginTop = convertPxToRem(32);
  const minuteDifference = convertPxToRem((getMinutes(start) / 60) * 64);

  const topValue =
    convertPxToRem(getHours(start) * 64) + defaultMarginTop + minuteDifference;

  return (
    <div
      className="absolute flex w-full flex-col rounded-lg border-l-[6px] p-2"
      style={{
        top: `${topValue}rem`,
        height: `${height}rem`,
        backgroundColor: `#${event.colour}CC`,
        borderLeft: `solid 7px #${event.colour}`,
      }}
    >
      <p className="font-bold">{event.name}</p>
      <p>{formatDate(start, end)}</p>
    </div>
  );
}
