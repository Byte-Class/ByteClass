import { classroom_v1 } from "googleapis";
import { format, getMonth } from "date-fns";

const STATES = {
  new: "NEW",
  created: "CREATED",
  turnedIn: "TURNED_IN",
  returned: "RETURNED",
  reclaimedByStudent: "RECLAIMED_BY_STUDENT",
};

interface DetermineBadgesArgs {
  state: string | null | undefined;
  late: boolean | undefined | null;
  dueDate: classroom_v1.Schema$Date | undefined;
}

interface BadgesToDisplay {
  badge: string;
  bgColour: string;
  textColour: string;
}

function determineBadges({
  state,
  late,
  dueDate,
}: DetermineBadgesArgs): BadgesToDisplay[] {
  const badgesToDisplay: BadgesToDisplay[] = [];

  if (state === STATES.reclaimedByStudent) {
    badgesToDisplay.push({
      badge: "Reclaimed",
      bgColour: "bg-red-400",
      textColour: "text-white",
    });
  }

  if (state === STATES.returned) {
    badgesToDisplay.push({
      badge: "Returned",
      bgColour: "bg-red-400",
      textColour: "text-white",
    });
  }

  if (state === STATES.turnedIn) {
    badgesToDisplay.push({
      badge: "Handed In",
      bgColour: "bg-green-700",
      textColour: "text-white",
    });
  }

  if (late === true) {
    if (dueDate && state === STATES.created) {
      const month = format(new Date(2024, (dueDate.month || 0) - 1), "MMM");

      badgesToDisplay.push({
        badge: `Due: ${dueDate.day} ${month}`,
        bgColour: "bg-red-800",
        textColour: "text-white",
      });
    }

    badgesToDisplay.push({
      badge: "Late",
      bgColour: "bg-green-600",
      textColour: "text-white",
    });
  }

  return badgesToDisplay;
}

export { determineBadges };
