import { auth } from "auth";
import { eq } from "drizzle-orm";
import { SessionProvider } from "next-auth/react";

import { db } from "@/drizzle/db";
import { timeTable } from "@/drizzle/schema";

import CreateEventModalForm from "./event-form";

export default async function CreateEventModal() {
  const session = await auth();

  const calendars = await db
    .select()
    .from(timeTable)
    .where(eq(timeTable.userId, session?.user?.id as string));

  console.log(calendars);

  return (
    <SessionProvider session={session}>
      <CreateEventModalForm calendars={calendars} />
    </SessionProvider>
  );
}
