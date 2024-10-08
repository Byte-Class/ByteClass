"use client";

import { useForm } from "react-hook-form";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { ATOM_CREATE_CALENDAR_MODEL } from "@/core/atoms/atom";

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
import { trpc } from "@/server/client";

export default function CreateCalendarModalForm() {
  const getCalendarModal = useAtomValue(ATOM_CREATE_CALENDAR_MODEL);

  return (
    <>
      <AnimatePresence>
        {getCalendarModal && (
          <motion.div
            key={"1"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center overflow-hidden bg-blackRgba"
          >
            <motion.div
              drag
              className="z-20 flex w-[1000px] flex-col rounded-xl bg-darkBlack p-4"
            >
              <FormModal />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const formSchema = z.object({
  calendarName: z.string().min(1),
  description: z.string().min(1).max(200),
});

function FormModal() {
  const setCalendarModal = useSetAtom(ATOM_CREATE_CALENDAR_MODEL);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calendarName: "",
      description: "",
    },
  });

  const { mutate, isError } = trpc.calendar.createCalendar.useMutation({
    onSuccess() {
      toast.success("Successfully Created Calender");
      router.refresh();
      form.reset();
    },
  });

  if (isError) {
    toast.error("Unable to create calendar");
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate({
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
                  placeholder="Write a GOOD calendar description"
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
