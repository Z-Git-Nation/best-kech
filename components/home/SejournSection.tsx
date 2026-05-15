'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const VillaObject3D = dynamic(() => import('./3d/VillaObject3D'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const MOCK_PROPERTIES = [
  { id: '1', name: 'Villa Alya',       type: 'villa',     price: 350, capacity: 8,  bedrooms: 4, area: 350 },
  { id: '2', name: 'Riad Nour',        type: 'apartment', price: 220, capacity: 6,  bedrooms: 3, area: 180 },
  { id: '3', name: 'Appartement Menara', type: 'apartment', price: 95, capacity: 4, bedrooms: 2, area: 90  },
  { id: '4', name: 'Villa Oasis',      type: 'villa',     price: 520, capacity: 10, bedrooms: 5, area: 480 },
  { id: '5', name: 'Studio Gueliz',    type: 'apartment', price: 65,  capacity: 2,  bedrooms: 1, area: 45  },
  { id: '6', name: 'Riad Jasmine',     type: 'apartment', price: 180, capacity: 6,  bedrooms: 3, area: 160 },
];

export default function SejournSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start:   'top 88%',
              end:     'bottom 20%',
              toggleActions: 'play none none reverse',
            },
            delay: (i % 3) * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sejour"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '3rem', maxWidth: 1400, margin: '0 auto 3rem' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.6rem' }}>
          Villas &amp; Appartements
        </p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--brown-deep)', fontWeight: 400 }}>
          Votre séjour à Marrakech
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--text-mid)', marginTop: '0.75rem', maxWidth: 520 }}>
          30+ biens sélectionnés — villas prestige, riads authentiques, appartements modernes. À partir de 50€/nuit.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {MOCK_PROPERTIES.map((p, i) => (
          <div
            key={p.id}
            ref={el => { if (el) cardsRef.current[i] = el; }}
            style={{
              background:   'var(--cream-warm)',
              borderRadius: 16,
              overflow:     'hidden',
              border:       '1px solid rgba(196,113,74,.12)',
              transition:   'box-shadow .3s, transform .3s',
              cursor:       'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(196,113,74,.18)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* 3D preview */}
            <div style={{ height: 200, background: 'linear-gradient(135deg, #2C1810 0%, #C4714A 100%)' }}>
              <VillaObject3D />
            </div>

            {/* Info */}
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.3rem' }}>
                    {p.type === 'villa' ? 'Villa' : 'Appartement'}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: 'var(--brown-deep)', fontWeight: 500 }}>
                    {p.name}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: 'var(--terracotta)', fontWeight: 500, lineHeight: 1 }}>
                    {p.price}€
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', color: 'var(--text-light)' }}>/nuit</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', marginBottom: '1rem' }}>
                {[
                  { icon: '👥', val: `${p.capacity} pers.` },
                  { icon: '🛏', val: `${p.bedrooms} ch.` },
                  { icon: '📐', val: `${p.area} m²` },
                ].map(({ icon, val }) => (
                  <span key={val} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--text-mid)' }}>
                    {icon} {val}
                  </span>
                ))}
              </div>

              <a
                href={`/sejour/${p.id}`}
                style={{
                  display:     'block',
                  textAlign:   'center',
                  padding:     '0.65rem',
                  background:  'transparent',
                  border:      '1.5px solid var(--terracotta)',
                  borderRadius: 10,
                  color:       'var(--terracotta)',
                  fontFamily:  'var(--font-inter)',
                  fontSize:    '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition:  'all .25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--terracotta)';
                  e.currentTarget.style.color = 'var(--cream)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--terracotta)';
                }}
              >
                Voir le bien
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
