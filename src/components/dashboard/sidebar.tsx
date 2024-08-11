import Link from "next/link";
import Line from "../line";

type Link = {
  href: string;
  text: string;
};

export default function SideBar() {
  return (
    <div className="flex h-full min-h-[calc(100lvh-7rem)] w-80 flex-col gap-2 bg-lightBlack">
      <Link className="ml-12 text-2xl font-bold" href={"/dashboard/calendar"}>
        Calendar
      </Link>
      <Line className="ml-auto mr-4 w-3/4" />

      <Link className="ml-12 text-2xl font-bold" href={"/dashboard/my-files"}>
        My Files
      </Link>
      <Line className="ml-auto mr-4 w-3/4" />

      <Link className="ml-12 text-2xl font-bold" href={"/dashboard/tasks"}>
        Tasks
      </Link>
      <Line className="ml-auto mr-4 w-3/4" />
    </div>
  );
}
