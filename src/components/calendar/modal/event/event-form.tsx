"use client";

import { useAtomValue, useSetAtom } from "jotai";
import {
  eachMinuteOfInterval,
  endOfDay,
  format,
  formatISO,
  isBefore,
  startOfDay,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCaretDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/core/lib/utils";
import { requests } from "@/core/requests/axios";
import { Button } from "@/components/ui/button";
import { ATOM_CREATE_EVENT_MODEL } from "@/core/atoms/atom";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { CalendarsType } from "@/core/types/interfaces";

export default function CreateEventModalForm({
  calendars,
}: {
  calendars: CalendarsType[];
}) {
  const getEventModal = useAtomValue(ATOM_CREATE_EVENT_MODEL);

  return (
    <>
      <AnimatePresence>
        {getEventModal && (
          <motion.div
            key={"2"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-blackRgba fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center overflow-hidden"
          >
            <motion.div
              drag
              className="z-20 flex w-[1000px] flex-col rounded-xl bg-darkBlack p-4"
            >
              <FormModal calendars={calendars} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const formSchema = z.object({
  eventTitle: z.string().min(2),
  date: z.date({
    required_error: "A date for events is required",
  }),
  from: z.date(),
  description: z.string(),
  end: z.date(),
  location: z.string(),
  calendar: z.string(),
});

const times = eachMinuteOfInterval({
  start: startOfDay(new Date()),
  end: endOfDay(new Date()),
});

function FormModal({ calendars }: { calendars: CalendarsType[] }) {
  const setModal = useSetAtom(ATOM_CREATE_EVENT_MODEL);

  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventTitle: "",
      location: "",
      description: "",
    },
  });

  const createEvent = useMutation({
    mutationFn: ({
      eventTitle,
      description,
      location,
      date,
      from,
      end,
      calendar,
    }: z.infer<typeof formSchema>) => {
      return requests.post(
        "/api/events",
        {
          eventName: eventTitle,
          description,
          location,
          dayOfEvent: formatISO(date),
          start: formatISO(from),
          end: formatISO(end),
          calendarId: calendar,
        },
        {
          headers: {
            session: session.data?.sessionToken,
          },
        },
      );
    },
    onSuccess: () => {
      toast.success("Successfully Created Event");
      form.reset();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // if the ending time is before the start time, we return an error to the client
    if (isBefore(data.end, data.from)) {
      toast.error("Ending time for an event should not be before the start");
      return;
    }

    createEvent.mutate({
      ...data,
    });
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Event Name */}
        <FormField
          control={form.control}
          name="eventTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Event Title" {...field} />
              </FormControl>
              <FormDescription>This is the name of your event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* event time and day */}
        <div className="flex gap-3">
          {/* day picker */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Day</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          className="ml-auto text-base opacity-50"
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Day of Event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* start time */}
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? format(
                              times.find((time) => {
                                return time.valueOf() === field.value.valueOf();
                              }) ?? "",
                              "p",
                            )
                          : "Select Start"}
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Time" />
                      <CommandList>
                        <CommandEmpty>No event Time Specified</CommandEmpty>
                        <CommandGroup>
                          {times.map((time, ind) => (
                            <CommandItem
                              value={format(time, "p")}
                              key={ind}
                              onSelect={() => {
                                form.setValue("from", time);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={cn(
                                  "mr-2 text-base text-white",
                                  time.valueOf() === field.value?.valueOf()
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {format(time, "p")}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Start of Event Time </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* end time */}
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? format(
                              times.find((time) => {
                                return time.valueOf() === field.value.valueOf();
                              }) ?? "",
                              "p",
                            )
                          : "Select End"}
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Time" />
                      <CommandList>
                        <CommandEmpty>No event Time Specified</CommandEmpty>
                        <CommandGroup>
                          {times.map((time, ind) => (
                            <CommandItem
                              value={format(time, "p")}
                              key={ind}
                              onSelect={() => {
                                form.setValue("end", time);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  time.valueOf() === field.value?.valueOf()
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {format(time, "p")}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>End of Event Time</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="mt-0">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location of Event" {...field} />
              </FormControl>
              <FormDescription>
                This is the Location for your event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-0">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description of Event" {...field} />
              </FormControl>
              <FormDescription>
                This is the description for your event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* calendars */}
        <FormField
          control={form.control}
          name="calendar"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Calendar</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? calendars.find((calendar) => {
                            return calendar.id === field.value;
                          })?.name
                        : "Select Calendar"}
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="ml-2 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Calendars..." />
                    <CommandList>
                      <CommandEmpty>No Calendars Found</CommandEmpty>
                      <CommandGroup>
                        {calendars.map((calendar) => (
                          <CommandItem
                            value={calendar.name}
                            key={calendar.id}
                            onSelect={() => {
                              form.setValue("calendar", calendar.id);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className={cn(
                                "mr-2 h-4 w-4",
                                calendar.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {calendar.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            onClick={() => {
              setModal(false);
            }}
            variant={"destructive"}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit">Create Event</Button>
        </div>
      </motion.form>
    </Form>
  );
}
