import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
//import cloudinary from "@/server/cloudinary";

export const projectRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        name: z.string().toLowerCase(),
        category: z.string(),
        url: z.string(),
        img: z.string().optional(),
        description: z.string(),
        tools: z.array(z.string().toLowerCase()),
        type: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const title = await ctx.db.project.create({
        data: {
          name: input.name,
          category: input.category,
          url: input.url,
          img: input.img,
          description: input.description,
          tools: input.tools,
          type: input.type,
        },
      });

      return title ? { result: "Added" } : { result: "Failed" };
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().toLowerCase(),
        category: z.string(),
        url: z.string(),
        img: z.string().optional(),
        description: z.string(),
        tools: z.array(z.string().toLowerCase()),
        type: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          category: input.category,
          url: input.url,
          img: input.img,
          description: input.description,
          tools: input.tools,
          type: input.type,
        },
      });

      return project ? { result: "Updated" } : { result: "Failed" };
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const project = await ctx.db.project.delete({
      where: {
        id: input,
      },
    });

    return project ? { result: "Deleted" } : { result: "Failed" };
  }),

  deleteCover: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        const deleteCover = await ctx.db.project.update({
          where: { id: input },
          data: { img: "" },
        });
        return deleteCover && { result: "Deleted Cover" };
      } catch (error) {
        console.error("Error deleting image:", error);
        return { result: "An error occurred while deleting the image" };
      }
    }),

  list: publicProcedure
    .input(
      z.object({
        titled: z.string().optional(),
        featured: z.boolean(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input && !input.featured) {
        return ctx.db.project.findMany({
          where: {
            category: input.titled,
          },
          orderBy: { id: "desc" },
        });
      }
      else if (input?.featured) {
        return ctx.db.project.findMany({
          where: {
            category: input.titled,
            type: "highlight",
          },
          orderBy: { id: "desc" },
        });
      }
      return ctx.db.project.findMany({ orderBy: { id: "desc" } });
    }),
});
