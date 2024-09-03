import { auth } from "auth";
import { eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { timeTable } from "@/drizzle/schema";

import CreateEventModalForm from "./event-form";

export default async function CreateEventModal() {
  const session = await auth();

  const calendars = await db
    .select()
    .from(timeTable)
    .where(eq(timeTable.userId, session?.user?.id as string));

  return <CreateEventModalForm calendars={calendars} />;
}
