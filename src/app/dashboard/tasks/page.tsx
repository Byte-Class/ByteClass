import { auth } from "auth";
import { google } from "googleapis";

import { CourseList } from "@/core/types/interfaces";

import ClassPicker from "@/components/tasks/class-picker";
import PinnedClasses from "@/components/tasks/pinned-classes";
import SectionTasks from "@/components/tasks/section-tasks";

export default async function Tasks() {
  const session = await auth();

  if (!session) {
    return;
  }

  // OAuth
  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    process.env.GOOGLE_CALLBACK,
  );
  oauth2Client.setCredentials({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });
  google.options({
    auth: oauth2Client,
  });

  // get all courses
  const classroom = google.classroom("v1");
  const allCourses = (
    await classroom.courses.list({
      courseStates: ["ACTIVE"],
    })
  ).data.courses;

  if (allCourses === undefined) {
    return;
  }

  const courses: CourseList[] = [];

  allCourses.map((course) => {
    courses.push({ name: course.name, id: course.id });
  });

  const courseWorksTurnedIn = (
    await classroom.courses.courseWork.studentSubmissions.list({
      courseId: "702720364512",
      courseWorkId: "-",
      states: ["TURNED_IN"],
    })
  ).data.studentSubmissions;

  const courseWorkReclaimedReturned = (
    await classroom.courses.courseWork.studentSubmissions.list({
      courseId: "702720364512",
      courseWorkId: "-",
      states: ["RETURNED", "RECLAIMED_BY_STUDENT"],
    })
  ).data.studentSubmissions;

  const courseWorkOverdue = (
    await classroom.courses.courseWork.studentSubmissions.list({
      courseId: "702720364512",
      courseWorkId: "-",
      late: "LATE_ONLY",
      states: ["CREATED"],
    })
  ).data.studentSubmissions;

  if (
    courseWorksTurnedIn === undefined ||
    courseWorkReclaimedReturned === undefined ||
    courseWorkOverdue === undefined
  ) {
    return;
  }

  return (
    <>
      <h2 className="text-5xl font-bold">Your Tasks</h2>

      <div className="mt-4 flex w-full gap-4">
        <ClassPicker courses={courses} />

        <PinnedClasses />
      </div>

      <div className="ml-auto mr-auto mt-4 w-11/12">
        <SectionTasks sectionHeader="Overdue" itemsToShow={courseWorkOverdue} />

        <SectionTasks
          sectionHeader="Returned"
          itemsToShow={courseWorkReclaimedReturned}
        />
        <SectionTasks
          sectionHeader="Handed In"
          itemsToShow={courseWorksTurnedIn}
        />
      </div>
    </>
  );
}
