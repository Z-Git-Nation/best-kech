'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const TEMOIGNAGES = [
  { id: 1, author: 'Sophie M.',   origin: 'Paris',      text: 'Un séjour inoubliable. La villa était exactement comme sur les photos, et l\'équipe a été aux petits soins.', rating: 5, type: 'séjour', bien: 'Villa Alya' },
  { id: 2, author: 'Thomas R.',   origin: 'Lyon',       text: 'La voiture était parfaite pour explorer les environs. Livraison à l\'hôtel, impeccable !', rating: 5, type: 'voiture', bien: 'BMW X5' },
  { id: 3, author: 'Amina K.',    origin: 'Bruxelles',  text: 'Notre riad était absolument magnifique. Service conciergerie au top, merci !', rating: 5, type: 'séjour', bien: 'Riad Nour' },
  { id: 4, author: 'Pierre L.',   origin: 'Bordeaux',   text: 'Rachid nous a accompagnés pour l\'achat de notre appartement. Professionnel et disponible.', rating: 5, type: 'immo', bien: 'Achat appartement' },
  { id: 5, author: 'Léa B.',      origin: 'Genève',     text: 'Marrakech sous son meilleur jour ! La villa avait tout ce qu\'il fallait pour un séjour parfait.', rating: 5, type: 'séjour', bien: 'Villa Oasis' },
  { id: 6, author: 'Karim S.',    origin: 'Amsterdam',  text: 'Rénovation de notre riad gérée avec sérieux et dans les délais. Je recommande vivement.', rating: 5, type: 'immo', bien: 'Rénovation riad' },
  { id: 7, author: 'Julie D.',    origin: 'Toulouse',   text: 'Le Range Rover était en parfait état, propre et livré à temps. Prix correct pour la qualité.', rating: 5, type: 'voiture', bien: 'Range Rover Sport' },
];

const TYPE_COLORS: Record<string, string> = {
  séjour:  '#C4714A',
  voiture: '#D4A853',
  immo:    '#5C3828',
};

export default function TemoignagesSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Infinite horizontal scroll via GSAP
    const totalWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
    });
    return () => { tween.kill(); };
  }, []);

  const doubled = [...TEMOIGNAGES, ...TEMOIGNAGES];

  return (
    <section
      id="temoignages"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '0 clamp(1.5rem, 5vw, 5rem)', marginBottom: '2.5rem', maxWidth: 1400, margin: '0 auto 2.5rem' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.6rem' }}>
          Avis clients
        </p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--brown-deep)', fontWeight: 400 }}>
          Ils nous font confiance
        </h2>
      </div>

      {/* Infinite carousel */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: '1.25rem', width: 'max-content', paddingLeft: '2rem' }}
        >
          {doubled.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              style={{
                flexShrink:   0,
                width:        260,
                background:   'var(--cream-warm)',
                borderRadius: 16,
                padding:      '1.4rem',
                border:       `1.5px solid ${TYPE_COLORS[t.type]}22`,
              }}
            >
              {/* Type badge */}
              <span style={{
                display:       'inline-block',
                padding:       '0.2rem 0.7rem',
                background:    `${TYPE_COLORS[t.type]}18`,
                color:         TYPE_COLORS[t.type],
                borderRadius:  20,
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.62rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom:  '0.85rem',
              }}>
                {t.type}
              </span>

              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.83rem', color: 'var(--text-dark)', lineHeight: 1.6, marginBottom: '1rem' }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div style={{ borderTop: '1px solid rgba(196,113,74,.1)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--brown-deep)' }}>
                    {t.author}
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', color: 'var(--text-light)' }}>
                    {t.origin} · {t.bien}
                  </p>
                </div>
                <span style={{ color: TYPE_COLORS[t.type], fontSize: '0.8rem' }}>
                  {'★'.repeat(t.rating)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
