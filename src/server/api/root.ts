import { titleRouter } from "@/server/api/routers/title";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "./routers/project";
import { contactRouter } from "./routers/contact";
import { creditRouter } from "./routers/credit";
import { otherRouter } from "./routers/other";

export const appRouter = createTRPCRouter({
  title: titleRouter,
  project: projectRouter,
  contact: contactRouter,
  credit: creditRouter,
  other: otherRouter
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
