"use client";

import { useSetAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { requests } from "@/core/requests/axios";
import { Calendar, CalendarsChecked } from "@/core/types/interfaces";
import { ATOM_CALENDARS, ATOM_CHECKED_CALENDARS } from "@/core/atoms/atom";

import CalendarCheckbox from "@/components/calendar/chose-calendar/calendar-checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

export default function ChoseCalendar() {
  const session = useSession();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["/api", "/calendars", { param: "/uuid" }],
    queryFn: () =>
      requests.get(`/api/calendars/${session.data?.user?.id}`, {
        headers: {
          session: session.data?.sessionToken,
        },
      }),
  });

  const setCalendars = useSetAtom(ATOM_CALENDARS);
  const setCheckedCalendars = useSetAtom(ATOM_CHECKED_CALENDARS);

  useEffect(() => {
    if (data === undefined) {
      return;
    }

    setCheckedCalendars(
      (data.data as Calendar[]).map((item) => {
        return { id: item.id, name: item.name };
      }),
    );
  }, [data, setCheckedCalendars]);

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

  if (!data || !data.data || isError) {
    return (
      <div className="flex flex-col gap-2">
        <h2>
          You have NO calendars. MUCH LIKE THE NUMBER OF BITCHES YOU HAVE.
        </h2>
      </div>
    );
  }

  if ((data.data as Calendar[]).length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <h2>
          You have NO calendars. MUCH LIKE THE NUMBER OF BITCHES YOU HAVE.
        </h2>
      </div>
    );
  }

  // Add all calendars to state
  setCalendars(data.data as Calendar[]);

  return (
    <div className="flex flex-col gap-2">
      {(data.data as Calendar[]).map((calendar) => (
        <CalendarCheckbox
          name={calendar.name}
          id={calendar.id}
          userId={calendar.userId}
          checked={calendar.checked}
          key={crypto.randomUUID()}
        />
      ))}
    </div>
  );
}
