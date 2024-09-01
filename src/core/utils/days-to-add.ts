import { addMonths, addDays } from "date-fns";

export function daysToAdd(
  calendarType: "month" | "week" | "day",
  currentDay: Date,
  action: "add" | "remove",
) {
  if (action === "add") {
    // Add Days
    if (calendarType === "month") {
      return addMonths(currentDay, 1);
    }

    if (calendarType === "week") {
      return addDays(currentDay, 7);
    }

    if (calendarType === "day") {
      return addDays(currentDay, 1);
    }
  }

  if (action === "remove") {
    // Remove Days
    if (calendarType === "month") {
      return addMonths(currentDay, -1);
    }

    if (calendarType === "week") {
      return addDays(currentDay, -7);
    }

    if (calendarType === "day") {
      return addDays(currentDay, -1);
    }
  }

  return currentDay;
}
