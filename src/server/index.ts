import { router } from "./trpc";
import { calendar } from "./routers/calendar";
import { events } from "./routers/event";
import { tasks } from "./routers/tasks";
import { pinned } from "./routers/pinned";
import { courses } from "./routers/courses";
import { stats } from "./routers/stats";

export const appRouter = router({
  calendar,
  events,
  tasks,
  pinned,
  courses,
  stats,
});

export type AppRouter = typeof appRouter;
