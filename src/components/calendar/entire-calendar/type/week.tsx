import { format } from "date-fns";

export default function CalendarWeek() {
  const currentDay = format(new Date(), "dd");

  return (
    <div className="mt-4 flex w-full items-center justify-center gap-2">
      {/* Sunday */}
      <div className="flex-1 bg-slate-500 text-center">Sunday</div>

      {/* Monday */}
      <div className="flex-1 bg-slate-500 text-center">Monday</div>

      {/* Tuesday */}
      <div className="flex-1 text-center">Tuesday</div>

      {/* Wednesday */}
      <div className="flex-1 text-center">Wednesday</div>

      {/* Thursday */}
      <div className="flex-1 text-center">Thursday</div>

      {/* Friday */}
      <div className="flex-1 text-center">Friday</div>

      {/* Saturday */}
      <div className="flex-1 text-center">Saturday</div>
    </div>
  );
}
