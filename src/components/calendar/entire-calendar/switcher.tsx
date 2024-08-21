import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function CalendarWeekSwitcher() {
  const month = format(new Date(), "MMMM");
  const year = format(new Date(), "uuuu");

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <Button>Prev</Button>
        <h2 className="text-2xl font-bold">
          {month}, {year}
        </h2>
        <Button>Next</Button>
      </div>

      <div>
        <ToggleGroup type="single">
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
