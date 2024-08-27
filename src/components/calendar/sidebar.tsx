import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCalendarDays,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSetAtom } from "jotai";

import { ATOM_CREATE_EVENT_MODEL } from "@/core/atoms/atom";

import Line from "@/components/line";
import ChoseCalendar from "@/components/calendar/chose-calendar/chose-calendar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SideBarCalendar() {
  const setEventModal = useSetAtom(ATOM_CREATE_EVENT_MODEL);

  return (
    <div className="flex h-full min-h-[calc(100lvh-7rem)] w-80 flex-col bg-lightBlack p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex justify-start gap-4">
            <FontAwesomeIcon icon={faPlus} />
            Create
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuLabel>Creations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onToggle={() => alert("Create Calendar")}>
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
              <span>Calendar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                setTimeout(() => {
                  setEventModal(true);
                }, 150);
              }}
            >
              <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
              <span>Event</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mt-auto">
        <h2 className="text-2xl font-bold">Calendars</h2>

        <Line className="mb-2 ml-0 mt-2 w-[90%]" />

        <ChoseCalendar />
      </div>
    </div>
  );
}
