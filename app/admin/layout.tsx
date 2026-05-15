import { requireAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin();
  } catch {
    redirect('/sign-in');
  }
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--cream)' }}>
      <aside style={{
        width: 240,
        background: 'var(--brown-deep)',
        color: 'var(--cream)',
        padding: '2rem 1rem',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>
          Best Kech Immo
        </p>
        {[
          { href: '/admin',             label: 'Tableau de bord' },
          { href: '/admin/properties',  label: 'Villas / Apparts' },
          { href: '/admin/vehicles',    label: 'Voitures' },
          { href: '/admin/realestate',  label: 'Immobilier' },
          { href: '/admin/bookings',    label: 'Réservations' },
          { href: '/admin/posts',       label: 'Blog' },
          { href: '/admin/contacts',    label: 'Contacts' },
        ].map(({ href, label }) => (
          <a key={href} href={href} style={{
            display: 'block',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            color: 'var(--cream)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'background 0.2s',
          }}>
            {label}
          </a>
        ))}
      </aside>
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
