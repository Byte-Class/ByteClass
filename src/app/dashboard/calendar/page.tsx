import { auth } from "auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import CalendarWeekSwitcher from "@/components/calendar/entire-calendar/switcher";
import CalendarWeek from "@/components/calendar/entire-calendar/type/week";

export const metadata: Metadata = {
  title: "Calendar | Byte Class",
};

export default async function Calendar() {
  const session = await auth();

  return (
    <main className="min-h-lvh w-full">
      <SessionProvider session={session}>
        <CalendarWeekSwitcher />
        <CalendarWeek />
      </SessionProvider>
    </main>
  );
}
