import { useState, useEffect } from 'react';
import type { Page } from '../App';
import { useIsMobile } from '../hooks/useIsMobile';

interface NavProps {
  currentPage: Page;
  showPage: (page: Page) => void;
}

export default function Nav({ currentPage, showPage }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile(900);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const navigate = (page: Page) => {
    showPage(page);
    setMenuOpen(false);
  };

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Tarifs' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? '10px 5%' : '14px 5%',
        background: scrolled ? 'rgba(250,247,239,0.97)' : 'rgba(250,247,239,0.92)',
        backdropFilter: 'saturate(160%) blur(14px)',
        WebkitBackdropFilter: 'saturate(160%) blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(138,102,20,0.2)' : '1px solid rgba(138,102,20,0.14)',
        transition: 'all .3s ease',
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16,
        }}>
          {/* Logo */}
          <button onClick={() => navigate('home')} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            cursor: 'pointer', background: 'none', border: 'none', padding: 0, flexShrink: 0,
          }}>
            <img src="/logo.png" alt="ELAYNOR Consulting" style={{
              width: isMobile ? 36 : 46, height: isMobile ? 36 : 46,
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 4px rgba(138,102,20,0.25))',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textAlign: 'left' }}>
              <span style={{
                fontFamily: 'var(--serif)', fontWeight: 600,
                fontSize: isMobile ? 16 : 20,
                letterSpacing: '0.04em', color: 'var(--ink-800)',
              }}>ELAYNOR</span>
              <span style={{
                fontSize: isMobile ? 8 : 10, fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--gold-600)', marginTop: 3,
              }}>Consulting Digital</span>
            </div>
          </button>

          {/* Desktop nav */}
          {!isMobile && (
            <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => navigate(id)}
                    style={{
                      padding: '9px 16px', fontSize: 13.5, fontWeight: 500,
                      fontFamily: 'var(--sans)', background: 'transparent',
                      border: 'none', cursor: 'pointer', borderRadius: 8,
                      transition: 'all .2s', letterSpacing: '0.01em',
                      color: currentPage === id ? 'var(--gold-700)' : 'var(--ink-800)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-700)')}
                    onMouseLeave={e => (e.currentTarget.style.color = currentPage === id ? 'var(--gold-700)' : 'var(--ink-800)')}
                  >
                    {label}
                    {currentPage === id && (
                      <div style={{ width: 14, height: 1, margin: '4px auto 0', background: 'var(--gold-500)' }} />
                    )}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('contact')}
                  style={{
                    background: 'var(--ink-800)', color: 'var(--cream)',
                    padding: '11px 22px', borderRadius: 100,
                    fontWeight: 600, fontFamily: 'var(--sans)', fontSize: 13.5,
                    border: '1px solid var(--ink-800)', cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    transition: 'all .25s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'var(--gold-600)';
                    el.style.borderColor = 'var(--gold-600)';
                    el.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'var(--ink-800)';
                    el.style.borderColor = 'var(--ink-800)';
                    el.style.transform = '';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  Prendre RDV
                </button>
              </li>
            </ul>
          )}

          {/* Hamburger button */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px', display: 'flex', flexDirection: 'column',
                gap: 5, flexShrink: 0,
              }}
              aria-label="Menu"
            >
              <span style={{ width: 24, height: 2, background: 'var(--ink-800)', transition: '0.3s', display: 'block', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
              <span style={{ width: 24, height: 2, background: 'var(--ink-800)', transition: '0.3s', display: 'block', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: 24, height: 2, background: 'var(--ink-800)', transition: '0.3s', display: 'block', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 49,
          background: 'rgba(250,247,239,0.98)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(138,102,20,0.2)',
          padding: '20px 5% 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}>
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              style={{
                border: 'none', cursor: 'pointer',
                textAlign: 'left', padding: '14px 16px', borderRadius: 10,
                fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 500,
                color: currentPage === id ? 'var(--gold-700)' : 'var(--ink-800)',
                background: currentPage === id ? 'rgba(212,175,55,0.08)' : 'transparent',
              } as React.CSSProperties}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => navigate('contact')}
            style={{
              marginTop: 8,
              background: 'linear-gradient(135deg, #D4AF37, #b8922a)',
              color: 'var(--ink-900)', padding: '14px 20px',
              borderRadius: 100, fontWeight: 700, fontFamily: 'var(--sans)',
              fontSize: 14, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            Prendre rendez-vous
          </button>
        </div>
      )}
    </>
  );
}
