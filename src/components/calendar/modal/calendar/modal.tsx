import { auth } from "auth";
import { SessionProvider } from "next-auth/react";

import CreateCalendarModalForm from "./calendar-form";

export default async function CreateCalendarModal() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <CreateCalendarModalForm />
    </SessionProvider>
  );
}
