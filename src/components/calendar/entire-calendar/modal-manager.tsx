"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCalendarDays,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSetAtom } from "jotai";

import {
  ATOM_CREATE_CALENDAR_MODEL,
  ATOM_CREATE_EVENT_MODEL,
} from "@/core/atoms/atom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ModalManager() {
  const setCalendarModal = useSetAtom(ATOM_CREATE_CALENDAR_MODEL);
  const setEventModal = useSetAtom(ATOM_CREATE_EVENT_MODEL);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex justify-start gap-2">
          <FontAwesomeIcon icon={faPlus} />
          Create
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>Creations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              setTimeout(() => {
                setEventModal(false);
                setCalendarModal(true);
              }, 150);
            }}
          >
            <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
            <span>Calendar</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setTimeout(() => {
                setCalendarModal(false);
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
  );
}
