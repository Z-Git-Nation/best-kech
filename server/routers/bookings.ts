import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '@/lib/trpc/server';
import { db } from '@/lib/db';
import { bookings } from '@/lib/db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

export const bookingsRouter = router({
  byProperty: adminProcedure
    .input(z.object({
      propertyId: z.string().uuid(),
      from:       z.string().optional(),
      to:         z.string().optional(),
    }))
    .query(async ({ input }) => {
      const filters = [eq(bookings.propertyId, input.propertyId)];
      if (input.from) filters.push(gte(bookings.checkIn, new Date(input.from)));
      if (input.to)   filters.push(lte(bookings.checkOut, new Date(input.to)));
      return db.select().from(bookings).where(and(...filters));
    }),

  all: adminProcedure
    .input(z.object({ status: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const filters = [eq(bookings.agencyId, agencyId)];
      if (input?.status) filters.push(eq(bookings.status, input.status));
      return db.select().from(bookings).where(and(...filters));
    }),

  create: publicProcedure
    .input(z.object({
      propertyId:  z.string().uuid().optional(),
      vehicleId:   z.string().uuid().optional(),
      checkIn:     z.string(),
      checkOut:    z.string(),
      guestName:   z.string().min(1),
      guestEmail:  z.string().email().optional(),
      guestPhone:  z.string().optional(),
      guestCount:  z.number().int().optional(),
      source:      z.enum(['direct', 'airbnb', 'booking', 'sarouty']).optional(),
      totalAmount: z.string().optional(),
      notes:       z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const [created] = await db.insert(bookings).values({
        ...input,
        agencyId,
        checkIn:  new Date(input.checkIn),
        checkOut: new Date(input.checkOut),
      }).returning();
      return created;
    }),

  updateStatus: adminProcedure
    .input(z.object({
      id:     z.string().uuid(),
      status: z.enum(['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled']),
    }))
    .mutation(async ({ input }) => {
      const [updated] = await db
        .update(bookings).set({ status: input.status, updatedAt: new Date() })
        .where(eq(bookings.id, input.id)).returning();
      return updated;
    }),
});
