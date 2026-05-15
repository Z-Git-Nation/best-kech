export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: 'var(--terracotta)', marginBottom: '2rem' }}>
        Tableau de bord
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Villas / Apparts', href: '/admin/properties', color: '#C4714A' },
          { label: 'Voitures',         href: '/admin/vehicles',   color: '#D4A853' },
          { label: 'Immobilier',       href: '/admin/realestate', color: '#5C3828' },
          { label: 'Réservations',     href: '/admin/bookings',   color: '#2C1810' },
          { label: 'Blog',             href: '/admin/posts',      color: '#9E5535' },
          { label: 'Contacts',         href: '/admin/contacts',   color: '#7A4A35' },
        ].map(({ label, href, color }) => (
          <a key={href} href={href} style={{
            display: 'block',
            padding: '1.5rem',
            background: color,
            color: '#FAF7F2',
            borderRadius: '12px',
            textDecoration: 'none',
            fontFamily: 'var(--font-cormorant)',
            fontSize: '1.15rem',
            transition: 'opacity 0.2s',
          }}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
