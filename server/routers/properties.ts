import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '@/lib/trpc/server';
import { db } from '@/lib/db';
import { properties } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export const propertiesRouter = router({
  list: publicProcedure
    .input(z.object({
      agencyId: z.string().uuid().optional(),
      active:   z.boolean().optional(),
      type:     z.enum(['villa', 'apartment']).optional(),
    }).optional())
    .query(async ({ input }) => {
      const agencyId = input?.agencyId ?? process.env.AGENCY_ID!;
      const filters = [eq(properties.agencyId, agencyId)];
      if (input?.active !== undefined) filters.push(eq(properties.active, input.active));
      if (input?.type) filters.push(eq(properties.type, input.type));
      return db.select().from(properties).where(and(...filters));
    }),

  bySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const [property] = await db.select().from(properties).where(eq(properties.slug, input)).limit(1);
      return property ?? null;
    }),

  featured: publicProcedure
    .input(z.enum(['week', 'month']))
    .query(async ({ input }) => {
      const agencyId = process.env.AGENCY_ID!;
      const [property] = await db
        .select().from(properties)
        .where(and(eq(properties.agencyId, agencyId), eq(properties.featuredType, input)))
        .limit(1);
      return property ?? null;
    }),

  create: adminProcedure
    .input(z.object({
      type:          z.enum(['villa', 'apartment']),
      name:          z.string().min(1),
      slug:          z.string().min(1),
      description:   z.string().optional(),
      pricePerNight: z.string().optional(),
      capacity:      z.number().int().optional(),
      bedrooms:      z.number().int().optional(),
      bathrooms:     z.number().int().optional(),
      area:          z.string().optional(),
      address:       z.string().optional(),
      glbUrl:        z.string().optional(),
      photos:        z.array(z.string()).optional(),
      services:      z.array(z.string()).optional(),
      featuredType:  z.enum(['week', 'month']).nullable().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const agencyId = ctx.user.agencyId ?? process.env.AGENCY_ID!;
      const [created] = await db.insert(properties).values({ ...input, agencyId }).returning();
      return created;
    }),

  update: adminProcedure
    .input(z.object({
      id:            z.string().uuid(),
      type:          z.enum(['villa', 'apartment']).optional(),
      name:          z.string().optional(),
      description:   z.string().optional(),
      pricePerNight: z.string().optional(),
      capacity:      z.number().int().optional(),
      bedrooms:      z.number().int().optional(),
      bathrooms:     z.number().int().optional(),
      area:          z.string().optional(),
      address:       z.string().optional(),
      glbUrl:        z.string().optional(),
      photos:        z.array(z.string()).optional(),
      services:      z.array(z.string()).optional(),
      active:        z.boolean().optional(),
      featuredType:  z.enum(['week', 'month']).nullable().optional(),
    }))
    .mutation(async ({ input: { id, ...data } }) => {
      const [updated] = await db
        .update(properties).set({ ...data, updatedAt: new Date() })
        .where(eq(properties.id, id)).returning();
      return updated;
    }),

  delete: adminProcedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      await db.update(properties).set({ active: false }).where(eq(properties.id, input));
    }),
});
