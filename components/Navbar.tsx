'use client';
import { useEffect, useState } from 'react';

const links = [
  { href: '#sejour',   label: 'Séjour' },
  { href: '#voitures', label: 'Voitures' },
  { href: '#immo',     label: 'Immobilier' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position:        'fixed',
      top:             0, left: 0, right: 0,
      zIndex:          200,
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'space-between',
      padding:         '0 clamp(1.5rem, 4vw, 3rem)',
      height:          72,
      transition:      'background .4s, backdrop-filter .4s, box-shadow .4s',
      background:      scrolled ? 'rgba(250,247,242,0.92)' : 'transparent',
      backdropFilter:  scrolled ? 'blur(14px)' : 'none',
      boxShadow:       scrolled ? '0 1px 24px rgba(44,24,16,.08)' : 'none',
    }}>
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily:    'var(--font-cormorant)',
          fontSize:      '1.5rem',
          fontWeight:    600,
          color:         scrolled ? 'var(--brown-deep)' : 'var(--cream)',
          letterSpacing: '0.04em',
          transition:    'color .4s',
        }}>
          BKI
        </span>
        <span style={{
          fontFamily:  'var(--font-inter)',
          fontSize:    '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:       scrolled ? 'var(--terracotta)' : 'rgba(250,247,242,.7)',
          marginLeft:  8,
          transition:  'color .4s',
        }}>
          Marrakech
        </span>
      </a>

      {/* Links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={e => {
              e.preventDefault();
              document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily:    'var(--font-inter)',
              fontSize:      '0.8rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         scrolled ? 'var(--brown-deep)' : 'rgba(250,247,242,.85)',
              textDecoration: 'none',
              transition:    'color .3s',
            }}
          >
            {label}
          </a>
        ))}
        <a
          href="https://wa.me/212664785714"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily:    'var(--font-inter)',
            fontSize:      '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--cream)',
            background:    'var(--terracotta)',
            padding:       '0.5rem 1.2rem',
            borderRadius:  '2rem',
            textDecoration: 'none',
            transition:    'background .3s',
          }}
        >
          Réserver
        </a>
      </div>
    </nav>
  );
}
