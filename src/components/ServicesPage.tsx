import type { Page } from '../App';
import { CircuitBg } from './CircuitBg';
import { Eyebrow } from './ui/Eyebrow';
import { SectionCream, SectionPaper } from './ui/Sections';
import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

interface ServicesPageProps {
  showPage: (page: Page) => void;
}

const services = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    title: 'Organisation & Classement',
    desc: 'Tri, scan, numérisation et transmission de vos pièces. Votre dossier toujours prêt pour votre expert-comptable.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 10l3 3 4-4 3 3"/></svg>,
    title: 'Préparation Comptable',
    desc: 'Saisie des achats/ventes, rapprochements bancaires, suivi des encaissements sur CEGID, Sage, Pennylane, Quadra.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16V8"/><path d="M11 16V12"/><path d="M15 16V10"/><path d="M19 16V6"/></svg>,
    title: 'Tableaux de Bord',
    desc: 'Reporting simple et visuel pour suivre CA, charges et trésorerie. Excel, Power BI, ou outil de votre choix.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    title: 'Paie & Charges Sociales',
    desc: 'Préparation des éléments de paie et coordination avec votre prestataire. SILAE, ADP.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>,
    title: 'Facture Électronique 2026',
    desc: 'Mise en conformité anticipée avec la réforme obligatoire. Chorus Pro, Pennylane.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Accompagnement Sur Mesure',
    desc: 'Mission ponctuelle ou forfait mensuel. Télétravail ou sur site. Var (83) et toute la région PACA.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>,
    title: 'Collecte & Archivage',
    desc: 'Archivage numérique sécurisé et horodaté. Transmission mensuelle à votre expert-comptable. Dossier toujours accessible.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: 'Conformité & Échéances',
    desc: "Suivi des échéances fiscales et sociales. Alertes proactives. Aucune déclaration oubliée, aucun retard.",
  },
];

const doList = [
  'Collecte, tri et scan des pièces comptables',
  'Archivage numérique sécurisé & horodaté',
  'Saisie comptable (achats, ventes, banques)',
  'Rapprochements bancaires',
  'Tableaux de bord CA, charges, trésorerie',
  'Préparation des éléments de paie',
  'Suivi des échéances fiscales & sociales',
  'Préparation à la facture électronique 2026',
  'Accompagnement sur site ou en télétravail (Var 83 / PACA)',
];

const dontList = [
  'Établissement des comptes annuels (bilan, compte de résultat)',
  'Dépôt des liasses fiscales (2065, 2033…)',
  'Révision comptable certifiée',
  'Conseil juridique ou fiscal complexe',
  'Audit légal, commissariat aux comptes',
];

const faqs = [
  { q: 'Puis-je garder mon expert-comptable actuel ?', a: "Bien sûr — c'est même le cas le plus courant. Je travaille en amont, il travaille en aval. Je m'adapte à ses outils et à ses formats de transmission pour que la collaboration soit fluide." },
  { q: 'Intervenez-vous en présentiel ou à distance ?', a: "Les deux. 100% télétravail pour les clients hors région, mix présentiel/distance pour la région Six-Fours / Toulon / La Seyne / Sanary et toute la PACA." },
  { q: "Quels sont les délais d'engagement ?", a: "Aucun engagement longue durée. Les forfaits sont mensuels, résiliables avec un préavis d'un mois. Je mise sur la qualité de la relation — pas sur des contrats qui enferment." },
  { q: 'Comment sont sécurisés mes documents ?', a: "Archivage sur serveur européen RGPD, double sauvegarde, chiffrement des transmissions, accès par authentification à deux facteurs. La confidentialité est contractuelle et technique." },
  { q: 'Êtes-vous prête pour la facture électronique 2026 ?', a: "Oui — et j'accompagne déjà mes clients dans la transition. Choix de la plateforme partenaire, paramétrage, formation aux nouveaux flux : tout est inclus dans les forfaits." },
  { q: 'Puis-je changer de formule à tout moment ?', a: "Oui, vous pouvez adapter votre formule à tout moment selon l'évolution de vos besoins. Pas d'engagement minimum imposé." },
  { q: 'Quels logiciels comptables maîtrisez-vous ?', a: "CEGID, Sage 30, Pennylane, Quadra, SILAE (paie), Excel, Power BI. Je m'adapte à vos outils existants." },
];

export default function ServicesPage({ showPage }: ServicesPageProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);
  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';

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
          <Eyebrow light center>Mes services</Eyebrow>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: isMobile ? 'clamp(36px, 8vw, 52px)' : 'clamp(44px, 5.6vw, 72px)', color: 'var(--cream)', margin: '20px auto 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Un <em style={{ fontStyle: 'italic', fontWeight: 400, background: 'linear-gradient(100deg, var(--gold-300), var(--gold-500), var(--gold-300))', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 6s linear infinite' }}>périmètre clair</em>,<br />pas de zones grises.
          </h1>
          <p style={{ fontSize: isMobile ? 14.5 : 17.5, color: 'rgba(250,247,239,0.78)', lineHeight: 1.7, margin: '0 auto', maxWidth: 620 }}>
            ELAYNOR Consulting intervient sur l'organisation et la préparation comptable. Je travaille en complément de votre expert-comptable — jamais à sa place.
          </p>
        </div>
      </section>

      <SectionCream>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 48, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
            <Eyebrow center>Prestations</Eyebrow>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: isMobile ? 'clamp(28px, 6vw, 36px)' : 'clamp(34px, 3.8vw, 52px)', color: 'var(--ink-800)', margin: '18px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              8 services pour <em style={{ fontStyle: 'italic', fontWeight: 400 }}>tout couvrir</em>.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 14 : 20, marginBottom: isMobile ? 36 : 64 }}>
            {services.map(svc => (
              <ServiceCard key={svc.title} {...svc} />
            ))}
          </div>

          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 16,
            padding: isMobile ? '20px 18px' : '28px 32px',
            background: 'var(--gold-100)',
            borderLeft: '3px solid var(--gold-500)',
            borderRadius: 12, marginBottom: isMobile ? 32 : 56,
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24, color: 'var(--gold-700)', flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
            <div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 17 : 20, fontWeight: 600, color: 'var(--ink-800)', marginBottom: 6 }}>Un positionnement transparent</h3>
              <p style={{ color: 'var(--gray-700)', fontSize: isMobile ? 13.5 : 14.5, lineHeight: 1.65 }}>
                Je ne suis pas expert-comptable diplômée. Je ne produis donc pas de comptes annuels, ni de liasses fiscales. Je m'occupe de tout ce qui est <strong>en amont</strong> : organisation, collecte, préparation — pour que votre EC reçoive un dossier impeccable.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 14 : 24 }}>
            <div style={{ background: 'var(--white)', border: '1px solid rgba(138,102,20,0.12)', borderTop: '3px solid var(--teal-500)', borderRadius: 20, padding: isMobile ? 24 : 36 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 18 : 22, fontWeight: 600, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--teal-600)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Ce que je fais
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {doList.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--gray-700)', lineHeight: 1.55 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, color: 'var(--teal-500)', flexShrink: 0, marginTop: 2 }}><path d="M20 6 9 17l-5-5"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#fbf5f4', border: '1px solid rgba(138,102,20,0.12)', borderTop: '3px solid #c64a3a', borderRadius: 20, padding: isMobile ? 24 : 36 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 18 : 22, fontWeight: 600, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10, color: '#a03a2c' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                Ce que je ne fais pas
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {dontList.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--gray-700)', lineHeight: 1.55 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, color: '#c64a3a', flexShrink: 0, marginTop: 2 }}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    {item}
                  </li>
                ))}
                <li style={{ color: 'var(--gray-600)', fontStyle: 'italic', marginTop: 8, borderTop: '1px dashed rgba(138,102,20,0.2)', paddingTop: 12, fontSize: 13 }}>
                  → Toutes ces missions restent du ressort de votre expert-comptable diplômé.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionCream>

      <SectionPaper>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 72, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
            <Eyebrow center>Questions fréquentes</Eyebrow>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: isMobile ? 'clamp(28px, 6vw, 36px)' : 'clamp(34px, 3.8vw, 52px)', color: 'var(--ink-800)', margin: '18px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Tout ce que vous vous <em style={{ fontStyle: 'italic', fontWeight: 400 }}>demandez</em>.
            </h2>
          </div>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {faqs.map(faq => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </SectionPaper>

      <section style={{ padding: isMobile ? '0 5% 60px' : '0 32px 100px', background: 'var(--cream)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{
            position: 'relative', background: 'var(--ink-gradient)', borderRadius: isMobile ? 16 : 24,
            padding: isMobile ? '44px 24px' : '80px 60px', textAlign: 'center', overflow: 'hidden',
            border: '1px solid rgba(240,216,144,0.2)',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 30%, rgba(212,165,54,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20,184,166,0.1) 0%, transparent 50%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? '1.7rem' : 'clamp(32px, 3.6vw, 48px)', color: 'var(--cream)', fontWeight: 500, marginBottom: 18 }}>
                Une question sur <em style={{ fontStyle: 'italic', background: 'var(--gold-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>votre</em> situation ?
              </h2>
              <p style={{ color: 'rgba(250,247,239,0.75)', fontSize: isMobile ? 14.5 : 16, maxWidth: 540, margin: '0 auto 28px', lineHeight: 1.7 }}>
                Chaque activité a ses particularités. Parlons-en directement — c'est plus rapide qu'un échange de mails.
              </p>
              <button onClick={() => showPage('contact')} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 26px', fontSize: 14, fontWeight: 600,
                borderRadius: 100, border: '1px solid var(--gold-500)',
                cursor: 'pointer', background: 'var(--gold-gradient)',
                color: 'var(--ink-900)', boxShadow: 'var(--shadow-gold)',
                fontFamily: 'var(--sans)', transition: 'all .25s ease',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.61 5.61l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 15.5v1.42z"/></svg>
                Me contacter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={{ background: 'var(--white)', border: '1px solid rgba(138,102,20,0.12)', borderRadius: 16, padding: '24px 20px', transition: 'all .3s ease' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = 'var(--shadow-md)'; el.style.borderColor = 'rgba(212,165,54,0.3)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(138,102,20,0.12)'; }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 16, background: 'rgba(13,143,133,0.08)', border: '1px solid rgba(13,143,133,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-600)' }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 600, color: 'var(--ink-800)', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: 'var(--gray-600)', lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(138,102,20,0.15)', padding: '18px 0' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 0', fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 600,
        color: 'var(--ink-800)', cursor: 'pointer', letterSpacing: '-0.005em', gap: 16,
      }}>
        <span>{q}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ width: 20, height: 20, color: 'var(--gold-500)', flexShrink: 0, transition: 'transform .3s', transform: open ? 'rotate(45deg)' : 'none' }}>
          <path d="M5 12h14"/><path d="M12 5v14"/>
        </svg>
      </button>
      {open && (
        <div style={{ paddingTop: 12, fontSize: 14.5, color: 'var(--gray-600)', lineHeight: 1.7 }}>{a}</div>
      )}
    </div>
  );
}
