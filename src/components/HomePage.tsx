import type { Page } from '../App';
import { CircuitBg } from './CircuitBg';
import { Eyebrow } from './ui/Eyebrow';
import { SectionInk, SectionCream, SectionPaper } from './ui/Sections';
import { useIsMobile } from '../hooks/useIsMobile';

interface HomePageProps {
  showPage: (page: Page) => void;
}

export default function HomePage({ showPage }: HomePageProps) {
  return (
    <div style={{ animation: 'fadePage .5s ease' }}>
      <HeroSection showPage={showPage} />
      <TrustBar />
      <StatsSection />
      <ServicesApercu showPage={showPage} />
      <AboutSection />
      <TimelineSection />
      <ProcessSection />
      <ComparativeSection />
      <TestimonialsSection />
      <CtaBand showPage={showPage} />
    </div>
  );
}

function HeroSection({ showPage }: { showPage: (page: Page) => void }) {
  const isMobile = useIsMobile();
  return (
    <section style={{
      position: 'relative',
      padding: isMobile ? '120px 5% 80px' : '180px 32px 120px',
      background: 'var(--ink-gradient)',
      color: 'var(--cream)',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', background: 'radial-gradient(circle at 80% 30%, rgba(212,165,54,0.14) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '60%', height: '100%', background: 'radial-gradient(circle at 20% 70%, rgba(20,184,166,0.10) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <CircuitBg />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow light center>CABINET ADMINISTRATIF & COMPTABLE · Six-Fours-les-Plages</Eyebrow>
        <h1 style={{
          fontFamily: 'var(--serif)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.18,
          fontSize: isMobile ? 'clamp(36px, 9vw, 52px)' : 'clamp(52px, 7.5vw, 100px)',
          color: 'var(--cream)', margin: isMobile ? '24px 0 0' : '36px 0 0',
        }}>
          <span style={{ display: 'block', marginBottom: '0.12em' }}>
            Reprenez{' '}
            <span style={{ color: '#D4AF37', fontStyle: 'italic', fontWeight: 400 }}>le contrôle</span>
          </span>
          <span style={{ display: 'block' }}>de votre comptabilité.</span>
        </h1>
        <p style={{
          fontSize: isMobile ? 15 : 19, color: 'rgba(250,247,239,0.90)', fontWeight: 400,
          lineHeight: 1.9, maxWidth: 780, margin: isMobile ? '28px auto 36px' : '48px auto 60px',
        }}>
          <strong style={{ color: '#fff', fontWeight: 600 }}>17 ans d'expérience</strong> chez KPMG, Grant Thornton, Amarris.<br />
          J'analyse, je structure et je pilote votre comptabilité pour vous apporter plus de clarté, plus de maîtrise, en temps et en sérénité.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
          <GoldBtn onClick={() => window.open('https://calendly.com/norabella1/30min', '_blank')} fullWidth={isMobile}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            Appel découverte · 30 min
          </GoldBtn>
          <GhostBtn onClick={() => showPage('services')} fullWidth={isMobile}>
            Découvrir l'accompagnement
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </GhostBtn>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const isMobile = useIsMobile();
  return (
    <div style={{
      background: 'var(--ink-900)', padding: isMobile ? '20px 5%' : '26px 32px',
      borderTop: '1px solid rgba(240,216,144,0.15)', borderBottom: '1px solid rgba(240,216,144,0.15)',
      position: 'relative', zIndex: 2,
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 16 : 32, flexWrap: 'wrap',
        textAlign: isMobile ? 'center' : 'left',
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--gold-400)' }}>Expertise forgée chez</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 20 : 44, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['KPMG', 'Grant Thornton', 'Amarris Direct', 'Sercca', 'Master CCA · INTEC'].map(brand => (
            <span key={brand} style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 15 : 20, fontWeight: 700, letterSpacing: '0.07em', color: '#D4AF37', opacity: 0.88 }}>
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      background: 'var(--cream)', padding: isMobile ? '48px 5%' : '70px 32px',
      borderBottom: '1px solid rgba(138,102,20,0.12)', position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: isMobile ? 24 : 40,
      }}>
        {[
          { num: '17', label: "Ans d'expertise" },
          { num: '4', label: 'Grands cabinets' },
          { num: 'Bac+5', label: 'Master CCA · INTEC' },
          { num: '100%', label: 'Télétravail possible' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--serif)', fontWeight: 500,
              fontSize: isMobile ? 44 : 60, lineHeight: 1,
              background: 'var(--gold-gradient)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em',
            }}>{stat.num}</div>
            <div style={{ fontSize: isMobile ? 10 : 12, fontWeight: 600, color: 'var(--gray-600)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 12 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesApercu({ showPage }: { showPage: (page: Page) => void }) {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);

  const svcs = [
    {
      num: '01', title: 'Collecte & Classement',
      desc: "Tri, scan, archivage et transmission de vos pièces comptables à votre expert-comptable. Vos documents toujours prêts, horodatés, accessibles en un clic.",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>,
    },
    {
      num: '02', title: 'Tableaux de Bord',
      desc: "Visualisez votre activité en temps réel. CA, charges, trésorerie, marge — des indicateurs simples, fiables, pour piloter sans attendre le bilan annuel.",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16V8"/><path d="M11 16V12"/><path d="M15 16V10"/><path d="M19 16V6"/></svg>,
    },
    {
      num: '03', title: 'Conformité & Sécurité',
      desc: "Suivi des échéances fiscales et sociales. Préparation à la réforme de la facture électronique 2026. Aucune déclaration oubliée, aucun retard.",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    },
  ];

  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';

  return (
    <SectionInk>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 72, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
          <Eyebrow light center>Mes services</Eyebrow>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.8vw, 52px)', color: 'var(--cream)', margin: '18px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Trois piliers pour<br /><em style={{ fontStyle: 'italic', color:'#D4AF37', fontWeight: 400 }}>structurer</em> votre gestion.
          </h2>
          <p style={{ fontSize: isMobile ? 14.5 : 16.5, color: 'rgba(250,247,239,0.7)', lineHeight: 1.7 }}>
            Je prends en charge tout l'amont comptable — collecte, préparation, pilotage — pour que votre expert-comptable reçoive un dossier propre et que vous gagniez en clarté.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 16 : 36 }}>
          {svcs.map(svc => (
            <SvcCard key={svc.num} {...svc} dark />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button onClick={() => showPage('services')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '15px 28px', fontSize: 14.5, fontWeight: 600,
            borderRadius: 100, border: '1px solid rgba(250,247,239,0.3)',
            cursor: 'pointer', background: 'transparent', color: 'var(--cream)',
            fontFamily: 'var(--sans)', transition: 'all .25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-400)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold-400)'; (e.currentTarget as HTMLElement).style.background = 'rgba(212,165,54,0.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,247,239,0.3)'; (e.currentTarget as HTMLElement).style.color = 'var(--cream)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
            Voir tous les services
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </SectionInk>
  );
}

function AboutSection() {
  const isMobile = useIsMobile();
  const checks = [
    "Gain de temps sur l'administratif", "Transmission simplifiée à votre EC",
    "Tableaux de bord mensuels", "Conformité 2026 anticipée",
    "Télétravail & présentiel", "Interlocutrice unique",
  ];

  return (
    <SectionCream>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr',
          gap: isMobile ? 40 : 80, alignItems: 'center',
        }}>
          {/* Photo */}
          <div style={{ maxWidth: isMobile ? 320 : 440, margin: isMobile ? '0 auto' : undefined }}>
            <div style={{
              position: 'relative', borderRadius: 12, overflow: 'hidden',
              background: '#C9A84C',
              boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(240,216,144,0.45)',
              maxHeight: isMobile ? 360 : 520,
            }}>
              <img src="/photto.png" alt="Noria Osman" style={{ width: '100%', objectFit: 'contain', objectPosition: 'center bottom', display: 'block', maxHeight: isMobile ? 360 : 520 }} />
            </div>
          </div>

          <div>
            <Eyebrow>La fondatrice</Eyebrow>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: isMobile ? 'clamp(28px, 6vw, 36px)' : 'clamp(34px, 3.6vw, 48px)', color: 'var(--ink-800)', margin: '18px 0 24px', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Pourquoi choisir<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>ELAYNOR Consulting</em> ?
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color: 'var(--gray-700)', lineHeight: 1.75, marginBottom: 18 }}>
              Fondatrice d'ELAYNOR Consulting, je suis <strong style={{ color: 'var(--ink-800)', fontWeight: 600 }}>Noria Osman</strong> — comptable senior avec 17 ans d'expérience acquise au sein de grands cabinets : <strong style={{ color: 'var(--ink-800)', fontWeight: 600 }}>KPMG, Grant Thornton, Amarris Direct, Sercca</strong>.
            </p>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color: 'var(--gray-700)', lineHeight: 1.75, marginBottom: 18 }}>
              Titulaire d'un <strong style={{ color: 'var(--ink-800)', fontWeight: 600 }}>Master CCA (CNAM INTEC, 2024)</strong>, j'accompagne les TPE, artisans, professions libérales et indépendants avec un regard senior — sans les tarifs d'un grand cabinet.
            </p>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '10px 24px' : '14px 24px', marginTop: 32 }}>
              {checks.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.5 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, width: 20, height: 20, color: 'var(--teal-600)', marginTop: 1 }}><path d="M20 6 9 17l-5-5"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 36, paddingTop: 28, borderTop: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 26, color: 'var(--gold-700)', letterSpacing: '0.01em' }}>Noria Osman</span>
              <div>
                <div style={{ fontSize: 13, color: 'var(--gray-600)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Fondatrice</div>
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 11, color: 'var(--gold-600)', marginTop: 4 }}>Comptable senior · Master CCA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionCream>
  );
}

function TimelineSection() {
  const isMobile = useIsMobile();
  const items = [
    { label: 'Big Four', brand: 'KPMG', current: false },
    { label: 'Top 10 Mondial', brand: 'Grant Thornton', current: false },
    { label: 'Groupe Indépendant', brand: 'Amarris Direct', current: false },
    { label: 'Cabinet Régional', brand: 'Sercca', current: false },
    { label: 'Fondatrice', brand: 'ELAYNOR', current: true },
  ];

  return (
    <SectionInk>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 72, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
          <Eyebrow light center>Un parcours</Eyebrow>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.8vw, 52px)', color: 'var(--cream)', margin: '18px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Dix-sept ans <em style={{ fontStyle: 'italic', color:'#D4AF37', fontWeight: 400 }}>forgés</em> dans les grandes maisons.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: isMobile ? 16 : 20 }}>
          {items.map(item => (
            <div key={item.brand} style={{ textAlign: 'center', padding: isMobile ? '16px 8px' : '12px 8px', background: 'rgba(250,247,239,0.04)', borderRadius: 12, border: '1px solid rgba(240,216,144,0.15)' }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%', margin: '0 auto 12px',
                background: item.current ? 'var(--gold-500)' : 'var(--ink-800)',
                border: '2px solid var(--gold-500)',
                animation: item.current ? 'livePulse 2s ease-in-out infinite' : undefined,
              }} />
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-500)', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 15 : 20, fontWeight: 600, color: item.current ? 'var(--gold-400)' : 'var(--cream)', letterSpacing: '0.02em' }}>{item.brand}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionInk>
  );
}

function ProcessSection() {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);
  const steps = [
    { num: '01', title: 'Appel découverte', desc: "On échange 20 minutes pour comprendre votre activité, vos contraintes et identifier les leviers prioritaires.", duration: '20 min · gratuit' },
    { num: '02', title: 'Audit & proposition', desc: "Diagnostic rapide de votre organisation actuelle, puis proposition d'une formule adaptée à vos besoins réels.", duration: 'Sous 72h' },
    { num: '03', title: 'Mise en place', desc: "Structuration des process, mise à jour de l'archivage, connexion avec votre expert-comptable si besoin.", duration: 'Semaine 1 & 2' },
    { num: '04', title: 'Suivi mensuel', desc: "Collecte régulière, tableaux de bord livrés chaque mois, point téléphonique et alertes échéances.", duration: 'Récurrent' },
  ];

  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)';

  return (
    <SectionPaper>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 72, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
          <Eyebrow center>La méthode</Eyebrow>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.8vw, 52px)', color: 'var(--ink-800)', margin: '18px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Un accompagnement en <em style={{ fontStyle: 'italic', fontWeight: 400 }}>quatre temps</em>.
          </h2>
          <p style={{ fontSize: isMobile ? 14.5 : 16.5, color: 'var(--gray-600)', lineHeight: 1.7 }}>De notre premier échange à la gestion mensuelle sereine : un processus simple, balisé, sans surprises.</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: cols,
          background: 'var(--white)', borderRadius: 20,
          border: '1px solid rgba(138,102,20,0.12)', boxShadow: 'var(--shadow-sm)',
        }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{
              padding: isMobile ? '28px 20px' : '40px 28px',
              borderRight: !isMobile && !isTablet && i < steps.length - 1 ? '1px solid rgba(138,102,20,0.15)' : 'none',
              borderBottom: (isMobile || isTablet) && i < steps.length - 1 ? '1px solid rgba(138,102,20,0.15)' : 'none',
            }}>
              <span style={{
                fontFamily: 'var(--serif)', fontSize: isMobile ? 44 : 64, fontWeight: 500, lineHeight: 1,
                background: 'var(--gold-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent', marginBottom: 16, display: 'block', letterSpacing: '-0.03em',
              }}>{step.num}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 18 : 22, fontWeight: 600, color: 'var(--ink-800)', marginBottom: 10, letterSpacing: '-0.01em' }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.65 }}>{step.desc}</p>
              <span style={{ display: 'inline-block', marginTop: 14, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-600)', padding: '4px 10px', background: 'rgba(13,143,133,0.08)', borderRadius: 100 }}>{step.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionPaper>
  );
}

function ComparativeSection() {
  const isMobile = useIsMobile();
  const rows = [
    { criteria: 'Interlocuteur', us: 'Noria, toujours la même personne', them: 'Collaborateurs multiples, turn-over' },
    { criteria: 'Réactivité', us: 'Réponse sous 24h, WhatsApp direct', them: 'Email standard, délai variable' },
    { criteria: 'Suivi mensuel', us: 'Tableau de bord visuel chaque mois', them: 'Souvent bilan annuel uniquement' },
    { criteria: 'Tarif', us: 'Forfait clair dès 150€ HT / mois', them: 'Tarification horaire, suppléments' },
    { criteria: 'Organisation amont', us: 'Cœur de métier : tri, scan, classement', them: "À votre charge ou facturé à l'heure" },
  ];

  return (
    <SectionCream>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 72, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
          <Eyebrow center>En bref</Eyebrow>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.8vw, 52px)', color: 'var(--ink-800)', margin: '18px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            ELAYNOR vs cabinet <em style={{ fontStyle: 'italic', fontWeight: 400 }}>traditionnel</em>.
          </h2>
          <p style={{ fontSize: isMobile ? 14.5 : 16.5, color: 'var(--gray-600)', lineHeight: 1.7 }}>Deux modèles complémentaires. ELAYNOR ne remplace pas votre expert-comptable — elle prépare le terrain pour qu'il travaille mieux, plus vite, pour moins cher.</p>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: 20, boxShadow: 'var(--shadow-md)' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto', background: 'var(--white)', border: '1px solid rgba(138,102,20,0.14)', borderRadius: 20, overflow: 'hidden', minWidth: 520 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', background: 'var(--paper)', borderBottom: '1px solid rgba(138,102,20,0.14)' }}>
              <div style={{ padding: '20px 20px' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gray-600)' }}>Critère</span></div>
              <div style={{ padding: '20px 20px', textAlign: 'center', background: 'var(--ink-gradient)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-300)', marginBottom: 4 }}>Recommandé</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600, color: 'var(--gold-400)' }}>ELAYNOR Consulting</div>
              </div>
              <div style={{ padding: '20px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gray-600)', marginBottom: 4 }}>Alternative</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600, color: 'var(--ink-800)' }}>Cabinet classique</div>
              </div>
            </div>
            {rows.map((row, i) => (
              <div key={row.criteria} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderBottom: i < rows.length - 1 ? '1px solid rgba(138,102,20,0.08)' : 'none' }}>
                <div style={{ padding: '16px 20px', fontFamily: 'var(--serif)', fontWeight: 600, color: 'var(--ink-800)', fontSize: 14, display: 'flex', alignItems: 'center' }}>{row.criteria}</div>
                <div style={{ padding: '16px 20px', background: 'rgba(13,51,40,0.98)', color: 'var(--cream)', fontWeight: 500, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold-400)', flexShrink: 0 }}><path d="M20 6 9 17l-5-5"/></svg>
                  {row.us}
                </div>
                <div style={{ padding: '16px 20px', color: 'var(--gray-600)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gray-400)', flexShrink: 0 }}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  {row.them}
                </div>
              </div>
            ))}
          </div>
        </div>
        {isMobile && <p style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: 'var(--gray-500)', letterSpacing: '0.04em' }}>← Glissez pour voir →</p>}
      </div>
    </SectionCream>
  );
}

function TestimonialsSection() {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);
  const testimonials = [
    { quote: "Noria a mis de l'ordre dans des années de désorganisation. Mon expert-comptable n'en revient pas du niveau des dossiers.", name: 'Julien L.', role: 'Artisan plombier · Toulon', initials: 'JL' },
    { quote: "Le tableau de bord mensuel a changé ma façon de piloter le cabinet. Je vois enfin où je vais avant la fin d'année.", name: 'Sophie V.', role: 'Avocate · Six-Fours', initials: 'SV' },
    { quote: "Interlocutrice unique, réactive, hyper rigoureuse. Le rapport qualité-prix n'est pas comparable à un cabinet classique.", name: 'Marc R.', role: 'Consultant freelance · La Seyne', initials: 'MR' },
  ];

  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';

  return (
    <SectionInk>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 72, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
          <Eyebrow light center>Témoignages</Eyebrow>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.8vw, 52px)', color: 'var(--cream)', margin: '18px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Ce qu'en disent les <em style={{ fontStyle: 'italic', fontWeight: 400 }}>entrepreneurs</em>.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 16 : 24 }}>
          {testimonials.map(t => (
            <article key={t.name} style={{ background: 'rgba(250,247,239,0.04)', border: '1px solid rgba(240,216,144,0.2)', borderRadius: 20, padding: isMobile ? 20 : 32, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -4, left: 20, fontFamily: 'var(--serif)', fontSize: 80, color: 'var(--gold-500)', lineHeight: 1, opacity: 0.4 }}>"</div>
              <div style={{ display: 'flex', gap: 2, color: 'var(--gold-400)', marginBottom: 16, position: 'relative' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <blockquote style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 15 : 17, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.6, marginBottom: 20 }}>
                {t.quote}
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(240,216,144,0.15)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-900)', fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 14, flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--cream)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(250,247,239,0.55)', marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionInk>
  );
}

function CtaBand({ showPage }: { showPage: (page: Page) => void }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '32px 5% 60px' : '40px 32px 100px', background: 'var(--cream)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          position: 'relative', background: 'var(--ink-gradient)',
          borderRadius: isMobile ? 16 : 24, padding: isMobile ? '48px 24px' : '80px 60px',
          textAlign: 'center', overflow: 'hidden', border: '1px solid rgba(240,216,144,0.2)',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 30%, rgba(212,165,54,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20,184,166,0.1) 0%, transparent 50%)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? '1.8rem' : 'clamp(32px, 3.6vw, 48px)', color: 'var(--cream)', fontWeight: 500, marginBottom: 18, letterSpacing: '-0.01em' }}>
              Prêt à simplifier<br />votre gestion <em style={{ fontStyle: 'italic', background: 'var(--gold-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>administrative</em> ?
            </h2>
            <p style={{ color: 'rgba(250,247,239,0.75)', fontSize: isMobile ? 14.5 : 16, maxWidth: 540, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Commencez par un appel découverte gratuit de 20 minutes. Sans engagement — juste une discussion pour voir si on peut travailler ensemble.
            </p>
            <GoldBtn onClick={() => window.open('https://calendly.com/norabella1/30min', '_blank')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              Prendre rendez-vous
            </GoldBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

function SvcCard({ num, title, desc, icon, dark }: { num: string; title: string; desc: string; icon: React.ReactNode; dark?: boolean }) {
  const cardBg = dark ? '#F5EFE0' : 'var(--white)';
  const cardBorder = dark ? '1px solid rgba(138,102,20,0.2)' : '1px solid rgba(138,102,20,0.14)';
  const titleColor = dark ? '#0D3327' : 'var(--ink-800)';
  const textColor = dark ? '#2D5447' : 'var(--gray-600)';
  const numColor = dark ? '#8A6614' : 'var(--gold-500)';

  return (
    <article style={{
      position: 'relative', background: cardBg, border: cardBorder,
      borderRadius: 20, padding: '32px 26px',
      transition: 'all .35s ease', overflow: 'hidden',
      boxShadow: dark ? '0 4px 24px rgba(10,38,32,0.13)' : 'none',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-6px)';
        el.style.borderColor = 'rgba(212,175,55,0.5)';
        el.style.boxShadow = dark ? '0 12px 40px rgba(10,38,32,0.2)' : 'var(--shadow-lg)';
        (el.querySelector('.svc-top-bar') as HTMLElement).style.transform = 'scaleX(1)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = '';
        el.style.borderColor = dark ? 'rgba(138,102,20,0.2)' : 'rgba(138,102,20,0.14)';
        el.style.boxShadow = dark ? '0 4px 24px rgba(10,38,32,0.13)' : 'none';
        (el.querySelector('.svc-top-bar') as HTMLElement).style.transform = 'scaleX(0)';
      }}
    >
      <div className="svc-top-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--gold-gradient)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .5s cubic-bezier(.2,.8,.2,1)' }} />
      <span style={{ position: 'absolute', top: 20, right: 24, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: numColor, opacity: 0.6 }}>{num}</span>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: dark ? 'rgba(212,175,55,0.12)' : 'linear-gradient(135deg, rgba(13,143,133,0.08), rgba(13,143,133,0.02))', border: dark ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(13,143,133,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dark ? '#8A6614' : 'var(--teal-600)', marginBottom: 20 }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em', color: titleColor }}>{title}</h3>
      <p style={{ fontSize: 14, color: textColor, lineHeight: 1.75 }}>{desc}</p>
    </article>
  );
}

function GoldBtn({ onClick, children, fullWidth }: { onClick: () => void; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '15px 28px', fontSize: 14.5, fontWeight: 600,
      borderRadius: 100, border: '1px solid var(--gold-500)',
      cursor: 'pointer', background: 'var(--gold-gradient)',
      color: 'var(--ink-900)', boxShadow: 'var(--shadow-gold)',
      fontFamily: 'var(--sans)', transition: 'all .25s ease', letterSpacing: '0.005em',
      width: fullWidth ? '100%' : 'auto', justifyContent: fullWidth ? 'center' : undefined,
      maxWidth: fullWidth ? 320 : undefined,
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.filter = 'brightness(1.05)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.filter = ''; }}>
      {children}
    </button>
  );
}

function GhostBtn({ onClick, children, fullWidth }: { onClick: () => void; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '15px 28px', fontSize: 14.5, fontWeight: 600,
      borderRadius: 100, border: '1px solid rgba(250,247,239,0.3)',
      cursor: 'pointer', background: 'transparent', color: 'var(--cream)',
      fontFamily: 'var(--sans)', transition: 'all .25s ease',
      width: fullWidth ? '100%' : 'auto', justifyContent: fullWidth ? 'center' : undefined,
      maxWidth: fullWidth ? 320 : undefined,
    }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--gold-400)'; el.style.color = 'var(--gold-400)'; el.style.background = 'rgba(212,165,54,0.08)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(250,247,239,0.3)'; el.style.color = 'var(--cream)'; el.style.background = 'transparent'; }}>
      {children}
    </button>
  );
}
