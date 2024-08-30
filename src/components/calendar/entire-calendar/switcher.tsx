import CalendarWeekButtonSwitcher from "@/components/calendar/entire-calendar/switcher-buttons";
import CalendarWeekToggleCalendar from "./switcher-calendar-type";

export default function CalendarWeekSwitcher() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <CalendarWeekButtonSwitcher />
      </div>

      <div>
        <CalendarWeekToggleCalendar />
      </div>
    </div>
  );
}
