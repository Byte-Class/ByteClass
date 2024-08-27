import "../globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider } from "next-auth/react";
import { Alegreya_Sans } from "next/font/google";
import { Suspense } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { Metadata } from "next";
import { auth } from "auth";
import { ToastContainer } from "react-toastify";

import Navbar from "@/components/navbar/navbar";
import Loading from "@/app/dashboard/loading";
import Provider from "@/app/_providers";
import SideBarWrapper from "@/components/sidebar";
import { cn } from "@/core/lib/utils";

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

export default async function OtherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

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
          <ToastContainer theme="colored" />

          <main className="flex h-full min-h-[calc(100lvh-7rem)] items-start justify-center">
            <SessionProvider session={session}>
              <SideBarWrapper />
            </SessionProvider>

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
