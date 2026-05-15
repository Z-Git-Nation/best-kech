'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Panel chatbot */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position:   'fixed',
              bottom:     80,
              right:      20,
              zIndex:     998,
              width:      300,
              background: 'var(--cream)',
              borderRadius: 20,
              boxShadow:  '0 24px 64px rgba(44,24,16,.25)',
              border:     '1px solid rgba(196,113,74,.15)',
              overflow:   'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'var(--brown-deep)',
              padding:    '1rem 1.25rem',
              display:    'flex',
              alignItems: 'center',
              gap:        '0.75rem',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--terracotta)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem',
              }}>
                🏡
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: 'var(--cream)', fontWeight: 500 }}>
                  Best Kech Immo
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', color: 'var(--gold)' }}>
                  En ligne · répond en quelques minutes
                </p>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'var(--text-dark)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Bonjour ! 👋 Comment puis-je vous aider ?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: '🔍  Rechercher un séjour',  action: () => { setOpen(false); document.querySelector('#sejour')?.scrollIntoView({ behavior: 'smooth' }); } },
                  { label: '🚗  Louer une voiture',      action: () => { setOpen(false); document.querySelector('#voitures')?.scrollIntoView({ behavior: 'smooth' }); } },
                  { label: '🏗️  Projet immobilier',     action: () => { setOpen(false); window.location.href = '/immobilier'; } },
                ].map(({ label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    style={{
                      fontFamily:  'var(--font-inter)',
                      fontSize:    '0.82rem',
                      color:       'var(--brown-deep)',
                      background:  'var(--cream-warm)',
                      border:      '1px solid rgba(196,113,74,.18)',
                      borderRadius: 10,
                      padding:     '0.65rem 0.9rem',
                      textAlign:   'left',
                      cursor:      'pointer',
                      transition:  'background .2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(196,113,74,.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--cream-warm)')}
                  >
                    {label}
                  </button>
                ))}

                <div style={{ borderTop: '1px solid rgba(196,113,74,.1)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: 'var(--text-light)', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Préférez-vous continuer sur
                  </p>
                  <a
                    href="https://wa.me/212664785714"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:       'flex',
                      alignItems:    'center',
                      justifyContent: 'center',
                      gap:           '0.4rem',
                      padding:       '0.65rem',
                      background:    '#25D366',
                      borderRadius:  10,
                      color:         '#fff',
                      fontFamily:    'var(--font-inter)',
                      fontSize:      '0.82rem',
                      fontWeight:    500,
                      textDecoration: 'none',
                      transition:    'opacity .2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.551 4.094 1.516 5.817L0 24l6.335-1.493A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.656-.497-5.188-1.367l-.371-.22-3.763.887.94-3.674-.242-.383A9.941 9.941 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position:     'fixed',
          bottom:       20,
          right:        20,
          zIndex:       999,
          width:        52,
          height:       52,
          borderRadius: '50%',
          background:   open ? 'var(--brown-deep)' : 'var(--terracotta)',
          border:       'none',
          cursor:       'pointer',
          boxShadow:    '0 8px 32px rgba(196,113,74,.45)',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          fontSize:     '1.3rem',
          transition:   'background .25s',
        }}
      >
        {open ? '✕' : '💬'}
      </motion.button>
    </>
  );
}
