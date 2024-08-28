"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryProvider = new QueryClient();

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryProvider}>{children}</QueryClientProvider>
  );
}
