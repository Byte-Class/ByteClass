import type { Metadata } from "next";

import Stats from "@/components/dashboard/stats";
import Agenda from "@/components/dashboard/agenda";
import ToDo from "@/components/dashboard/todo";

export const metadata: Metadata = {
  title: "Dashboard | ByteClass",
};

export default async function Dashboard() {
  return (
    <div className="h-full w-full">
      <div className="flex w-full gap-4">
        <Stats />
        <ToDo />
      </div>

      <Agenda />
    </div>
  );
}
