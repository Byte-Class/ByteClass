import { ATOM_EVENT_MODAL } from "@/core/atoms/atom";
import { useAtomValue, useSetAtom } from "jotai";

export default function CalendarModal() {
  const setModal = useSetAtom(ATOM_EVENT_MODAL);
  const getModal = useAtomValue(ATOM_EVENT_MODAL);

  return <>{getModal && <div>HELLO</div>}</>;
}
