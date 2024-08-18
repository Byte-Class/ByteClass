import TestComponent from "@/components/test";
import { auth } from "auth";
import { google } from "googleapis";
import { SessionProvider } from "next-auth/react";

export default async function Calendar() {
  const session = await auth();

  return (
    <main>
      <SessionProvider session={session}>
        <TestComponent />
      </SessionProvider>
    </main>
  );
}
