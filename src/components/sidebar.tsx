"use client";

import { usePathname } from "next/navigation";

import { Children, ReactNode } from "react";

export default function SideBarWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Because this component needs to be client, we need to pass sidebars as props to render them ssr way
  const result = Children.toArray(children);

  return (
    <>
      {(() => {
        if (pathname === "/dashboard/calendar") {
          return <>{result[0]}</>;
        } else {
          return <>{result[1]}</>;
        }
      })()}
    </>
  );
}
