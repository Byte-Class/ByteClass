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
      <div className="mt-4 grid grid-cols-7">
        {daysInMonth.map((month) => {
          return (
            <div className="text-center" key={crypto.randomUUID()}>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold">{format(month, "EEEE")}</h2>

                {isToday(month) ? (
                  <h2 className="aspect-square rounded-full bg-blue-700 p-2 text-xl font-bold">
                    {format(month, "dd")}
                  </h2>
                ) : (
                  <h2 className="aspect-square rounded-full p-2 text-xl font-bold">
                    {format(month, "dd")}
                  </h2>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
