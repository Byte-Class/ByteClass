import { router } from "./trpc";
import { calendar } from "./routers/calendar";
import { events } from "./routers/event";
import { tasks } from "./routers/tasks";
import { courses } from "./routers/pinned";

export const appRouter = router({ calendar, events, tasks, courses });

export type AppRouter = typeof appRouter;
