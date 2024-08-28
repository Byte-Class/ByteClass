import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { requests } from "@/core/requests/axios";
import { queryProvider } from "@/app/_providers";
import type { Calendar } from "@/core/types/interfaces";

import { Checkbox } from "@/components/ui/checkbox";

export default function CalendarCheckbox({ name, id, checked }: Calendar) {
  const session = useSession();

  const toggleCalendar = useMutation({
    mutationFn: () =>
      requests.put(`/api/calendars/${id}`, undefined, {
        headers: {
          session: session.data?.sessionToken,
        },
      }),
    onError: () => {
      toast.error("Unable to check calendar, try again later");
    },
    onSuccess: () => {
      // Invalid cache for old fetchAllCalendars Query
      queryProvider.invalidateQueries({
        queryKey: ["/api", "/calendars", { param: "/uuid" }],
      });
    },
  });

  return (
    <div
      className="ml-4 flex items-center gap-2"
      onClick={() => {
        toggleCalendar.mutate();
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
