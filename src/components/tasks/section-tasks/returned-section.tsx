"use client";

import { classroom_v1 } from "googleapis";
import Image from "next/image";

import { trpc } from "@/server/client";

import Line from "@/components/line";

export default function ReturnedSection() {
  const queryActiveCourses = trpc.courses.activeCourses.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const activeCourses = queryActiveCourses.data?.map(
    (course) => course.courseId,
  );

  const { data, isPending } = trpc.courses.returnedReturnedWorks.useQuery(
    {
      courseIds: activeCourses as string[],
    },
    {
      enabled: !!activeCourses,
      refetchOnWindowFocus: false,
    },
  );

  if (queryActiveCourses.isPending || isPending) {
    return <h2>Loading...</h2>;
  }

  if (!data) {
    return;
  }

  return (
    <div className="mb-12 mt-12">
      <div className="flex w-full justify-between">
        <h3 className="text-4xl font-bold">Returned & Reclaimed</h3>
        <h3 className="text-4xl font-bold">{data.length}</h3>
      </div>

      <Line className="mb-2 ml-0 mr-0 mt-2 w-full" />

      {data.map(async (item: classroom_v1.Schema$StudentSubmission) => {
        const courseId = item.courseId ?? "";
        const id = item.courseWorkId ?? "";

        return (
          <ShowSectionTask
            courseId={courseId}
            id={id}
            key={crypto.randomUUID()}
          />
        );
      })}
    </div>
  );
}

function ShowSectionTask({ courseId, id }: { courseId: string; id: string }) {
  const { data, isPending } = trpc.courses.fetchCourseWorkInfo.useQuery({
    courseId,
    id,
  });

  if (isPending) {
    return <h2>Loading...</h2>;
  }

  if (!data) {
    return;
  }

  // const badgesToDisplay = determineBadges({
  //   state: data.state,
  //   late: data?.late,
  //   dueDate: data.dueDate,
  // });

  return (
    // h-1 == height: 0.25rem, this is due to h-full not working. Here is stack overflow post https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height
    <div className="mb-3 mt-3 flex min-h-40 justify-between rounded-lg bg-lightBlack p-4">
      <div className="flex h-full w-11/12 flex-col justify-between gap-4">
        <div className="w-full">
          <h4 className="text-2xl font-bold">{data.title}</h4>
          <p className="text-neutral-400">{data.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={"/logos/classroom.svg"}
            alt="Google Classroom Image"
            width={50}
            height={50}
          />

          <a
            href={data.alternateLink!}
            target="_blank"
            className="text-white underline"
          >
            See In Google Classroom
          </a>
        </div>
      </div>

      <div className="flex h-full w-1/12 flex-col items-center justify-center gap-3">
        {/* {badgesToDisplay.map((badge) => (
          <Badge
            className={cn(badge.bgColour, badge.textColour)}
            key={crypto.randomUUID()}
          >
            {badge.badge}
          </Badge>
        ))} */}
      </div>
    </div>
  );
}
