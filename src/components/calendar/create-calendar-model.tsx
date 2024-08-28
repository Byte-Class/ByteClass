import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";

import { ATOM_CREATE_CALENDAR_MODEL } from "@/core/atoms/atom";
import { queryProvider } from "@/app/_providers";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { requests } from "@/core/requests/axios";

export default function CreateCalendarModal() {
  const getCalendarModal = useAtomValue(ATOM_CREATE_CALENDAR_MODEL);

  return (
    <>
      {getCalendarModal && (
        <div className="absolute left-1/2 top-1/2 z-10 flex w-[1000px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-black p-4">
          <FormModal />
        </div>
      )}
    </>
  );
}

const formSchema = z.object({
  calendarName: z.string().min(1),
  description: z.string().min(1).max(200),
});

function FormModal() {
  const setCalendarModal = useSetAtom(ATOM_CREATE_CALENDAR_MODEL);

  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calendarName: "",
      description: "",
    },
  });

  const createCalendar = useMutation({
    mutationFn: ({ calendarName, description }: z.infer<typeof formSchema>) => {
      return requests.post(
        "/api/calendars",
        {
          tableName: calendarName,
          description,
        },
        {
          headers: {
            session: session.data?.sessionToken,
          },
        },
      );
    },
    onSuccess() {
      toast.success("Successfully Created Calender");

      // TODO: Invalidate old fetched calendars
      queryProvider.invalidateQueries({
        queryKey: ["/api", "/calendars", { param: "/uuid" }],
      });

      form.reset();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    createCalendar.mutate({
      ...data,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="calendarName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calendar Name</FormLabel>
              <FormControl>
                <Input placeholder="Calendar Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your calendar
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calendar Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the description of your calendar, you can change this
                later
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            onClick={() => {
              setCalendarModal(false);
            }}
            variant={"destructive"}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit">Create Calendar</Button>
        </div>
      </form>
    </Form>
  );
}
