import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export type SessionUser = typeof users.$inferSelect;

export async function getSessionUser(): Promise<SessionUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const [existing] = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1);
  if (existing) return existing;

  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);
    const email    = clerkUser.emailAddresses[0]?.emailAddress ?? '';
    const fullName = `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || null;
    const avatarUrl = clerkUser.imageUrl || null;

    const [adminCheck] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.isAdmin, true))
      .limit(1);
    const isFirstAdmin = !adminCheck;

    const agencyId = process.env.AGENCY_ID ?? null;

    const [newUser] = await db
      .insert(users)
      .values({ clerkId: userId, email, fullName, avatarUrl, isAdmin: isFirstAdmin, agencyId })
      .onConflictDoUpdate({ target: users.clerkId, set: { email, fullName, avatarUrl } })
      .returning();

    return newUser ?? null;
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error('UNAUTHORIZED');
  if (!user.isAdmin) throw new Error('FORBIDDEN');
  return user;
}
