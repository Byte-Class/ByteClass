import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

import { requests } from "@/core/requests/axios";
import type { Calendar } from "@/core/types/interfaces";

import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";

export default function CalendarCheckbox({ name, id, checked }: Calendar) {
  const session = useSession();

  const toggleCalendar = useMutation({
    mutationFn: () =>
      requests.put(`/api/calendars/${id}`, undefined, {
        headers: {
          session: session.data?.sessionToken,
        },
      }),
    onError: (data) => {
      toast.error("Unable to check calendar, try again later");
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
