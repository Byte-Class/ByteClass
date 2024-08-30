"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { Provider } from "jotai";

export const queryProvider = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <QueryClientProvider client={queryProvider}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}
