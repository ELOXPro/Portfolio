import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const titleRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.string().toLowerCase())
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.db.title.findFirst({
        where: { name: input}
      })
      
      if (exist) {
        return {result: "Title Exists"}
      }

      const title = await ctx.db.title.create({
        data: {
          name: input,
        },
      });

      return title ? { result: "Added" } : { result: "Failed" };
    }),

  edit: publicProcedure
    .input(z.object({ id: z.string(), name: z.string().toLowerCase()}))
    .mutation(async ({ ctx, input }) => {
      const title = await ctx.db.title.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });

      return title ? { result: "Updated" } : { result: "Failed" };
    }),

  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const title = await ctx.db.title.delete({
        where: {
          id: input,
        },
      });

      const project = await ctx.db.project.deleteMany({
        where: {
          category: input,
        },
      });

      return project && title ? { result: "Deleted" } : { result: "Failed" };
    }),

  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.title.findMany();
  }),
});
