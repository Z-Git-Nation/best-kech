'use client';
import { useState, useEffect, useRef } from 'react';

const LINKS = [
  { label: 'Séjour',   href: '#sejour'   },
  { label: 'Voitures', href: '#voitures' },
  { label: 'Immo.',    href: '#immo'     },
  { label: 'Blog',     href: '#blog'     },
];

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered,   setHovered]   = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
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
        width:        isSmall ? 'min(420px, calc(100vw - 48px))' : 'min(620px, calc(100vw - 48px))',
        height:       50,
        borderRadius: '40px',
        display:      'flex',
        alignItems:   'center',
        gap:          isSmall ? 10 : 20,
        padding:      isSmall ? '0 14px' : '0 20px',
        /* Frosted glass pur */
        background:         'rgba(44, 24, 16, 0.38)',
        backdropFilter:       'blur(22px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
        border:       '1px solid rgba(212,168,83,.15)',
        boxShadow:    '0 8px 32px rgba(44,24,16,.28), inset 0 1px 0 rgba(250,247,242,.06)',
        transition:   'width .22s cubic-bezier(.4,0,.2,1), gap .2s, padding .2s',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <span style={{
          fontFamily:    'var(--font-cormorant)',
          fontSize:      16,
          fontWeight:    600,
          letterSpacing: '0.18em',
          color:         '#D4A853',
          textTransform: 'uppercase',
        }}>
          BKI
        </span>
      </a>

      {/* Séparateur */}
      <div style={{ width: 1, height: 20, background: 'rgba(212,168,83,.2)', flexShrink: 0 }} />

      {/* Links */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: isSmall ? 14 : 28, transition: 'gap .2s' }}>
        {LINKS.map(({ href, label }) => (
          <button
            key={href}
            onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         'rgba(250,247,242,.7)',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              padding:       0,
              whiteSpace:    'nowrap',
              transition:    'color .18s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(250,247,242,1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,.7)')}
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
          background:     'rgba(212,168,83,.15)',
          color:          '#D4A853',
          padding:        '6px 14px',
          borderRadius:   '40px',
          textDecoration: 'none',
          border:         '1px solid rgba(212,168,83,.25)',
          flexShrink:     0,
          transition:     'background .2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,168,83,.28)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,168,83,.15)')}
      >
        Admin
      </a>
    </nav>
  );
}
