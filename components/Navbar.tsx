'use client';
import { useState, useEffect, useRef } from 'react';

const LINKS = [
  { label: 'Séjour',    href: '#sejour'   },
  { label: 'Voitures',  href: '#voitures' },
  { label: 'Imo.',      href: '#immo'     },
];

function NavPixels() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const r = cv.parentElement!.getBoundingClientRect();
      cv.width = r.width * dpr; cv.height = r.height * dpr;
      cv.style.width = r.width + 'px'; cv.style.height = r.height + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    const gap = 4, dotSize = 2;
    const cols = Math.ceil(cv.offsetWidth / gap) + 1;
    const rows = Math.ceil(cv.offsetHeight / gap) + 1;
    const dots = Array.from({ length: cols * rows }, () => ({
      o: 0, t: 0, spd: .002 + Math.random() * .003,
      next: Math.floor(Math.random() * 500), frame: 0,
    }));
    let raf: number;
    const draw = () => {
      const w = cv.width / dpr, h = cv.height / dpr;
      ctx.clearRect(0, 0, w, h);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const d = dots[r * cols + c];
          d.frame++;
          if (d.frame >= d.next) {
            d.t = Math.random() < .1 ? (.3 + Math.random() * .4) : 0;
            d.next = d.frame + 200 + Math.floor(Math.random() * 500);
          }
          d.o += (d.t - d.o) * d.spd * 16;
          if (d.o > .02) {
            ctx.fillStyle = '#D4A853';
            ctx.globalAlpha = d.o;
            ctx.fillRect(c * gap, r * gap, dotSize, dotSize);
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return (
    <canvas ref={ref} style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      borderRadius: '40px',
    }} />
  );
}

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered,   setHovered]   = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastY.current - 5 || y < 30) setCollapsed(false);
      else if (y > lastY.current + 5 && y > 80) setCollapsed(true);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isSmall = collapsed && !hovered;

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     'fixed',
        top:          14,
        left:         '50%',
        transform:    'translateX(-50%)',
        zIndex:       1000,
        width:        isSmall ? 'min(480px, calc(100vw - 48px))' : 'min(680px, calc(100vw - 48px))',
        height:       52,
        borderRadius: '40px',
        display:      'flex',
        alignItems:   'center',
        gap:          isSmall ? 10 : 22,
        padding:      isSmall ? '0 14px' : '0 22px',
        background:   'rgba(44, 24, 16, 0.78)',
        backdropFilter:       'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        border:       '1px solid rgba(212,168,83,.18)',
        boxShadow:    '0 20px 60px rgba(0,0,0,.65), 0 0 28px rgba(196,113,74,.07), 0 0 0 1px rgba(0,0,0,.25)',
        overflow:     'hidden',
        transition:   'width .22s cubic-bezier(.4,0,.2,1), gap .2s, padding .2s',
      }}
    >
      {mounted && <NavPixels />}

      {/* Logo */}
      <a href="/" style={{ position: 'relative', zIndex: 1, textDecoration: 'none', flexShrink: 0 }}>
        <span style={{
          fontFamily:    'var(--font-cormorant)',
          fontSize:      17,
          fontWeight:    600,
          letterSpacing: '0.16em',
          color:         '#D4A853',
          textTransform: 'uppercase',
        }}>
          BKI
        </span>
      </a>

      {/* Séparateur */}
      <div style={{ width: 1, height: 22, background: 'rgba(212,168,83,.2)', flexShrink: 0, position: 'relative', zIndex: 1 }} />

      {/* Links */}
      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center',
        gap: isSmall ? 14 : 28, position: 'relative', zIndex: 1,
        transition: 'gap .2s',
      }}>
        {LINKS.map(({ href, label }) => (
          <button
            key={href}
            onClick={() => scrollTo(href)}
            style={{
              fontFamily:     'var(--font-inter)',
              fontSize:       10.5,
              letterSpacing:  '0.14em',
              textTransform:  'uppercase',
              color:          'rgba(250,247,242,.65)',
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              padding:        0,
              whiteSpace:     'nowrap',
              transition:     'color .18s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(250,247,242,1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,.65)')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Admin pill */}
      <a
        href="/admin"
        style={{
          fontFamily:     'var(--font-inter)',
          fontSize:       9,
          fontWeight:     600,
          letterSpacing:  '0.18em',
          textTransform:  'uppercase',
          background:     'rgba(212,168,83,.18)',
          color:          '#D4A853',
          padding:        '6px 14px',
          borderRadius:   '40px',
          textDecoration: 'none',
          whiteSpace:     'nowrap',
          border:         '1px solid rgba(212,168,83,.3)',
          position:       'relative',
          zIndex:         1,
          flexShrink:     0,
          transition:     'background .2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,168,83,.32)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,168,83,.18)')}
      >
        Admin
      </a>
    </nav>
  );
}
