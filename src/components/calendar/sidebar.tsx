import { Suspense } from "react";

import Line from "@/components/line";
import ChoseCalendar from "@/components/calendar/chose-calendar/chose-calendar";
import ModalManager from "@/components/calendar/entire-calendar/modal-manager";

export default function SideBarCalendar() {
  return (
    <div className="flex h-full min-h-[calc(100lvh-7rem)] w-80 flex-col bg-lightBlack p-4">
      <ModalManager />

      <div className="mt-auto">
        <h2 className="text-2xl font-bold">Calendars</h2>

        <Line className="mb-2 ml-0 mt-2 w-[90%]" />

        <Suspense fallback={<h2>Loading...</h2>}>
          <ChoseCalendar />
        </Suspense>
      </div>
    </div>
  );
}
