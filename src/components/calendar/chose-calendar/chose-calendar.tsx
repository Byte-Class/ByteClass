"use client";

import { requests } from "@/core/requests/axios";
import { Calendar } from "@/core/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Skeleton } from "@/components/ui/skeleton";
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

  if (isError) {
    return (
      <div>
        <h2>oops</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex w-full gap-2">
          <Skeleton className="ml-4 h-[1rem] w-[1rem] rounded-sm" />
          <Skeleton className="h-[1rem] flex-grow rounded-sm" />
        </div>
        <div className="flex w-full gap-2">
          <Skeleton className="ml-4 h-[1rem] w-[1rem] rounded-sm" />
          <Skeleton className="h-[1rem] flex-grow rounded-sm" />
        </div>
        <div className="flex w-full gap-2">
          <Skeleton className="ml-4 h-[1rem] w-[1rem] rounded-sm" />
          <Skeleton className="h-[1rem] flex-grow rounded-sm" />
        </div>
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="flex flex-col gap-2">
        <h2>No data {":("}</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {isLoading && <div>loading</div>}
      {!data?.data || isError ? (
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
