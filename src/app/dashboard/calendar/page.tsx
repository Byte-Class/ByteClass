import { SessionProvider } from "next-auth/react";
import { auth } from "auth";
import { Metadata } from "next";

import CalendarWeekSwitcher from "@/components/calendar/entire-calendar/switcher";
import CreateEventModal from "@/components/calendar/create-event-modal";
import CreateCalendarModal from "@/components/calendar/create-calendar-model";
import DisplayCalendar from "@/components/calendar/display-calendar";

export const metadata: Metadata = {
  title: "Calendar | Byte Class",
};

export default async function Calendar() {
  const session = await auth();

  return (
    <main className="w-full">
      <CalendarWeekSwitcher />

      <CreateEventModal />
      <CreateCalendarModal />

      <SessionProvider session={session}>
        <DisplayCalendar />
      </SessionProvider>
    </main>
  );
}
