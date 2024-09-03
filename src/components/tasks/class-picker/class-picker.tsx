import { google } from "googleapis";
import { toast } from "react-toastify";

import ClassPickerFilter from "./filter";

export default async function ClassPicker() {
  const classroom = google.classroom("v1");

  // Fetch Courses from google
  const courses = (
    await classroom.courses.list({
      courseStates: ["ACTIVE"],
    })
  ).data.courses;

  if (courses === undefined) {
    toast.error("Unknown error while fetching classes");
    return;
  }

  return <ClassPickerFilter courses={courses} />;
}
