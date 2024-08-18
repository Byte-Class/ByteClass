"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  const queryProvider = new QueryClient();

  return (
    <QueryClientProvider client={queryProvider}>{children}</QueryClientProvider>
  );
}
