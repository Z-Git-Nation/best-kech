'use client';
export default function Footer() {
  return (
    <footer
      id="site-footer"
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: 360,
        background: 'var(--brown-deep)',
        color: 'var(--cream)',
        zIndex: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(2rem, 5vw, 5rem)',
        alignContent: 'center',
      }}
    >
      {/* Brand */}
      <div>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>
          Best Kech Immo
        </p>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'rgba(250,247,242,.45)', lineHeight: 1.7, maxWidth: 260 }}>
          Votre partenaire immobilier et conciergerie à Marrakech depuis 2018.
        </p>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', color: 'var(--gold)', marginTop: '0.75rem' }}>
          Noria Km 5, Route de Tahanaout<br />Marrakech, Maroc
        </p>
      </div>

      {/* Services */}
      <div>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
          Services
        </p>
        {['Location de villas', 'Location d\'appartements', 'Location de voitures', 'Conciergerie', 'Vente immobilière', 'Construction', 'Rénovation'].map(s => (
          <p key={s} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'rgba(250,247,242,.55)', marginBottom: '0.4rem' }}>
            {s}
          </p>
        ))}
      </div>

      {/* Contact */}
      <div>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
          Contact
        </p>
        <a href="https://wa.me/212664785714" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'var(--cream)', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>
          +212 664-785714
        </a>
        <a href="mailto:rachid.suryimmo@gmail.com"
          style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'rgba(250,247,242,.5)', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
          rachid.suryimmo@gmail.com
        </a>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          {['Instagram', 'Facebook', 'WhatsApp'].map(sn => (
            <a key={sn} href="#"
              style={{
                fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(250,247,242,.4)',
                textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,.4)')}
            >
              {sn}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: '1rem', left: 0, right: 0,
        padding: '0 clamp(2rem, 5vw, 5rem)',
        borderTop: '1px solid rgba(250,247,242,.06)',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', color: 'rgba(250,247,242,.25)' }}>
          © 2026 Best Kech Immo · Tous droits réservés
        </p>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', color: 'rgba(250,247,242,.2)' }}>
          bestkech.ai-nation.xyz
        </p>
      </div>
    </footer>
  );
}
