"use client";

import { requests } from "@/core/requests/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function TestComponent() {
  const session = useSession();

  // const res = useQuery({
  //   queryKey: ["1"],
  //   queryFn: () => {
  //     return requests.post(
  //       "/api/calendars",
  //       {
  //         tableName: "e",
  //       },
  //       {
  //         headers: {
  //           session: session.data?.sessionToken,
  //         },
  //       },
  //     );
  //   },
  //   refetchOnWindowFocus: false,
  // });

  return <div></div>;
}
