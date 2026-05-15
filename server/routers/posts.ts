import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '@/lib/trpc/server';
import { db } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export const postsRouter = router({
  list: publicProcedure
    .input(z.object({ published: z.boolean().optional(), limit: z.number().int().optional() }).optional())
    .query(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const filters = [eq(blogPosts.agencyId, agencyId)];
      if (input?.published !== undefined) filters.push(eq(blogPosts.published, input.published));
      const query = db.select().from(blogPosts).where(and(...filters)).orderBy(desc(blogPosts.publishedAt));
      if (input?.limit) return query.limit(input.limit);
      return query;
    }),

  bySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, input)).limit(1);
      return post ?? null;
    }),

  create: adminProcedure
    .input(z.object({
      slug:        z.string().min(1),
      title:       z.string().min(1),
      excerpt:     z.string().optional(),
      content:     z.string().optional(),
      imageUrl:    z.string().optional(),
      tags:        z.array(z.string()).optional(),
      published:   z.boolean().optional(),
      publishedAt: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const agencyId = ctx.user.agencyId ?? process.env.AGENCY_ID!;
      const [created] = await db.insert(blogPosts).values({
        ...input,
        agencyId,
        publishedAt: input.publishedAt ? new Date(input.publishedAt) : undefined,
      }).returning();
      return created;
    }),

  update: adminProcedure
    .input(z.object({
      id:          z.string().uuid(),
      title:       z.string().optional(),
      excerpt:     z.string().optional(),
      content:     z.string().optional(),
      imageUrl:    z.string().optional(),
      tags:        z.array(z.string()).optional(),
      published:   z.boolean().optional(),
      publishedAt: z.string().optional(),
    }))
    .mutation(async ({ input: { id, publishedAt, ...data } }) => {
      const [updated] = await db.update(blogPosts).set({
        ...data,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        updatedAt: new Date(),
      }).where(eq(blogPosts.id, id)).returning();
      return updated;
    }),

  delete: adminProcedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      await db.delete(blogPosts).where(eq(blogPosts.id, input));
    }),
});
