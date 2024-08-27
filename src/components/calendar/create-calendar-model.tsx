import { useAtomValue } from "jotai";

import { ATOM_CREATE_CALENDAR_MODEL } from "@/core/atoms/atom";

export default function CreateCalendarModal() {
  const getCalendarModal = useAtomValue(ATOM_CREATE_CALENDAR_MODEL);

  return (
    <>
      {getCalendarModal && (
        <div className="absolute left-1/2 top-1/2 z-10 flex w-[1000px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-black p-4">
          <FormModal />
        </div>
      )}
    </>
  );
}

function FormModal() {
  return <div>e</div>;
}
