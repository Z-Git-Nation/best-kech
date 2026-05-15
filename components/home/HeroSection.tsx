'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'motion/react';

const VillaObject3D = dynamic(() => import('./3d/VillaObject3D'), { ssr: false });

const FEATURED = [
  {
    type: 'week' as const,
    label: 'Villa de la semaine',
    name: 'Villa Alya',
    price: '350€',
    capacity: 8,
    reviews: [
      { author: 'Sophie M.', text: 'Un séjour absolument magique, la villa est sublime.', rating: 5 },
      { author: 'Thomas R.', text: 'Piscine incroyable, service impeccable. On revient !', rating: 5 },
      { author: 'Léa B.',    text: 'Marrakech sous son meilleur jour. Coup de cœur.', rating: 5 },
    ],
  },
  {
    type: 'month' as const,
    label: 'Villa du mois',
    name: 'Riad Nour',
    price: '220€',
    capacity: 6,
    reviews: [
      { author: 'Marc D.',    text: 'Authentique et luxueux, parfait pour notre anniversaire.', rating: 5 },
      { author: 'Amina K.',   text: 'Le riad de mes rêves. Service 5 étoiles.', rating: 5 },
      { author: 'Pierre L.',  text: 'Expérience inoubliable au cœur de Marrakech.', rating: 5 },
    ],
  },
];

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = FEATURED[activeIdx];

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position:   'relative',
        minHeight:  '100svh',
        background: 'linear-gradient(135deg, #2C1810 0%, #5C3828 40%, #C4714A 100%)',
        display:    'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow:   'hidden',
      }}
    >
      {/* Texture grain */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
        backgroundSize: '256px',
        opacity: 0.8,
      }} />

      {/* Vignette bas */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent 50%, rgba(44,24,16,.9) 100%)',
      }} />

      {/* Main grid */}
      <div style={{
        position:   'relative', zIndex: 2,
        display:    'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,420px)',
        gap:        'clamp(1rem, 3vw, 3rem)',
        padding:    'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
        maxWidth:   1400,
        margin:     '0 auto',
        width:      '100%',
      }}>

        {/* LEFT — 3D + toggle + reviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Toggle semaine / mois */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {FEATURED.map((f, i) => (
              <button
                key={f.type}
                onClick={() => setActiveIdx(i)}
                style={{
                  fontFamily:    'var(--font-inter)',
                  fontSize:      '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding:       '0.45rem 1.1rem',
                  borderRadius:  '2rem',
                  border:        'none',
                  cursor:        'pointer',
                  transition:    'all .3s',
                  background:    i === activeIdx ? 'var(--gold)' : 'rgba(255,255,255,.12)',
                  color:         i === activeIdx ? 'var(--brown-deep)' : 'rgba(250,247,242,.75)',
                  fontWeight:    i === activeIdx ? 600 : 400,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* 3D Viewer */}
          <div style={{ position: 'relative', height: 'clamp(280px, 40vw, 480px)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{    opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <VillaObject3D />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Villa name + price */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${activeIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}
            >
              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize:   'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 500,
                color:      'var(--cream)',
              }}>
                {active.name}
              </h2>
              <span style={{
                fontFamily: 'var(--font-inter)',
                fontSize:   '0.9rem',
                color:      'var(--gold)',
                fontWeight: 500,
              }}>
                à partir de {active.price}/nuit
              </span>
              <span style={{
                fontFamily: 'var(--font-inter)',
                fontSize:   '0.75rem',
                color:      'rgba(250,247,242,.55)',
              }}>
                · {active.capacity} pers.
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Review cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`reviews-${activeIdx}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{    opacity: 0, x: -40 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}
            >
              {active.reviews.map((r, i) => (
                <div key={i} style={{
                  flexShrink:   0,
                  background:   'rgba(250,247,242,.09)',
                  backdropFilter: 'blur(10px)',
                  border:       '1px solid rgba(250,247,242,.12)',
                  borderRadius: 12,
                  padding:      '0.85rem 1rem',
                  minWidth:     180,
                  maxWidth:     220,
                }}>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize:   '0.78rem',
                    color:      'rgba(250,247,242,.85)',
                    lineHeight: 1.5,
                    marginBottom: '0.6rem',
                  }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 500 }}>
                      {r.author}
                    </span>
                    <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>
                      {'★'.repeat(r.rating)}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — Search form */}
        <div style={{
          background:   'rgba(250,247,242,.97)',
          borderRadius: 20,
          padding:      'clamp(1.5rem, 3vw, 2.5rem)',
          boxShadow:    '0 24px 80px rgba(44,24,16,.4)',
        }}>
          <h3 style={{
            fontFamily:   'var(--font-cormorant)',
            fontSize:     '1.6rem',
            color:        'var(--brown-deep)',
            marginBottom: '1.5rem',
          }}>
            Trouver votre séjour
          </h3>

          <form
            onSubmit={e => {
              e.preventDefault();
              document.querySelector('#sejour')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {/* Dates */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-mid)' }}>
                  Arrivée
                </span>
                <input
                  type="date"
                  style={{
                    fontFamily: 'var(--font-inter)', fontSize: '0.9rem',
                    padding: '0.6rem 0.8rem', borderRadius: 10,
                    border: '1.5px solid rgba(196,113,74,.25)',
                    color: 'var(--brown-deep)', background: 'var(--cream-warm)',
                    outline: 'none',
                  }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-mid)' }}>
                  Départ
                </span>
                <input
                  type="date"
                  style={{
                    fontFamily: 'var(--font-inter)', fontSize: '0.9rem',
                    padding: '0.6rem 0.8rem', borderRadius: 10,
                    border: '1.5px solid rgba(196,113,74,.25)',
                    color: 'var(--brown-deep)', background: 'var(--cream-warm)',
                    outline: 'none',
                  }}
                />
              </label>
            </div>

            {/* Voyageurs */}
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-mid)' }}>
                Voyageurs
              </span>
              <select style={{
                fontFamily: 'var(--font-inter)', fontSize: '0.9rem',
                padding: '0.6rem 0.8rem', borderRadius: 10,
                border: '1.5px solid rgba(196,113,74,.25)',
                color: 'var(--brown-deep)', background: 'var(--cream-warm)',
                outline: 'none', cursor: 'pointer',
              }}>
                {[1,2,4,6,8,10,12].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'voyageur' : 'voyageurs'}</option>
                ))}
              </select>
            </label>

            {/* Budget */}
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-mid)' }}>
                Budget / nuit
              </span>
              <select style={{
                fontFamily: 'var(--font-inter)', fontSize: '0.9rem',
                padding: '0.6rem 0.8rem', borderRadius: 10,
                border: '1.5px solid rgba(196,113,74,.25)',
                color: 'var(--brown-deep)', background: 'var(--cream-warm)',
                outline: 'none', cursor: 'pointer',
              }}>
                <option value="">Tous budgets</option>
                <option value="50-150">50€ — 150€</option>
                <option value="150-300">150€ — 300€</option>
                <option value="300-500">300€ — 500€</option>
                <option value="500+">500€ et plus</option>
              </select>
            </label>

            <button
              type="submit"
              style={{
                marginTop:   '0.5rem',
                background:  'var(--terracotta)',
                color:       'var(--cream)',
                border:      'none',
                borderRadius: 12,
                padding:     '0.9rem',
                fontFamily:  'var(--font-inter)',
                fontSize:    '0.85rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight:  500,
                cursor:      'pointer',
                transition:  'background .25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--terracotta-deep)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--terracotta)')}
            >
              Voir les disponibilités
            </button>
          </form>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
      }}>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,242,.45)' }}>
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1.5, height: 28, background: 'rgba(250,247,242,.3)', borderRadius: 2 }}
        />
      </div>
    </section>
  );
}
