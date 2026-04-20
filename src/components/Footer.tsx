import type { Page } from '../App';

interface FooterProps {
  showPage: (page: Page) => void;
}

const GOLD = '#d4a536';

const socials = [
  {
    title: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    title: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
        <rect width="20" height="20" x="2" y="2" rx="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    title: 'TikTok',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.85a8.19 8.19 0 0 0 4.79 1.53V6.93a4.85 4.85 0 0 1-1.02-.24z"/>
      </svg>
    ),
  },
  {
    title: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a2620"/>
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
      </svg>
    ),
  },
];

export default function Footer({ showPage }: FooterProps) {
  return (
    <footer style={{
      background: 'var(--ink-900)', color: 'var(--cream)',
      padding: '80px 32px 32px',
      borderTop: '1px solid rgba(240,216,144,0.2)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <img src="/logo.png" alt="ELAYNOR" style={{ width: 52, height: 52, objectFit: 'contain' }} />
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--cream)', letterSpacing: '0.04em' }}>ELAYNOR</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold-400)', marginTop: 4 }}>Consulting</div>
              </div>
            </div>
            <p style={{ color: 'rgba(250,247,239,0.6)', fontSize: 14, lineHeight: 1.7, maxWidth: 340, marginBottom: 24 }}>
              Noria Osman — Comptable senior freelance. Organisation administrative et pilotage comptable pour TPE, artisans et professions libérales. Basée à Six-Fours-les-Plages, intervient partout en France.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socials.map(social => (
                <a key={social.title} href={social.href} title={social.title} style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(250,247,239,0.06)',
                  border: '1px solid rgba(212,165,54,0.25)',
                  color: GOLD,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', transition: 'all .2s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = GOLD; el.style.color = '#0a2620'; el.style.borderColor = GOLD; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(250,247,239,0.06)'; el.style.color = GOLD; el.style.borderColor = 'rgba(212,165,54,0.25)'; el.style.transform = ''; }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 600, color: 'var(--gold-400)', marginBottom: 20, letterSpacing: '0.06em' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {([['home', 'Accueil'], ['services', 'Services'], ['pricing', 'Tarifs'], ['contact', 'Contact']] as [Page, string][]).map(([id, label]) => (
                <li key={id}>
                  <button onClick={() => showPage(id)} style={{ color: 'rgba(250,247,239,0.7)', fontSize: 13.5, transition: 'color .2s', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', padding: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-400)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,239,0.7)')}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 600, color: 'var(--gold-400)', marginBottom: 20, letterSpacing: '0.06em' }}>Expertise</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Collecte & classement', 'Préparation comptable', 'Tableaux de bord', 'Facture électronique 2026', 'Paie & charges sociales'].map(item => (
                <li key={item}>
                  <span style={{ color: 'rgba(250,247,239,0.7)', fontSize: 13.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 600, color: 'var(--gold-400)', marginBottom: 20, letterSpacing: '0.06em' }}>Cabinet</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Six-Fours-les-Plages (Var 83)',
                'contact@elaynor-consulting.fr',
                'Var 83 · PACA · France entière',
                'TVA non applicable — art. 293 B',
                'SIRET 103 493 672 00010',
              ].map(item => (
                <li key={item}>
                  <span style={{ color: 'rgba(250,247,239,0.7)', fontSize: 13.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          paddingTop: 28, borderTop: '1px solid rgba(240,216,144,0.15)',
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
          fontSize: 12, color: 'rgba(250,247,239,0.45)', letterSpacing: '0.04em',
        }}>
          <div>© 2026 ELAYNOR Consulting · Noria Osman · SIRET 103 493 672 00010</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Mentions légales', 'CGV', 'Politique de confidentialité'].map(item => (
              <a key={item} href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-400)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
