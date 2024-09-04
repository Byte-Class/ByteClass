import { auth } from "auth";

import { db } from "@/drizzle/db";
import { pinnedCourses } from "@/drizzle/schema";

import { ToggleGroup } from "@/components/ui/toggle-group";
import { and, eq } from "drizzle-orm";
import PinnedCoursesItem from "./pinned-item";

export default async function PinnedCourses() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return;
  }

  const pinned = await db
    .select()
    .from(pinnedCourses)
    .where(
      and(
        eq(pinnedCourses.userId, session.user.id),
        eq(pinnedCourses.isPinned, true),
      ),
    );

  return (
    <ToggleGroup type="multiple">
      {pinned.map((pin) => {
        return <PinnedCoursesItem key={crypto.randomUUID()} course={pin} />;
      })}
    </ToggleGroup>
  );
}
