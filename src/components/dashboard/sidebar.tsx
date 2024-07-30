import Link from "next/link";
import Line from "../line";

type Link = {
  href: string;
  text: string;
};

export default function SideBar() {
  return (
    <div className="flex h-full min-h-lvh w-80 flex-col gap-2 bg-lightBlack">
      <Link
        key={crypto.randomUUID()}
        className="ml-12 text-2xl font-bold"
        href={"/calender"}
      >
        Calender
      </Link>
      <Line key={crypto.randomUUID()} className="ml-auto mr-4 w-3/4" />

      <Link
        key={crypto.randomUUID()}
        className="ml-12 text-2xl font-bold"
        href={"/myFiles"}
      >
        My Files
      </Link>
      <Line key={crypto.randomUUID()} className="ml-auto mr-4 w-3/4" />

      <Link
        key={crypto.randomUUID()}
        className="ml-12 text-2xl font-bold"
        href={"/tasks"}
      >
        Tasks
      </Link>
      <Line key={crypto.randomUUID()} className="ml-auto mr-4 w-3/4" />
    </div>
  );
}
