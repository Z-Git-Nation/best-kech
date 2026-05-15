'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MOCK_POSTS = [
  {
    id: '1',
    slug: 'top-10-villas-marrakech',
    title: 'Top 10 villas avec piscine à Marrakech',
    excerpt: 'De la villa contemporaine à l\'authentique riad, découvrez notre sélection des meilleures propriétés avec piscine pour un séjour inoubliable.',
    imageGradient: 'linear-gradient(135deg, #C4714A 0%, #8B4A2A 100%)',
    date: '12 mai 2026',
    readTime: '5 min',
    tag: 'Séjour',
    tagColor: '#C4714A',
  },
  {
    id: '2',
    slug: 'guide-location-voiture-marrakech',
    title: 'Guide : louer une voiture à Marrakech en 2026',
    excerpt: 'Tout ce qu\'il faut savoir avant de louer un véhicule : documents nécessaires, routes incontournables et conseils pratiques pour explorer la région.',
    imageGradient: 'linear-gradient(135deg, #D4A853 0%, #9E6A20 100%)',
    date: '5 mai 2026',
    readTime: '4 min',
    tag: 'Voitures',
    tagColor: '#D4A853',
  },
  {
    id: '3',
    slug: 'investir-immobilier-marrakech',
    title: 'Investir dans l\'immobilier à Marrakech : ce qu\'il faut savoir',
    excerpt: 'Marché en pleine croissance, prix attractifs, fiscalité favorable — un panorama complet pour les investisseurs étrangers qui souhaitent acquérir un bien.',
    imageGradient: 'linear-gradient(135deg, #2C1810 0%, #5C3828 100%)',
    date: '28 avril 2026',
    readTime: '7 min',
    tag: 'Immobilier',
    tagColor: '#5C3828',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 86%', toggleActions: 'play none none reverse' },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1400, margin: '0 auto 3rem' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.6rem' }}>
          Conseils & Actualités
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--brown-deep)', fontWeight: 400 }}>
            Le blog Best Kech
          </h2>
          <a href="/blog" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid var(--terracotta)', paddingBottom: '2px', transition: 'opacity .2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Tous les articles →
          </a>
        </div>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        maxWidth: 1400, margin: '0 auto',
      }}>
        {MOCK_POSTS.map((post, i) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            ref={el => { if (el) cardsRef.current[i] = el; }}
            style={{
              display: 'block', textDecoration: 'none',
              background: 'var(--cream-warm)', borderRadius: 16,
              overflow: 'hidden', border: '1px solid rgba(196,113,74,.1)',
              transition: 'box-shadow .3s, transform .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 48px rgba(196,113,74,.15)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {/* Image placeholder */}
            <div style={{ height: 180, background: post.imageGradient, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', padding: '0.3rem 0.75rem',
                background: post.tagColor, color: '#FAF7F2',
                borderRadius: '2rem', fontWeight: 500,
              }}>
                {post.tag}
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', color: 'var(--text-light)' }}>{post.date}</span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', color: 'var(--text-light)' }}>· {post.readTime} de lecture</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', color: 'var(--brown-deep)', fontWeight: 500, lineHeight: 1.3, marginBottom: '0.65rem' }}>
                {post.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.83rem', color: 'var(--text-mid)', lineHeight: 1.65 }}>
                {post.excerpt}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
