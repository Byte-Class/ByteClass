"use client";

import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { requests } from "@/core/requests/axios";
import type { Calendar } from "@/core/types/interfaces";
import { trpc } from "@/server/client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CalendarCheckbox({ name, id, checked }: Calendar) {
  const session = useSession();
  const router = useRouter();

  // const toggleCalendar = useMutation({
  //   mutationFn: () =>
  //     requests.put(`/api/calendars/${id}`, undefined, {
  //       headers: {
  //         session: session.data?.sessionToken,
  //       },
  //     }),
  //   onError: () => {
  //     toast.error("Unable to check calendar, try again later");
  //   },
  //   onSuccess: () => {
  //     // Invalid cache for old fetchAllCalendars Query
  //     router.refresh();
  //   },
  // });

  const { mutate, isError } = trpc.calendar.toggleCalendar.useMutation();

  if (isError) {
    toast.error("Unable to toggle calendar");
  }

  return (
    <div
      className="ml-4 flex items-center gap-2"
      onClick={() => {
        mutate({
          calendarId: id,
        });
      }}
    >
      <Checkbox defaultChecked={checked} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </label>
    </div>
  );
}
