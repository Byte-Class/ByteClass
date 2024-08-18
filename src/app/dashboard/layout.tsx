import "../globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Alegreya_Sans } from "next/font/google";
import { cn } from "@/core/lib/utils";
import { Suspense } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { Metadata } from "next";

import Navbar from "@/components/navbar/navbar";
import SideBar from "@/components/dashboard/sidebar";
import Loading from "./loading";
import Provider from "../_providers";

config.autoAddCss = false;

const fontSans = Alegreya_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dashboard | ByteClass",
  description: "The dashboard for",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logos/byte.png" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-darkBlack font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Provider>
          <Navbar />

          <main className="flex h-full min-h-[calc(100lvh-7rem)] items-start justify-center">
            <SideBar />

            <Suspense fallback={<Loading />}>
              <div className="min-h-[calc(100lvh-7rem)] flex-grow p-8">
                {children}
              </div>
            </Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
}
