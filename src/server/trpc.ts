import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const procedure = t.procedure;

export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      cause: "MAYBE TRY GETTING A FUCKING SESSION",
      message: "Bro you are NOT authorized",
    });
  }
  return next({
    ctx: {
      user: {
        id: (ctx.session.user as any).id,
        sessionToken: (ctx.session.user as any).id,
      },
    },
  });
});
