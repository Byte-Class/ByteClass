import { getHours } from "date-fns";

export const greeting = (now: Date) => {
  const currentHour = getHours(now);

  if (currentHour < 12 && currentHour > 0) {
    return "Good Morning";
  }

  if (currentHour > 12 && currentHour < 18) {
    return "Good Afternoon";
  }

  return "Good Evening";
};
