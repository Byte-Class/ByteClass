import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from "date-fns";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ATOM_CALENDAR_TYPE, ATOM_CURRENT_DAY } from "@/core/atoms/atom";

export default function CalendarWeekSwitcher() {
  const getDate = useAtomValue(ATOM_CURRENT_DAY);
  const setNewDate = useSetAtom(ATOM_CURRENT_DAY);

  const setAtom = useSetAtom(ATOM_CALENDAR_TYPE);
  const getAtom = useAtomValue(ATOM_CALENDAR_TYPE);

  const year = format(getDate, "uuuu");

  const dayInterval = eachDayOfInterval({
    start: startOfWeek(getDate),
    end: endOfWeek(getDate),
  });

  const firstMonth = dayInterval[0];
  const lastMonth = dayInterval[dayInterval.length - 1];

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center gap-3">
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
            firstMonth={firstMonth}
            lastMonth={lastMonth}
            year={year}
          />
        </h2>
      </div>

      <div>
        <ToggleGroup
          type="single"
          defaultValue={getAtom}
          onValueChange={(value: "month" | "week" | "day") => {
            setAtom(value);
          }}
        >
          <ToggleGroupItem
            value="month"
            aria-label="Toggle Month"
            variant={"outline"}
            className="font-bold"
          >
            Month
          </ToggleGroupItem>
          <ToggleGroupItem
            value="week"
            aria-label="Toggle Week"
            variant={"outline"}
            className="font-bold"
          >
            Week
          </ToggleGroupItem>
          <ToggleGroupItem
            value="day"
            aria-label="Toggle Day"
            variant={"outline"}
            className="font-bold"
          >
            Day
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
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
