import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  endOfWeek,
  format,
  isToday,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { useAtomValue } from "jotai";

import { ATOM_CURRENT_DAY } from "@/core/atoms/atom";

export default function CalendarWeek() {
  const currentDate = useAtomValue(ATOM_CURRENT_DAY);

  const firstDayOfWeek = startOfWeek(currentDate);
  const endDayOfWeek = endOfWeek(currentDate);

  const start = startOfDay(currentDate);
  const end = endOfDay(currentDate);

  const daysInWeek = eachDayOfInterval({
    start: firstDayOfWeek,
    end: endDayOfWeek,
  });

  const timesInDay = eachHourOfInterval({
    start: start,
    end: end,
  });

  return (
    <>
      <main className="flex w-full">
        <div className="mt-4 w-16 text-xs font-bold text-gray-400">
          <div className="flex h-20 w-full items-end">
            <p>{format(new Date(), "O")}</p>
          </div>
          <div className="w-16">
            {timesInDay.map((time) => {
              return (
                <div
                  key={crypto.randomUUID()}
                  className="relative flex aspect-square w-full items-center justify-center"
                >
                  <p>
                    {format(time, "h")} {format(time, "a")}
                  </p>
                  <div className="absolute left-16 h-[0.5px] w-screen bg-gray-400"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[calc(100% - 4rem)] mt-4 flex-grow">
          <div className="flex">
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
          </div>

          <div className="flex">
            {daysInWeek.map((day) => {
              return (
                <div
                  className="h-[1536px] flex-1 border-r-2 border-solid border-gray-400 first:border-l-2"
                  key={crypto.randomUUID()}
                >
                  <h2 className="text-xl font-bold">A COLUMN</h2>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
