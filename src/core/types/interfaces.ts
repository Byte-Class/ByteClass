import { classroom_v1 } from "googleapis";

export interface CourseList {
  id: string | null | undefined;
  name: string | null | undefined;
}

export interface PropsSectionTasks {
  sectionHeader: string;
  itemsToShow: classroom_v1.Schema$StudentSubmission[];
}
