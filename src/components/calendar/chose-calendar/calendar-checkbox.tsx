"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import type { Calendar } from "@/core/types/interfaces";
import { trpc } from "@/server/client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CalendarCheckbox({ name, id, checked }: Calendar) {
  const router = useRouter();

  const { mutate, isError, isSuccess } =
    trpc.calendar.toggleCalendar.useMutation({
      onSuccess() {
        router.refresh();
      },
    });

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
