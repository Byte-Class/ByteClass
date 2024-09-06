// import { trpc } from "@/server/client";
// import { classroom_v1, google } from "googleapis";

// export class FetchGoogle {
//   courseIds: string[] = [];
//   classroom: classroom_v1.Classroom = google.classroom("v1");

//   constructor(courseIds: string[]) {
//     this.courseIds = courseIds;
//   }

//   async fetchHandedInWorks() {
//     const { data } = trpc.courses.handedInWorks.useQuery({
//       courseIds: this.courseIds,
//     });

//     return data ?? [];
//   }

//   async fetchReclaimedReturned() {
//     let handedIn: classroom_v1.Schema$StudentSubmission[] = [];

//     for (let i = 0; i < this.courseIds.length; i++) {
//       const courseId = this.courseIds[i];

//       const courseWorkReclaimedReturned = (
//         await this.classroom.courses.courseWork.studentSubmissions.list({
//           courseId: courseId,
//           courseWorkId: "-",
//           states: ["RETURNED", "RECLAIMED_BY_STUDENT"],
//         })
//       ).data.studentSubmissions;

//       if (!courseWorkReclaimedReturned) {
//         continue;
//       }

//       handedIn.push(...courseWorkReclaimedReturned);
//     }

//     return handedIn;
//   }

//   async courseWorksOverDue() {
//     let handedIn: classroom_v1.Schema$StudentSubmission[] = [];

//     for (let i = 0; i < this.courseIds.length; i++) {
//       const courseId = this.courseIds[i];

//       const courseWorkOverdue = (
//         await this.classroom.courses.courseWork.studentSubmissions.list({
//           courseId: courseId,
//           courseWorkId: "-",
//           late: "LATE_ONLY",
//           states: ["CREATED"],
//         })
//       ).data.studentSubmissions;

//       if (!courseWorkOverdue) {
//         continue;
//       }

//       handedIn.push(...courseWorkOverdue);
//     }

//     return handedIn;
//   }
// }
