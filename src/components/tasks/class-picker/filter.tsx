import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { classroom_v1 } from "googleapis";
import ClassPickerFilterItem from "./filter-item";

export default function ClassPickerFilter({
  courses,
}: {
  courses: classroom_v1.Schema$Course[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Filter Classes</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Classes</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {courses.map((course) => {
          return (
            <ClassPickerFilterItem key={crypto.randomUUID()} course={course} />
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
