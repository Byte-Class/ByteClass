"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function PinnedClasses() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem
        variant={"outline"}
        value="calculus"
        aria-label="Toggle Calculus"
      >
        Calculus
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={"outline"}
        value="italic"
        aria-label="Toggle italic"
      >
        Physics
      </ToggleGroupItem>
      <ToggleGroupItem
        variant={"outline"}
        value="underline"
        aria-label="Toggle underline"
      >
        Computer Science
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
