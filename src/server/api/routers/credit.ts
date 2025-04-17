import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const creditRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        inspiration: z.string().toLowerCase(),
        url: z.string(),
        credit: z.string().toLowerCase(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.db.credit.findFirst({
        where: {
          inspiration: input.inspiration,
          credit: input.credit,
          url: input.url,
        },
      });

      if (exist) {
        return { result: "Credit Exists" };
      }

      const credit = await ctx.db.credit.create({
        data: {
          inspiration: input.inspiration,
          url: input.url,
          credit: input.credit,
        },
      });

      return credit ? { result: "Added" } : { result: "Failed" };
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        inspiration: z.string().toLowerCase(),
        url: z.string(),
        credit: z.string().toLowerCase(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const credit = await ctx.db.credit.update({
        where: {
          id: input.id,
        },
        data: {
          inspiration: input.inspiration,
          url: input.url,
          credit: input.credit,
        },
      });

      return credit ? { result: "Updated" } : { result: "Failed" };
    }),

  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const credit = await ctx.db.credit.delete({
        where: {
          id: input,
        },
      });

      return credit ? { result: "Deleted" } : { result: "Failed" };
    }),

  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.credit.findMany();
  }),
});
