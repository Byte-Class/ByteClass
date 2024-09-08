import "../globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";

import Navbar from "@/components/navbar/navbar";
import Loading from "@/app/dashboard/loading";
import SideBarWrapper from "@/components/sidebar";

import SideBarCalendar from "@/components/calendar/sidebar";
import SideBarOther from "@/components/dashboard/sidebar";

config.autoAddCss = false;

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <ToastContainer theme="colored" pauseOnHover={false} />
      <main className="flex h-full min-h-[calc(100lvh-7rem)] items-start justify-center">
        <SideBarWrapper>
          <SideBarCalendar />
          <SideBarOther />
        </SideBarWrapper>

        <Suspense fallback={<Loading />}>
          <div className="min-h-[calc(100lvh-7rem)] w-[calc(100vw-20rem)] p-8">
            {children}
          </div>
        </Suspense>
      </main>
    </>
  );
}
