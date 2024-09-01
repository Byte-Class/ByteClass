import { format } from "date-fns";

export const formatDate = (start: Date, end: Date) => {
  if (format(start, "aaa") === format(end, "aaa")) {
    return `${format(start, "h")}:${format(start, "mm")}-${format(end, "h")}:${format(end, "mm")}${format(start, "a")}`;
  }

  return `${format(start, "h")}:${format(start, "mm")}${format(start, "a")}-${format(end, "h")}:${format(end, "mm")}${format(start, "a")}`;
};
