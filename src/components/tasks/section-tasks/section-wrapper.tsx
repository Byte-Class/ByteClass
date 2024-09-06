import { google } from "googleapis";
import { auth } from "auth";
import { accounts, activeCourses } from "tables";
import { db } from "db";
import { and, eq } from "drizzle-orm";
import { toast } from "react-toastify";

import { authGoogle } from "@/core/utils/auth-google";

import SectionTasks from "@/components/tasks/section-tasks/section-tasks";
// import { FetchGoogle } from "@/core/utils/fetch-google";
import { trpc } from "@/server/client";
import HandedInSection from "./handed-in-section";

export default async function SectionTasksWrapper() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return toast.error("You are not authorized");
  }

  // request data from database
  const { refresh_token } = (
    await db.select().from(accounts).where(eq(accounts.userId, session.user.id))
  )[0];

  const active = (
    await db
      .select({
        courseId: activeCourses.courseId,
      })
      .from(activeCourses)
      .where(
        and(
          eq(activeCourses.userId, session.user.id),
          eq(activeCourses.active, true),
        ),
      )
  ).map((course) => course.courseId);

  authGoogle(refresh_token);

  // const courseWorksOverdue = await new FetchGoogle(active).courseWorksOverDue();

  // const returnedReclaimedReturned = await new FetchGoogle(
  //   active,
  // ).fetchReclaimedReturned();

  return (
    <>
      {/* <SectionTasks sectionHeader="Overdue" itemsToShow={courseWorksOverdue} />

      <SectionTasks
        sectionHeader="Returned"
        itemsToShow={returnedReclaimedReturned}
      /> */}
      <HandedInSection />
    </>
  );
}
