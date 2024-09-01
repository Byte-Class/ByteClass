import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isToday,
  startOfMonth,
} from "date-fns";

export default function CalendarMonth() {
  const currentDate = new Date();

  const firstDayOfWeek = startOfMonth(currentDate);
  const endDayOfWeek = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfWeek,
    end: endDayOfWeek,
  });

  return (
    <>
      <div className="mt-4 grid h-full grid-cols-7">
        {daysInMonth.map((day) => {
          return (
            <div className="text-center" key={crypto.randomUUID()}>
              {isToday(day) ? (
                <div className="bg-white text-black">
                  <h2 className="rounded-full bg-white p-2 text-xl font-bold">
                    {format(day, "dd")}
                  </h2>
                </div>
              ) : (
                <div className="">
                  <h2 className="rounded-full p-2 text-xl font-bold">
                    {format(day, "dd")}
                  </h2>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
