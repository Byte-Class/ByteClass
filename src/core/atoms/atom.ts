import { atom } from "jotai";
import { Calendar } from "../types/interfaces";

export const ATOM_CALENDAR_TYPE = atom<"month" | "week" | "day">("week");

export const ATOM_CURRENT_DAY = atom<Date>(new Date());

export const ATOM_EVENT_MODAL = atom<boolean>(false);

export const ATOM_CALENDARS = atom<Calendar[] | undefined>(undefined);