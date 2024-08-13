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
}

interface BadgesToDisplay {
  badge: string;
  bgColour: string;
  textColour: string;
}

function determineBadges({
  state,
  late,
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
    badgesToDisplay.push({
      badge: "Late",
      bgColour: "bg-green-600",
      textColour: "text-white",
    });
  }

  return badgesToDisplay;
}

export { determineBadges };
