import { Calendar } from "@/core/types/interfaces";

import { Checkbox } from "@/components/ui/checkbox";

export default function CalendarCheckbox({ name, id }: Calendar) {
  return (
    <div className="ml-4 flex w-[80%] items-center gap-2">
      <Checkbox />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </label>
    </div>
  );
}
