'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'motion/react';

const VillaObject3D = dynamic(() => import('./3d/VillaObject3D'), { ssr: false });

const BG_GRADIENTS = [
  'linear-gradient(135deg, #8B4A2A 0%, #C4714A 35%, #2C1810 100%)',
  'linear-gradient(135deg, #1A3A2A 0%, #2C6040 35%, #1A1A10 100%)',
];

const FEATURED = [
  {
    type: 'week' as const, label: 'Villa de la semaine',
    name: 'Villa Alya', price: '350€', capacity: 8, bg: BG_GRADIENTS[0],
    reviews: [
      { author: 'Sophie M.',  text: 'Un séjour absolument magique, la villa est sublime.', rating: 5 },
      { author: 'Thomas R.',  text: 'Piscine incroyable, service impeccable. On revient !', rating: 5 },
      { author: 'Léa B.',     text: 'Marrakech sous son meilleur jour. Coup de cœur.', rating: 5 },
    ],
  },
  {
    type: 'month' as const, label: 'Villa du mois',
    name: 'Riad Nour', price: '220€', capacity: 6, bg: BG_GRADIENTS[1],
    reviews: [
      { author: 'Marc D.',   text: 'Authentique et luxueux, parfait pour notre anniversaire.', rating: 5 },
      { author: 'Amina K.',  text: 'Le riad de mes rêves. Service 5 étoiles.', rating: 5 },
      { author: 'Pierre L.', text: 'Expérience inoubliable au cœur de Marrakech.', rating: 5 },
    ],
  },
];

// dir = 1  →  current exits LEFT  (-x), next enters from RIGHT (+x)
// dir = -1 →  current exits RIGHT (+x), next enters from LEFT  (-x)
function useSwap(initial = 0) {
  const [idx, setIdx] = useState(initial);
  const [dir, setDir] = useState<1 | -1>(1);

  const go = (newIdx: number) => {
    if (newIdx === idx) return;
    setDir(newIdx > idx ? 1 : -1);
    setIdx(newIdx);
  };

  return { idx, dir, go };
}

export default function HeroSection() {
  const { idx: activeIdx, dir, go } = useSwap(0);
  const active = FEATURED[activeIdx];

  // exit  : dir=1  → -120 (left)    dir=-1 → +120 (right)
  // enter : dir=1  → +120 (right)   dir=-1 → -120 (left)
  const exitX  = dir === 1 ? -120 : 120;
  const enterX = dir === 1 ?  120 : -120;

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}>

      {/* Background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${activeIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 0, background: active.bg }}
        />
      </AnimatePresence>

      {/* Bokeh vignette */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 30% 60%, rgba(44,24,16,.25) 0%, rgba(44,24,16,.55) 60%, rgba(44,24,16,.88) 100%)' }} />

      {/* Grain */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
        backgroundSize: '256px', opacity: 0.7 }} />

      {/* Vignette bas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent 40%, rgba(44,24,16,.95) 100%)' }} />

      {/* Grid */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,380px)',
        gap: 'clamp(1rem, 3vw, 3rem)',
        padding: 'clamp(5.5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
        maxWidth: 1400, margin: '0 auto', width: '100%',
        minHeight: '100svh', boxSizing: 'border-box',
      }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {FEATURED.map((f, i) => (
              <button key={f.type} onClick={() => go(i)} style={{
                fontFamily: 'var(--font-inter)', fontSize: '0.72rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '0.45rem 1.1rem', borderRadius: '2rem', border: 'none',
                cursor: 'pointer', transition: 'all .3s',
                background: i === activeIdx ? 'var(--gold)'           : 'rgba(255,255,255,.12)',
                color:      i === activeIdx ? 'var(--brown-deep)'     : 'rgba(250,247,242,.75)',
                fontWeight: i === activeIdx ? 600 : 400,
              }}>
                {f.label}
              </button>
            ))}
          </div>

          {/* 3D Viewer */}
          <div style={{ position: 'relative', height: 'clamp(320px, 45vw, 540px)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: enterX }}
                animate={{ opacity: 1, x: 0 }}
                exit={{    opacity: 0, x: exitX }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <VillaObject3D />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Villa info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${activeIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}
            >
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 500, color: 'var(--cream)' }}>
                {active.name}
              </h2>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'var(--gold)', fontWeight: 500 }}>
                à partir de {active.price}/nuit
              </span>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'rgba(250,247,242,.5)' }}>
                · {active.capacity} pers.
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Reviews */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`rev-${activeIdx}`}
              initial={{ opacity: 0, x: enterX * 0.4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{    opacity: 0, x: exitX  * 0.4 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}
            >
              {active.reviews.map((r, i) => (
                <div key={i} style={{
                  flexShrink: 0,
                  background: 'rgba(250,247,242,.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(250,247,242,.11)',
                  borderRadius: 12,
                  padding: '0.85rem 1rem',
                  minWidth: 175, maxWidth: 215,
                }}>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.77rem', color: 'rgba(250,247,242,.85)', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 500 }}>{r.author}</span>
                    <span style={{ color: 'var(--gold)', fontSize: '0.68rem' }}>{'★'.repeat(r.rating)}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — Frosted glass form */}
        <div style={{
          background:         'rgba(250,247,242,.10)',
          backdropFilter:       'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          border:             '1px solid rgba(250,247,242,.18)',
          borderRadius:       20,
          padding:            'clamp(1.5rem, 3vw, 2.25rem)',
          boxShadow:          '0 24px 64px rgba(44,24,16,.3), inset 0 1px 0 rgba(250,247,242,.1)',
        }}>
          <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.7rem', color: 'var(--cream)', marginBottom: '1.5rem' }}>
            Trouver votre séjour
          </h3>
          <form
            onSubmit={e => { e.preventDefault(); document.querySelector('#sejour')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {(['Arrivée', 'Départ'] as const).map(label => (
                <label key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.67rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,247,242,.6)' }}>
                    {label}
                  </span>
                  <input type="date" style={{
                    fontFamily: 'var(--font-inter)', fontSize: '0.85rem',
                    padding: '0.55rem 0.75rem', borderRadius: 10,
                    border: '1px solid rgba(250,247,242,.2)',
                    color: 'var(--cream)', background: 'rgba(250,247,242,.12)',
                    outline: 'none', colorScheme: 'dark',
                  }} />
                </label>
              ))}
            </div>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.67rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,247,242,.6)' }}>
                Voyageurs
              </span>
              <select style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', padding: '0.55rem 0.75rem', borderRadius: 10, border: '1px solid rgba(250,247,242,.2)', color: 'var(--cream)', background: 'rgba(44,24,16,.6)', outline: 'none', cursor: 'pointer' }}>
                {[1,2,4,6,8,10,12].map(n => <option key={n} value={n}>{n} {n === 1 ? 'voyageur' : 'voyageurs'}</option>)}
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.67rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,247,242,.6)' }}>
                Budget / nuit
              </span>
              <select style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', padding: '0.55rem 0.75rem', borderRadius: 10, border: '1px solid rgba(250,247,242,.2)', color: 'var(--cream)', background: 'rgba(44,24,16,.6)', outline: 'none', cursor: 'pointer' }}>
                <option value="">Tous budgets</option>
                <option value="50-150">50€ — 150€</option>
                <option value="150-300">150€ — 300€</option>
                <option value="300-500">300€ — 500€</option>
                <option value="500+">500€ et plus</option>
              </select>
            </label>

            <button
              type="submit"
              style={{ marginTop: '0.25rem', background: 'var(--terracotta)', color: 'var(--cream)', border: 'none', borderRadius: 12, padding: '0.85rem', fontFamily: 'var(--font-inter)', fontSize: '0.83rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', transition: 'background .25s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--terracotta-deep)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--terracotta)')}
            >
              Voir les disponibilités
            </button>
          </form>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,242,.38)' }}>Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1.5, height: 28, background: 'rgba(250,247,242,.28)', borderRadius: 2 }}
        />
      </div>
    </section>
  );
}
