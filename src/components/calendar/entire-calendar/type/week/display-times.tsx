import { eachHourOfInterval, startOfDay, endOfDay, format } from "date-fns";

export default function DisplayTimesWeekCalendar() {
  const timesInDay = eachHourOfInterval({
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  });

  return (
    <>
      {timesInDay.map((time) => {
        return (
          <div
            key={crypto.randomUUID()}
            className="relative flex aspect-square w-full items-center justify-center"
          >
            <p>
              {format(time, "h")} {format(time, "a")}
            </p>
            <div className="absolute left-16 h-[2px] w-[calc(100vw-28rem)] bg-gray-400"></div>
          </div>
        );
      })}
    </>
  );
}
