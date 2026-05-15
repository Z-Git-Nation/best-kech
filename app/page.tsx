export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'var(--terracotta)', textAlign: 'center' }}>
        Best Kech Immo
      </h1>
      <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-mid)', fontSize: '1.1rem', textAlign: 'center' }}>
        Villas · Séjours · Voitures · Immobilier — Marrakech
      </p>
      <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-light)', fontSize: '0.85rem' }}>
        En construction — port 3035
      </p>
    </div>
  );
}
