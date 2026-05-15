import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '@/lib/trpc/server';
import { db } from '@/lib/db';
import { reviews } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export const reviewsRouter = router({
  list: publicProcedure
    .input(z.object({
      propertyId: z.string().uuid().optional(),
      vehicleId:  z.string().uuid().optional(),
      published:  z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const filters = [eq(reviews.agencyId, agencyId)];
      if (input?.propertyId) filters.push(eq(reviews.propertyId, input.propertyId));
      if (input?.vehicleId)  filters.push(eq(reviews.vehicleId,  input.vehicleId));
      if (input?.published !== undefined) filters.push(eq(reviews.published, input.published));
      return db.select().from(reviews).where(and(...filters));
    }),

  create: publicProcedure
    .input(z.object({
      propertyId: z.string().uuid().optional(),
      vehicleId:  z.string().uuid().optional(),
      author:     z.string().min(1),
      rating:     z.number().int().min(1).max(5),
      content:    z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const [created] = await db.insert(reviews).values({ ...input, agencyId }).returning();
      return created;
    }),

  publish: adminProcedure
    .input(z.object({ id: z.string().uuid(), published: z.boolean() }))
    .mutation(async ({ input }) => {
      const [updated] = await db
        .update(reviews).set({ published: input.published })
        .where(eq(reviews.id, input.id)).returning();
      return updated;
    }),
});
