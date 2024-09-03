import { router } from "./trpc";
import { calendar } from "./routers/calendar";
import { events } from "./routers/event";

export const appRouter = router({ calendar, events });

export type AppRouter = typeof appRouter;
