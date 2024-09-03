import { router } from "./trpc";
import { calendar } from "./routers/calendar";
import { events } from "./routers/event";
import { tasks } from "./routers/tasks";

export const appRouter = router({ calendar, events, tasks });

export type AppRouter = typeof appRouter;
