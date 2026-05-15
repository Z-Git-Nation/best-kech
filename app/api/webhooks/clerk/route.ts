import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const body = await req.json();
  const { type, data } = body;

  if (type === 'user.created' || type === 'user.updated') {
    const { id: clerkId, email_addresses, first_name, last_name, image_url } = data;
    const email    = email_addresses?.[0]?.email_address ?? '';
    const fullName = `${first_name ?? ''} ${last_name ?? ''}`.trim() || null;
    const agencyId = process.env.AGENCY_ID ?? null;

    await db
      .insert(users)
      .values({ clerkId, email, fullName, avatarUrl: image_url, agencyId })
      .onConflictDoUpdate({ target: users.clerkId, set: { email, fullName, avatarUrl: image_url } });
  }

  if (type === 'user.deleted') {
    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  return NextResponse.json({ ok: true });
}
