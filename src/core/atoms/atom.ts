import { atom } from "jotai";
import { Calendar, CalendarsChecked } from "../types/interfaces";

export const ATOM_CALENDAR_TYPE = atom<"month" | "week" | "day">("week");

export const ATOM_CURRENT_DAY = atom<Date>(new Date());

export const ATOM_CREATE_EVENT_MODEL = atom<boolean>(false);

export const ATOM_CREATE_CALENDAR_MODEL = atom<boolean>(false);

export const ATOM_CALENDARS = atom<Calendar[] | undefined>(undefined);

export const ATOM_CHECKED_CALENDARS = atom<CalendarsChecked[] | undefined>(
  undefined,
);
