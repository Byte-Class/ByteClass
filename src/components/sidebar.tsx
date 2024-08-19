"use client";

import { usePathname } from "next/navigation";

import SideBarOther from "./dashboard/sidebar";
import SideBarCalendar from "./calendar/sidebar";

export default function SideBarWrapper() {
  const pathname = usePathname();

  return (
    <>
      {(() => {
        if (pathname === "/dashboard/calendar") {
          return <SideBarCalendar />;
        } else {
          return <SideBarOther />;
        }
      })()}
    </>
  );
}
