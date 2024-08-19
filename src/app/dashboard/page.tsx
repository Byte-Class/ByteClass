import Agenda from "@/components/dashboard/agenda";
import DueSoon from "@/components/dashboard/due-soon";
import ToDo from "@/components/dashboard/todo";

export default async function Dashboard() {
  return (
    <main className="w-full">
      <div className="flex w-full gap-4">
        <DueSoon />
        <ToDo />
      </div>

      <Agenda />
    </main>
  );
}
