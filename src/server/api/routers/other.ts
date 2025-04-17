import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const otherRouter = createTRPCRouter({
  save: publicProcedure
    .input(
      z.object({
        resume: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.db.data.findFirst();

      if (exist) {
        await ctx.db.data.update({
          where: {
            id: exist.id,
          },
          data: {
            resume: input.resume,
            password: input.password,
          },
        });

        return { result: "Saved" };
      }

      const data = await ctx.db.data.create({
        data: {
          resume: input.resume,
          password: input.password,
        },
      });

      return data ? { result: "Saved" } : { result: "Failed" };
    }),

  find: publicProcedure.query(({ ctx }) => {
    return ctx.db.data.findFirst();
  }),
});
