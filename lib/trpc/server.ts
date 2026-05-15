import { initTRPC, TRPCError } from '@trpc/server';
import { getSessionUser } from '@/lib/auth/session';
import { ZodError } from 'zod';

export async function createTRPCContext() {
  const user = await getSessionUser();
  return { user };
}

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router            = t.router;
export const publicProcedure   = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user)         throw new TRPCError({ code: 'UNAUTHORIZED' });
  if (!ctx.user.isAdmin) throw new TRPCError({ code: 'FORBIDDEN' });
  return next({ ctx: { ...ctx, user: ctx.user } });
});
