import { router } from "./trpc";
import { calendar } from "./routers/calendar";

export const appRouter = router({ calendar });

export type AppRouter = typeof appRouter;
