'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CarObject3D = dynamic(() => import('./3d/CarObject3D'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const MOCK_VEHICLES = [
  { id: '1', brand: 'Mercedes',  model: 'GLE',      year: 2023, pricePerDay: 180, seats: 5, transmission: 'automatic' },
  { id: '2', brand: 'BMW',       model: 'X5',       year: 2022, pricePerDay: 160, seats: 5, transmission: 'automatic' },
  { id: '3', brand: 'Range Rover', model: 'Sport',  year: 2023, pricePerDay: 220, seats: 5, transmission: 'automatic' },
  { id: '4', brand: 'Toyota',    model: 'Land Cruiser', year: 2022, pricePerDay: 140, seats: 7, transmission: 'automatic' },
];

export default function VoituresSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="voitures"
      style={{
        background: 'var(--brown-deep)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '3rem', maxWidth: 1400, margin: '0 auto 3rem' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.6rem' }}>
          Location de véhicules
        </p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--cream)', fontWeight: 400 }}>
          Explorez Marrakech en style
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'rgba(250,247,242,.6)', marginTop: '0.75rem', maxWidth: 480 }}>
          Flotte premium avec chauffeur ou sans. Livraison à l&apos;aéroport ou à votre hébergement.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.25rem',
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {MOCK_VEHICLES.map((v, i) => (
          <div
            key={v.id}
            ref={el => { if (el) cardsRef.current[i] = el; }}
            style={{
              background:   'rgba(250,247,242,.06)',
              borderRadius: 16,
              overflow:     'hidden',
              border:       '1px solid rgba(212,168,83,.15)',
              transition:   'border-color .3s, box-shadow .3s, transform .3s',
              cursor:       'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(212,168,83,.5)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,168,83,.12)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(212,168,83,.15)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* 3D car */}
            <div style={{ height: 180, background: 'linear-gradient(135deg, rgba(44,24,16,.8), rgba(92,56,40,.6))' }}>
              <CarObject3D />
            </div>

            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.25rem' }}>
                    {v.brand}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', color: 'var(--cream)', fontWeight: 500 }}>
                    {v.model} {v.year}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: 'var(--gold)', lineHeight: 1 }}>
                    {v.pricePerDay}€
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', color: 'rgba(250,247,242,.45)' }}>/jour</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', color: 'rgba(250,247,242,.55)' }}>
                  🪑 {v.seats} places
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', color: 'rgba(250,247,242,.55)' }}>
                  ⚙️ Automatique
                </span>
              </div>

              <a
                href={`https://wa.me/212664785714?text=Bonjour, je souhaite réserver le ${v.brand} ${v.model}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:       'block',
                  textAlign:     'center',
                  padding:       '0.65rem',
                  background:    'transparent',
                  border:        '1.5px solid rgba(212,168,83,.5)',
                  borderRadius:  10,
                  color:         'var(--gold)',
                  fontFamily:    'var(--font-inter)',
                  fontSize:      '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition:    'all .25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--gold)';
                  e.currentTarget.style.color = 'var(--brown-deep)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--gold)';
                }}
              >
                Réserver sur WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
