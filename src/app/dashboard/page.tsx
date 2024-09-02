import type { Metadata } from "next";

import Agenda from "@/components/dashboard/agenda";
import DueSoon from "@/components/dashboard/due-soon";
import ToDo from "@/components/dashboard/todo";

export const metadata: Metadata = {
  title: "Dashboard | ByteClass",
};

export default async function Dashboard() {
  return (
    <div className="h-full w-full">
      <div className="flex w-full gap-4">
        <DueSoon />
        <ToDo />
      </div>

      <Agenda />
    </div>
  );
}
