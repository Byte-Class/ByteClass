import { createSelectSchema } from "drizzle-zod";
import { classroom_v1 } from "googleapis";
import { z } from "zod";

import { event, timeTable } from "@/drizzle/schema";

export interface CourseList {
  id: string | null | undefined;
  name: string | null | undefined;
}

export interface PropsSectionTasks {
  sectionHeader: string;
  itemsToShow: classroom_v1.Schema$StudentSubmission[];
}

export interface Calendar {
  id: string;
  userId: string;
  name: string;
  checked: boolean;
}

export interface CalendarsChecked {
  id: string;
  name: string;
}

const eventSchema = createSelectSchema(event, {
  time: z.object({ start: z.string(), end: z.string() }),
});
export type EventsType = z.infer<typeof eventSchema>;

const calendarSchema = createSelectSchema(timeTable);
export type CalendarsType = z.infer<typeof calendarSchema>;

export type ColourType =
  | "F02D3A"
  | "FF964F"
  | "F0D975"
  | "57BD57"
  | "6FA8D6"
  | "A185D6";
