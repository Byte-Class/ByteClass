"use client";

import { requests } from "@/core/requests/axios";
import { Calendar } from "@/core/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import CalendarCheckbox from "./calendar-checkbox";

export default function ChoseCalendar() {
  const session = useSession();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["/api", "/calendar", "/uuid"],
    queryFn: () =>
      requests.get(`/api/calendars/${session.data?.user?.id}`, {
        headers: {
          session: session.data?.sessionToken,
        },
      }),
  });

  return (
    <div className="flex flex-col gap-2">
      {!data?.data ? (
        <h2>Nothing to see here</h2>
      ) : (
        (data.data as Calendar[]).map((calendar) => (
          <CalendarCheckbox
            name={calendar.name}
            id={calendar.id}
            userId={calendar.userId}
            key={crypto.randomUUID()}
          />
        ))
      )}
    </div>
  );
}
