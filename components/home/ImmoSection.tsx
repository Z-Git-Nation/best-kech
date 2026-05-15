'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    type: 'sale',
    icon: '🏡',
    title: 'Vente Immobilière',
    desc: 'Estimations précises, mandat de vente, accompagnement jusqu\'à la signature. Réseau d\'acquéreurs locaux et internationaux.',
    cta: 'Confier votre bien',
    accent: '#C4714A',
  },
  {
    type: 'construction',
    icon: '🏗️',
    title: 'Construction & Promotion',
    desc: 'Promotion immobilière, suivi de chantier, villas et résidences sur mesure. De l\'architecte à la livraison clés en main.',
    cta: 'Votre projet',
    accent: '#D4A853',
  },
  {
    type: 'renovation',
    icon: '🔨',
    title: 'Rénovation',
    desc: 'Réhabilitation de riads, modernisation de villas, coordination d\'artisans qualifiés. Valorisez votre patrimoine.',
    cta: 'Estimer les travaux',
    accent: '#5C3828',
  },
];

export default function ImmoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none reverse' },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="immo"
      style={{
        background: 'var(--cream-warm)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1400, margin: '0 auto 3.5rem' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.6rem' }}>
          Services Immobiliers
        </p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--brown-deep)', fontWeight: 400 }}>
          Investissez à Marrakech
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--text-mid)', marginTop: '0.75rem', maxWidth: 560 }}>
          Vente, construction neuve ou rénovation — notre équipe vous accompagne à chaque étape de votre projet immobilier.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: 1400,
        margin: '0 auto 3rem',
      }}>
        {SERVICES.map((s, i) => (
          <div
            key={s.type}
            ref={el => { if (el) cardsRef.current[i] = el; }}
            style={{
              background:   'var(--cream)',
              borderRadius: 20,
              padding:      '2rem',
              border:       `1.5px solid ${s.accent}22`,
              transition:   'box-shadow .3s, transform .3s',
              cursor:       'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 20px 56px ${s.accent}22`;
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '2.5rem', marginBottom: '1.25rem', display: 'block' }}>{s.icon}</span>
            <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: s.accent, marginBottom: '0.75rem', fontWeight: 500 }}>
              {s.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {s.desc}
            </p>
            <a
              href="/immobilier"
              style={{
                display:       'inline-block',
                padding:       '0.6rem 1.4rem',
                background:    s.accent,
                color:         'var(--cream)',
                borderRadius:  30,
                fontFamily:    'var(--font-inter)',
                fontSize:      '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight:    500,
                transition:    'opacity .25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {s.cta} →
            </a>
          </div>
        ))}
      </div>

      {/* Full CTA */}
      <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
        <a
          href="/immobilier"
          style={{
            display:       'inline-block',
            padding:       '0.9rem 2.5rem',
            background:    'transparent',
            border:        '1.5px solid var(--brown-deep)',
            borderRadius:  30,
            color:         'var(--brown-deep)',
            fontFamily:    'var(--font-inter)',
            fontSize:      '0.8rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition:    'all .3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--brown-deep)';
            e.currentTarget.style.color = 'var(--cream)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--brown-deep)';
          }}
        >
          Découvrir tous nos services immobiliers
        </a>
      </div>
    </section>
  );
}
