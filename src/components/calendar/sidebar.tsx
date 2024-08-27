import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import Line from "@/components/line";
import ChoseCalendar from "@/components/calendar/chose-calendar/chose-calendar";
import { useSetAtom } from "jotai";
import { ATOM_EVENT_MODAL } from "@/core/atoms/atom";

export default function SideBarCalendar() {
  const setModal = useSetAtom(ATOM_EVENT_MODAL);

  return (
    <div className="flex h-full min-h-[calc(100lvh-7rem)] w-80 flex-col bg-lightBlack p-4">
      <Button
        className="flex gap-2"
        onClick={() => {
          setModal(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
        Create Event
      </Button>

      <div className="mt-auto">
        <h2 className="text-2xl font-bold">Calendars</h2>

        <Line className="mb-2 ml-0 mt-2 w-[90%]" />

        <ChoseCalendar />
      </div>
    </div>
  );
}
