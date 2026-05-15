import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '@/lib/trpc/server';
import { db } from '@/lib/db';
import { contactRequests } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export const contactsRouter = router({
  list: adminProcedure
    .input(z.object({ status: z.string().optional(), type: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const filters = [eq(contactRequests.agencyId, agencyId)];
      if (input?.status) filters.push(eq(contactRequests.status, input.status));
      if (input?.type)   filters.push(eq(contactRequests.type, input.type));
      return db.select().from(contactRequests)
        .where(and(...filters))
        .orderBy(desc(contactRequests.createdAt));
    }),

  create: publicProcedure
    .input(z.object({
      type:       z.enum(['sejour', 'voiture', 'immo']),
      name:       z.string().min(1),
      email:      z.string().email().optional(),
      phone:      z.string().optional(),
      message:    z.string().optional(),
      propertyId: z.string().uuid().optional(),
      checkIn:    z.string().optional(),
      checkOut:   z.string().optional(),
      guestCount: z.number().int().optional(),
      budget:     z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const [created] = await db.insert(contactRequests).values({
        ...input,
        agencyId,
        checkIn:  input.checkIn  ? new Date(input.checkIn)  : undefined,
        checkOut: input.checkOut ? new Date(input.checkOut) : undefined,
      }).returning();
      return created;
    }),

  updateStatus: adminProcedure
    .input(z.object({
      id:     z.string().uuid(),
      status: z.enum(['new', 'contacted', 'archived']),
    }))
    .mutation(async ({ input }) => {
      const [updated] = await db
        .update(contactRequests).set({ status: input.status })
        .where(eq(contactRequests.id, input.id)).returning();
      return updated;
    }),
});
