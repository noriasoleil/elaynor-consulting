import { useState, useRef } from 'react';
import { CircuitBg } from './CircuitBg';
import { Eyebrow } from './ui/Eyebrow';
import { SectionCream } from './ui/Sections';
import { useIsMobile } from '../hooks/useIsMobile';

function ExpertComptableCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        background: 'var(--ink-gradient)',
        borderRadius: 20,
        padding: 32,
        border: '1px solid rgba(240,216,144,0.2)',
        overflow: 'hidden',
        transition: 'transform .3s ease, border-color .3s ease, box-shadow .3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-4px)';
        el.style.borderColor = 'rgba(240,216,144,0.45)';
        el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.35)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = '';
        el.style.borderColor = 'rgba(240,216,144,0.2)';
        el.style.boxShadow = '';
      }}
    >
      <div style={{
        position: 'absolute', top: '-40%', right: '-20%',
        width: '70%', height: '180%',
        background: 'radial-gradient(circle, rgba(212,165,54,0.12) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-30%', left: '-15%',
        width: '60%', height: '120%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(212,165,54,0.15)',
          border: '1px solid rgba(212,165,54,0.3)',
          borderRadius: 100, padding: '6px 14px',
          marginBottom: 18,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, color: 'var(--gold-400)' }}>
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
          </svg>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-400)' }}>
            Partenariat cabinet
          </span>
        </div>

        <h3 style={{
          fontFamily: 'var(--serif)',
          color: 'var(--cream)', marginBottom: 14, lineHeight: 1.15, letterSpacing: '-0.01em',
        }}>
          <span style={{ display: 'block', fontSize: 16, fontWeight: 400, opacity: 0.75, marginBottom: 4, letterSpacing: '0.01em' }}>Vous êtes</span>
          <span style={{ display: 'block', fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>expert-comptable ?</span>
        </h3>

        <p style={{
          fontSize: 14, color: 'rgba(250,247,239,0.72)', lineHeight: 1.7, marginBottom: 24,
        }}>
          Je vous aide à fluidifier la collaboration avec vos clients en préparant leurs dossiers en amont : classement, structuration, pré-analyse — pour que vous receviez des dossiers propres et gagniez du temps.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {[
            'Dossiers transmis structurés et complets',
            'Réduction du temps de saisie',
            'Interface dédiée avec vos clients',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, width: 16, height: 16, color: 'var(--gold-400)', marginTop: 3 }}>
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              <span style={{ fontSize: 13.5, color: 'rgba(250,247,239,0.8)', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        <button
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '13px 24px', fontSize: 13.5, fontWeight: 600,
            borderRadius: 100, border: '1px solid var(--gold-500)',
            cursor: 'pointer', background: 'var(--gold-gradient)',
            color: 'var(--ink-900)', boxShadow: 'var(--shadow-gold)',
            fontFamily: 'var(--sans)', transition: 'all .25s ease', letterSpacing: '0.005em',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'translateY(-2px)';
            el.style.filter = 'brightness(1.08)';
            el.style.boxShadow = '0 8px 24px rgba(212,165,54,0.5)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = '';
            el.style.filter = '';
            el.style.boxShadow = 'var(--shadow-gold)';
          }}
          onClick={() => {
            const form = document.querySelector('.form-submit');
            form?.closest('form')?.querySelector('textarea')?.focus();
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
          En savoir plus
        </button>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const isMobile = useIsMobile();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const btn = (e.currentTarget as HTMLFormElement).querySelector('.form-submit') as HTMLButtonElement;
    const original = btn.textContent;
    btn.textContent = 'Message envoyé !';
    btn.style.background = 'var(--teal-600)';
    btn.style.borderColor = 'var(--teal-600)';
    btn.style.color = 'white';
    setSubmitted(true);
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      setSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 2800);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    border: '1px solid var(--gray-200)', borderRadius: 10,
    fontSize: 14.5, fontFamily: 'var(--sans)',
    background: 'var(--cream)', color: 'var(--ink-800)',
    transition: 'all .2s', outline: 'none',
  };

  return (
    <div style={{ animation: 'fadePage .5s ease' }}>
      <section style={{
        position: 'relative',
        padding: isMobile ? '110px 5% 60px' : '140px 32px 80px',
        minHeight: isMobile ? 'auto' : 420,
        background: 'var(--ink-gradient)', color: 'var(--cream)', overflow: 'hidden',
      }}>
        <CircuitBg />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow light center>Prenons contact</Eyebrow>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: isMobile ? 'clamp(36px, 8vw, 52px)' : 'clamp(44px, 5.6vw, 72px)', color: 'var(--cream)', margin: '20px auto 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Un mot, un appel,<br />et on <em style={{ fontStyle: 'italic', fontWeight: 400, background: 'linear-gradient(100deg, var(--gold-300), var(--gold-500), var(--gold-300))', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 6s linear infinite' }}>démarre</em>.
          </h1>
          <p style={{ fontSize: isMobile ? 14.5 : 17.5, color: 'rgba(250,247,239,0.78)', lineHeight: 1.7, margin: '0 auto', maxWidth: 620 }}>
            La première étape est toujours un appel découverte gratuit de 30 minutes. Je réponds à toutes les demandes sous 24h ouvrées.
          </p>
        </div>
      </section>

      <SectionCream style={{ paddingTop: 80 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20, marginBottom: isMobile ? 40 : 72 }}>
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.61 5.61l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 15.5v1.42z"/></svg>, label: 'Téléphone', value: '06 15 34 02 38' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, label: 'Email', value: 'contact@elaynor-consulting.fr' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Bureau', value: 'Six-Fours-les-Plages · Var' },
            ].map(card => (
              <div key={card.label} style={{
                background: 'var(--white)', border: '1px solid rgba(138,102,20,0.12)',
                borderRadius: 16, padding: 28, display: 'flex', alignItems: 'center', gap: 18,
                transition: 'all .25s', cursor: 'default',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--gold-400)'; el.style.boxShadow = 'var(--shadow-md)'; el.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(138,102,20,0.12)'; el.style.boxShadow = ''; el.style.transform = ''; }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(135deg, rgba(212,165,54,0.15), rgba(212,165,54,0.05))', color: 'var(--gold-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {card.icon}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 2, letterSpacing: '0.02em' }}>{card.label}</h4>
                  <p style={{ fontSize: 15.5, fontWeight: 500, color: 'var(--ink-800)' }}>{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
            <div style={{ background: 'var(--white)', border: '1px solid rgba(138,102,20,0.12)', borderRadius: 20, padding: isMobile ? '28px 20px' : 44, boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 600, color: 'var(--ink-800)', marginBottom: 6 }}>Parlez-moi de votre projet</h3>
              <p style={{ color: 'var(--gray-600)', fontSize: 14.5, marginBottom: 28 }}>Plus vous êtes précis·e, plus je peux préparer notre appel.</p>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8, letterSpacing: '0.04em' }}>Prénom</label>
                    <input type="text" placeholder="Julien" required style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold-500)'; e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,165,54,0.15)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.boxShadow = ''; }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8, letterSpacing: '0.04em' }}>Nom</label>
                    <input type="text" placeholder="Laurent" required style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold-500)'; e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,165,54,0.15)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.boxShadow = ''; }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8, letterSpacing: '0.04em' }}>Email</label>
                    <input type="email" placeholder="julien@exemple.fr" required style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold-500)'; e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,165,54,0.15)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.boxShadow = ''; }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8, letterSpacing: '0.04em' }}>Téléphone</label>
                    <input type="tel" placeholder="06 12 34 56 78" style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold-500)'; e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,165,54,0.15)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.boxShadow = ''; }} />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8, letterSpacing: '0.04em' }}>Type d'activité</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold-500)'; e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,165,54,0.15)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.boxShadow = ''; }}>
                    <option>Micro-entrepreneur / indépendant</option>
                    <option>Artisan · BTP · Services</option>
                    <option>Profession libérale (avocat, médecin, kiné…)</option>
                    <option>TPE / PME avec salariés</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8, letterSpacing: '0.04em' }}>Votre message</label>
                  <textarea placeholder="Dites-moi en quelques lignes où vous en êtes et ce que vous cherchez à résoudre…" style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold-500)'; e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,165,54,0.15)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.boxShadow = ''; }} />
                </div>
                <button type="submit" className="form-submit" disabled={submitted} style={{
                  width: '100%', padding: 16,
                  background: 'var(--ink-800)', color: 'var(--cream)',
                  border: '1px solid var(--ink-800)', borderRadius: 100,
                  fontWeight: 600, fontSize: 14.5, cursor: 'pointer',
                  transition: 'all .25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontFamily: 'var(--sans)',
                }}
                  onMouseEnter={e => { if (!submitted) { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--gold-gradient)'; el.style.borderColor = 'var(--gold-500)'; el.style.color = 'var(--ink-900)'; el.style.boxShadow = 'var(--shadow-gold)'; } }}
                  onMouseLeave={e => { if (!submitted) { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--ink-800)'; el.style.borderColor = 'var(--ink-800)'; el.style.color = 'var(--cream)'; el.style.boxShadow = ''; } }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  Envoyer ma demande
                </button>
                <p style={{ marginTop: 14, fontSize: 12, color: 'var(--gray-600)', textAlign: 'center' }}>Réponse sous 24h ouvrées · Confidentialité garantie</p>
              </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{
                background: 'var(--ink-gradient)', color: 'var(--cream)',
                borderRadius: 20, padding: 32,
                border: '1px solid rgba(240,216,144,0.2)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: '-50%', right: '-30%', width: '80%', height: '200%', background: 'radial-gradient(circle, rgba(212,165,54,0.15) 0%, transparent 50%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <Eyebrow light>Prise de rendez-vous</Eyebrow>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, margin: '8px 0 10px', color: 'var(--cream)' }}>Appel découverte · 30 min</h3>
                  <p style={{ color: 'rgba(250,247,239,0.7)', fontSize: 14, lineHeight: 1.65, marginBottom: 28 }}>
                    Gratuit, sans engagement. Consultez mes disponibilités en temps réel et choisissez le créneau qui vous convient.
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '18px 20px',
                    background: 'rgba(250,247,239,0.06)',
                    border: '1px solid rgba(240,216,144,0.25)',
                    borderRadius: 14, marginBottom: 20,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: 'rgba(212,165,54,0.15)',
                      border: '1px solid rgba(212,165,54,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--gold-400)',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--cream)', marginBottom: 2 }}>Disponibilités en temps réel</div>
                      <div style={{ fontSize: 12, color: 'rgba(250,247,239,0.55)', lineHeight: 1.5 }}>Sélectionnez votre créneau directement dans mon agenda Calendly</div>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open('https://calendly.com/norabella1/30min', '_blank')}
                    style={{
                      width: '100%', padding: '14px 20px',
                      background: 'var(--gold-gradient)',
                      color: 'var(--ink-900)', border: '1px solid var(--gold-500)',
                      borderRadius: 100, fontSize: 14, fontWeight: 700,
                      cursor: 'pointer', letterSpacing: '0.03em',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      fontFamily: 'var(--sans)', transition: 'all .25s',
                      boxShadow: 'var(--shadow-gold)',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = ''; (e.currentTarget as HTMLElement).style.transform = ''; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                    Voir mes disponibilités et réserver
                  </button>
                  <p style={{ textAlign: 'center', marginTop: 12, fontSize: 11.5, color: 'rgba(250,247,239,0.4)', letterSpacing: '0.04em' }}>
                    Créneaux mis à jour automatiquement · Confirmation instantanée
                  </p>
                </div>
              </div>

              <ExpertComptableCard />

              <div style={{ background: 'var(--white)', border: '1px solid rgba(138,102,20,0.12)', borderRadius: 20, padding: 28 }}>
                <blockquote style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--ink-700)', lineHeight: 1.6, marginBottom: 16 }}>
                  « Chaque entrepreneur mérite une comptabilité sereine. Mon rôle, c'est de vous rendre du temps et de la clarté. »
                </blockquote>
                <cite style={{ display: 'block', fontSize: 12, color: 'var(--gray-600)', fontStyle: 'normal', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Noria Osman
                  <span style={{ display: 'block', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 11, color: 'var(--gold-600)', marginTop: 3, letterSpacing: '0.02em', textTransform: 'none', fontWeight: 500 }}>Fondatrice · ELAYNOR Consulting</span>
                </cite>
              </div>
            </div>
          </div>
        </div>
      </SectionCream>
    </div>
  );
}
