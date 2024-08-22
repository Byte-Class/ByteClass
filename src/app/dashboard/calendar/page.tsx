import { auth } from "auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import CalendarClient from "@/components/calendar/calendar";

export const metadata: Metadata = {
  title: "Calendar | Byte Class",
};

export default async function Calendar() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <CalendarClient />
    </SessionProvider>
  );
}
