import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '@/lib/trpc/server';
import { db } from '@/lib/db';
import { vehicles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export const vehiclesRouter = router({
  list: publicProcedure
    .input(z.object({ active: z.boolean().optional() }).optional())
    .query(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const filters = [eq(vehicles.agencyId, agencyId)];
      if (input?.active !== undefined) filters.push(eq(vehicles.active, input.active));
      return db.select().from(vehicles).where(and(...filters));
    }),

  create: adminProcedure
    .input(z.object({
      brand:        z.string().min(1),
      model:        z.string().min(1),
      year:         z.number().int().optional(),
      pricePerDay:  z.string().optional(),
      seats:        z.number().int().optional(),
      transmission: z.enum(['manual', 'automatic']).optional(),
      glbUrl:       z.string().optional(),
      photoUrl:     z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const agencyId = ctx.user.agencyId ?? process.env.AGENCY_ID!;
      const [created] = await db.insert(vehicles).values({ ...input, agencyId }).returning();
      return created;
    }),

  update: adminProcedure
    .input(z.object({
      id:           z.string().uuid(),
      brand:        z.string().optional(),
      model:        z.string().optional(),
      year:         z.number().int().optional(),
      pricePerDay:  z.string().optional(),
      seats:        z.number().int().optional(),
      transmission: z.enum(['manual', 'automatic']).optional(),
      glbUrl:       z.string().optional(),
      photoUrl:     z.string().optional(),
      active:       z.boolean().optional(),
    }))
    .mutation(async ({ input: { id, ...data } }) => {
      const [updated] = await db
        .update(vehicles).set({ ...data, updatedAt: new Date() })
        .where(eq(vehicles.id, id)).returning();
      return updated;
    }),

  delete: adminProcedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      await db.update(vehicles).set({ active: false }).where(eq(vehicles.id, input));
    }),
});
