import type { Page } from '../App';
import { CircuitBg } from './CircuitBg';
import { Eyebrow } from './ui/Eyebrow';
import { SectionCream, SectionPaper } from './ui/Sections';
import { useIsMobile } from '../hooks/useIsMobile';

interface TarifsPageProps {
  showPage: (page: Page) => void;
}

const plans = [
  {
    name: 'Essentiel',
    price: '35€/h',
    desc: 'Micro-entreprise, EI, Profession Libérale',
    who: 'Entrepreneur ayant besoin une aide pour les papiers et une organisation admninistrative',
    button: 'Choisir Essentiel →',
    features: [
      'Classement, scan, transmission EC',
      "Facturation à l'heure, sans engagement",
      'Idéal pour besoins ponctuels',
    ],
    featured: false,
  },
  {
    name: 'Pilotage',
    price: '80€/mois',
    desc: 'Micro-entreprise, EI, Profession Libérale, TPE',
    who: 'Structure TPE qui veut comprendre son activité avec un premier niveau de suivi',
    button: 'Choisir Pilotage →',
    features: [
      'Essentiel inclus',
      'Tableau de bord mensuel simple',
      '1 point de 30min pour analyser vos chiffres',
    ],
    featured: false,
  },
  {
    name: 'Sérénité',
    price: '150€/mois',
    desc: 'Tout Type Société TPE, PME',
    who: 'Structure qui veut tout déléguer davantage la gestion administrative et comptable',
    button: 'Choisir Sérénité →',
    features: [
      'Tout Pilotage inclus',
      'Saisie comptable',
      'Suivi TVA',
      'Préparation déclarations',
      'Alertes échéances',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    price: '250€/mois',
    desc: 'Tout Type Société, PME',
    who: 'PME avec volume plus conséquent et besoins plus complets',
    button: 'Choisir Premium →',
    features: [
      'Tout Sérénité inclus',
      'Révision comptable',
      'Préparation liasse',
      'Tableaux de bord avancés',
      'Paie',
    ],
    featured: false,
  },
  {
    name: 'Mission',
    price: '350€/jour',
    desc: 'Tout Type Société, PME',
    who: 'PME ou structure ayant un besoin ponctuel technique, en one-shot',
    button: 'Choisir Mission →',
    features: [
      'Clôture',
      'Révision',
      'Liasse',
      'Mission technique ponctuelle',
    ],
    featured: false,
  },
];

interface Plan {
  name: string;
  price: string;
  desc: string;
  who: string;
  button: string;
  features: string[];
  featured: boolean;
}

function PlanCard({ plan, showPage }: { plan: Plan; showPage: (page: Page) => void }) {
  return (
    <article style={{
      position: 'relative',
      background: plan.featured ? 'var(--ink-gradient)' : 'var(--white)',
      color: plan.featured ? 'var(--cream)' : 'var(--gray-900)',
      border: plan.featured ? '1px solid var(--gold-500)' : '1px solid rgba(138,102,20,0.14)',
      borderRadius: 20, padding: '32px 28px',
      display: 'flex', flexDirection: 'column',
      boxShadow: plan.featured ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transition: 'all .3s ease', overflow: 'hidden',
    }}>
      {plan.featured && (
        <span style={{
          position: 'absolute', top: 16, right: 16,
          fontSize: 9, fontFamily: 'var(--sans)', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          background: 'var(--gold-gradient)', color: 'var(--ink-900)',
          padding: '4px 12px', borderRadius: 100, whiteSpace: 'nowrap',
        }}>
          Le plus populaire
        </span>
      )}
      <h3 style={{
        fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, marginBottom: 6,
        letterSpacing: '-0.01em',
        color: plan.featured ? 'var(--gold-400)' : 'var(--ink-800)',
        paddingRight: plan.featured ? 120 : 0,
      }}>
        {plan.name}
      </h3>
      <p style={{ fontSize: 13, color: plan.featured ? 'rgba(250,247,239,0.68)' : 'var(--gray-600)', marginBottom: 20, minHeight: 36, lineHeight: 1.6 }}>
        {plan.desc}
      </p>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em', color: plan.featured ? 'var(--gold-300)' : 'var(--gold-700)', marginBottom: 4 }}>
        {plan.price}
      </div>
      <button
        onClick={() => showPage('contact')}
        style={{
          width: '100%', marginTop: 20, padding: '13px 20px',
          fontWeight: 600, fontSize: 13.5, borderRadius: 100,
          border: plan.featured ? '1px solid var(--gold-500)' : '1px solid var(--ink-800)',
          background: plan.featured ? 'var(--gold-gradient)' : 'transparent',
          color: plan.featured ? 'var(--ink-900)' : 'var(--ink-800)',
          cursor: 'pointer', transition: 'all .25s', fontFamily: 'var(--sans)',
        }}
      >
        {plan.button}
      </button>
      <div style={{ margin: '24px 0 18px', height: 1, background: plan.featured ? 'rgba(240,216,144,0.2)' : 'rgba(138,102,20,0.15)' }} />
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, margin: 0, padding: 0 }}>
        {plan.features.map((feature) => (
          <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, lineHeight: 1.5, color: plan.featured ? 'rgba(250,247,239,0.82)' : 'var(--gray-700)' }}>
            <span style={{ color: plan.featured ? 'var(--gold-400)' : 'var(--gold-600)', fontWeight: 700, flexShrink: 0 }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 'auto', paddingTop: 18, fontSize: 13, color: plan.featured ? 'rgba(250,247,239,0.6)' : 'var(--gray-600)', fontStyle: 'italic', lineHeight: 1.55 }}>
        {plan.who}
      </div>
    </article>
  );
}

const ponctuel = [
  {
    letter: 'A', title: 'E-Facture 2026', price: '39€/mois',
    desc: 'Mise en conformité, paramétrage plateforme partenaire, formation aux nouveaux flux. Sur devis pour les grands volumes.',
    badge: 'Nouveau',
  },
  {
    letter: 'B', title: 'Rattrapage comptable', price: 'À partir de 800€ HT',
    desc: "Remise à niveau d'une comptabilité en retard : tri, classement et mise en ordre de plusieurs mois (ou années) de pièces.",
    badge: null,
  },
  {
    letter: 'C', title: 'Audit organisationnel', price: '550€ HT forfait',
    desc: "Diagnostic complet de votre organisation actuelle, avec plan d'action priorisé et quick-wins identifiés sous 15 jours.",
    badge: null,
  },
];

export default function TarifsPage({ showPage }: TarifsPageProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);

  const planCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';
  const row2Cols = isMobile ? '1fr' : 'repeat(2, 1fr)';
  const ponctuelCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';

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
          <Eyebrow light center>Tarifs</Eyebrow>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: isMobile ? 'clamp(36px, 8vw, 52px)' : 'clamp(44px, 5.6vw, 72px)', color: 'var(--cream)', margin: '20px auto 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Des formules <em style={{ fontStyle: 'italic', fontWeight: 400, background: 'linear-gradient(100deg, var(--gold-300), var(--gold-500), var(--gold-300))', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 6s linear infinite' }}>limpides</em>.<br />Zéro surprise.
          </h1>
          <p style={{ fontSize: isMobile ? 14.5 : 17.5, color: 'rgba(250,247,239,0.78)', lineHeight: 1.7, margin: '0 auto', maxWidth: 620 }}>
            Du classement ponctuel au suivi mensuel complet — choisissez ce qui correspond à votre activité. Résiliable à tout moment.
          </p>
        </div>
      </section>

      <SectionCream>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 48, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
            <Eyebrow center>La grille complète de l'offre</Eyebrow>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: isMobile ? 'clamp(26px, 5vw, 34px)' : 'clamp(28px, 3vw, 44px)', color: 'var(--ink-800)', margin: '18px 0 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Cinq niveaux d'accompagnement.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: planCols, gap: isMobile ? 14 : 24 }}>
              {plans.slice(0, 3).map((plan) => (
                <PlanCard key={plan.name} plan={plan} showPage={showPage} />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: row2Cols, gap: isMobile ? 14 : 24, maxWidth: isMobile ? '100%' : 'calc(66.66% + 16px)', margin: '0 auto', width: '100%' }}>
              {plans.slice(3).map((plan) => (
                <PlanCard key={plan.name} plan={plan} showPage={showPage} />
              ))}
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: 32, color: 'var(--gray-600)', fontSize: 13 }}>
            Tous les prix en euros HT · TVA non applicable, article 293 B du CGI · Paiement mensuel par virement
          </p>
        </div>
      </SectionCream>

      <SectionPaper>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 56, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
            <Eyebrow center>Prestations ponctuelles</Eyebrow>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: isMobile ? 'clamp(28px, 6vw, 36px)' : 'clamp(34px, 3.8vw, 52px)', color: 'var(--ink-800)', margin: '18px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Sur devis, à la <em style={{ fontStyle: 'italic', fontWeight: 400 }}>carte</em>.
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16.5, color: 'var(--gray-600)', lineHeight: 1.7 }}>Besoin d'une intervention one-shot plutôt que d'un forfait ? Ces prestations se règlent au résultat.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: ponctuelCols, gap: isMobile ? 14 : 24 }}>
            {ponctuel.map(item => (
              <div key={item.letter} style={{
                position: 'relative', background: 'var(--white)',
                border: '1px solid rgba(138,102,20,0.14)', borderRadius: 20, padding: isMobile ? '24px 20px' : '36px 32px',
                transition: 'all .35s ease', overflow: 'hidden',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; }}
              >
                {item.badge && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: 'var(--gold-gradient)', color: 'var(--ink-900)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100 }}>
                    {item.badge}
                  </div>
                )}
                <span style={{ position: 'absolute', top: 20, left: 24, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--gold-500)', opacity: 0.5 }}>{item.letter}</span>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: 'linear-gradient(135deg, rgba(13,143,133,0.08), rgba(13,143,133,0.02))', border: '1px solid rgba(13,143,133,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-600)', marginBottom: 18 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 18 : 22, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em', color: 'var(--ink-800)' }}>{item.title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 14 }}>{item.desc}</p>
                <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 18 : 22, color: 'var(--gold-600)', fontWeight: 600 }}>{item.price}</div>
              </div>
            ))}
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
                Pas sûre de la formule <em style={{ fontStyle: 'italic', background: 'var(--gold-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>qui vous convient ?</em>
              </h2>
              <p style={{ color: 'rgba(250,247,239,0.75)', fontSize: isMobile ? 14.5 : 16, maxWidth: 540, margin: '0 auto 28px', lineHeight: 1.7 }}>
                Un appel de 20 minutes suffit pour clarifier votre besoin et vous orienter vers la bonne formule. Sans engagement.
              </p>
              <button onClick={() => window.open('https://calendly.com/norabella1/30min', '_blank')} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 26px', fontSize: 14, fontWeight: 600,
                borderRadius: 100, border: '1px solid var(--gold-500)',
                cursor: 'pointer', background: 'var(--gold-gradient)',
                color: 'var(--ink-900)', boxShadow: 'var(--shadow-gold)',
                fontFamily: 'var(--sans)', transition: 'all .25s ease',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                Appel découverte gratuit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
