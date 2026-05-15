import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '@/lib/trpc/server';
import { db } from '@/lib/db';
import { realEstateItems } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export const realestateRouter = router({
  list: publicProcedure
    .input(z.object({ type: z.enum(['sale', 'construction', 'renovation']).optional() }).optional())
    .query(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const filters = [eq(realEstateItems.agencyId, agencyId)];
      if (input?.type) filters.push(eq(realEstateItems.type, input.type));
      return db.select().from(realEstateItems).where(and(...filters));
    }),

  create: adminProcedure
    .input(z.object({
      type:        z.enum(['sale', 'construction', 'renovation']),
      title:       z.string().min(1),
      description: z.string().optional(),
      price:       z.string().optional(),
      surface:     z.string().optional(),
      location:    z.string().optional(),
      photos:      z.array(z.string()).optional(),
      status:      z.enum(['available', 'in_progress', 'sold', 'delivered']).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const agencyId = ctx.user.agencyId ?? process.env.AGENCY_ID!;
      const [created] = await db.insert(realEstateItems).values({ ...input, agencyId }).returning();
      return created;
    }),

  update: adminProcedure
    .input(z.object({
      id:          z.string().uuid(),
      title:       z.string().optional(),
      description: z.string().optional(),
      price:       z.string().optional(),
      surface:     z.string().optional(),
      location:    z.string().optional(),
      photos:      z.array(z.string()).optional(),
      status:      z.enum(['available', 'in_progress', 'sold', 'delivered']).optional(),
    }))
    .mutation(async ({ input: { id, ...data } }) => {
      const [updated] = await db
        .update(realEstateItems).set({ ...data, updatedAt: new Date() })
        .where(eq(realEstateItems.id, id)).returning();
      return updated;
    }),

  delete: adminProcedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      await db.delete(realEstateItems).where(eq(realEstateItems.id, input));
    }),
});
