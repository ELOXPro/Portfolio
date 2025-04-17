import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const contactRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        type: z.string(),
        url: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.db.contact.findFirst({
        where: {
          title: input.title,
          type: input.type,
          url: input.url,
        },
      });

      if (exist) {
        return { result: "Contact Exists" };
      }

      const contact = await ctx.db.contact.create({
        data: {
          title: input.title,
          type: input.type,
          url: input.url,
        },
      });

      return contact ? { result: "Added" } : { result: "Failed" };
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        type: z.string(),
        url: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.db.contact.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          type: input.type,
          url: input.url,
        },
      });

      return contact ? { result: "Updated" } : { result: "Failed" };
    }),

  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.db.contact.delete({
        where: {
          id: input,
        },
      });

      return contact ? { result: "Deleted" } : { result: "Failed" };
    }),

  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.contact.findMany();
  }),
});
