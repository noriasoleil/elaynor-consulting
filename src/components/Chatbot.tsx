import { useState, useRef, useEffect, useCallback } from 'react';
import TalkingAvatar, { type TalkingAvatarHandle } from './TalkingAvatar';
import { useIsMobile } from '../hooks/useIsMobile';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const CHAT_URL = `${SUPABASE_URL}/functions/v1/elay-chat`;

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const quickBtns = [
  { label: 'Micro / AE', q: "Je suis micro-entrepreneur ou auto-entrepreneur" },
  { label: 'EI classique', q: "J'ai une EI entreprise individuelle" },
  { label: 'EURL / SASU', q: "J'ai une EURL ou une SASU" },
  { label: 'SARL / SAS', q: "J'ai une SARL, SAS ou SA" },
  { label: 'SCI / SCPI', q: "J'ai une SCI, SCPI ou SCP" },
  { label: 'Prof. Liberale', q: "Je suis profession liberale ou j'ai une SEL" },
  { label: 'Association', q: "J'ai une association loi 1901" },
  { label: 'Crypto', q: "Questions fiscalite crypto et actifs numeriques" },
  { label: 'Tarifs ELAYNOR', q: "Je veux connaitre les tarifs ELAYNOR" },
];

function toSpeechText(s: string): string {
  return s
    .replace(/<[^>]+>/g, ' ')        // HTML tags
    .replace(/&amp;/g, 'et')
    .replace(/&nbsp;/g, ' ')
    .replace(/&euro;/g, ' euros')
    .replace(/\*\*/g, '')             // bold markdown
    .replace(/\*/g, '')               // italic markdown
    .replace(/#+ /g, '')              // headings
    .replace(/_{1,2}([^_]+)_{1,2}/g, '$1') // underline/italic markdown
    .replace(/`[^`]*`/g, '')          // inline code
    .replace(/(\d+)\s*€\s*\/\s*h/gi, '$1 euros de l\'heure')
    .replace(/(\d+)\s*€\s*\/\s*mois/gi, '$1 euros par mois')
    .replace(/(\d+)\s*€\s*\/\s*jour/gi, '$1 euros par jour')
    .replace(/(\d+)\s*€\s*\/\s*an/gi, '$1 euros par an')
    .replace(/(\d+)\s*€/g, '$1 euros')
    .replace(/\//g, ' ')              // remaining slashes
    .replace(/[-–—]{2,}/g, ',')       // dashes used as lists
    .replace(/•/g, '')                // bullet points
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [bubble, setBubble] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [structs, setStructs] = useState(true);
  const msgsRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<SpeechRecognition | null>(null);
  const avatarRef = useRef<TalkingAvatarHandle | null>(null);

  const onAvatarReady = useCallback((handle: TalkingAvatarHandle) => {
    avatarRef.current = handle;
  }, []);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs, loading]);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setTimeout(() => {
        const welcome = "Bonjour ! Je suis Elay, votre conseillere ELAYNOR CONSULTING. Comptabilite, fiscalite, paie, logiciels, tarifs... je suis la pour vous orienter. Quel est votre type d'activite ou votre besoin ?";
        setMsgs([{ role: 'assistant', content: welcome }]);
        speak(welcome);
      }, 300);
    }
  }, [open]);

  const AUTO_SPEAK_TEXT = "Bonjour et bienvenue sur le site ELAYNOR Consulting. Je suis votre conseillère administrative et comptable. Avez-vous besoin d'aide ? N'hésitez pas à me poser votre question ou à demander un renseignement.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      setMsgs([{ role: 'assistant', content: AUTO_SPEAK_TEXT }]);
      setTimeout(() => {
        if (avatarRef.current) avatarRef.current.speak(AUTO_SPEAK_TEXT);
      }, 400);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  function speak(text: string) {
    const clean = toSpeechText(text);
    if (avatarRef.current) {
      avatarRef.current.speak(clean);
      return;
    }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (!clean) return;
    const chunks: string[] = [];
    const sentences = clean.split('. ');
    let cur = '';
    for (const s of sentences) {
      if (!s.trim()) continue;
      if ((cur + ' ' + s).length > 160 && cur.length > 0) { chunks.push(cur.trim() + '.'); cur = s; }
      else { cur = cur ? cur + '. ' + s : s; }
    }
    if (cur) chunks.push(cur.trim());
    let idx = 0;
    function next() {
      if (idx >= chunks.length) return;
      const u = new SpeechSynthesisUtterance(chunks[idx]);
      u.lang = 'fr-FR'; u.rate = 0.92; u.pitch = 1.1;
      const vs = window.speechSynthesis.getVoices();
      for (const v of vs) { if (v.lang.startsWith('fr') && !v.name.includes('Thomas')) { u.voice = v; break; } }
      u.onend = () => { idx++; next(); };
      u.onerror = () => { idx++; next(); };
      window.speechSynthesis.speak(u);
    }
    next();
  }

  function showBubbleMsg(t: string) {
    const clean = toSpeechText(t);
    setBubble(clean.length > 60 ? clean.substring(0, 60) + '…' : clean);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 4000);
  }

  async function sendMsg(text?: string) {
    const txt = (text ?? input).trim();
    if (!txt || loading) return;
    setInput('');
    const newMsgs: Msg[] = [...msgs, { role: 'user', content: txt }];
    setMsgs(newMsgs);
    setLoading(true);
    try {
      const r = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await r.json();
      if (data.error) throw new Error(data.error);
      const rep: string = data.reply ?? 'Contactez Noria : contact@elaynor-consulting.fr';

      let html = rep.replace(/\n/g, '<br>');
      while (html.includes('**')) {
        const a = html.indexOf('**'), b = html.indexOf('**', a + 2);
        if (b === -1) { html = html.substring(0, a) + html.substring(a + 2); break; }
        html = html.substring(0, a) + '<strong>' + html.substring(a + 2, b) + '</strong>' + html.substring(b + 2);
      }
      if (newMsgs.length >= 5) {
        html += '<div style="background:linear-gradient(135deg,#0d3328,#1a5c45);border-radius:10px;padding:11px;margin-top:8px"><p style="color:rgba(255,255,255,0.85);font-size:12px;margin:0 0 8px">Appel decouverte gratuit 30 min avec Noria</p><a href="mailto:contact@elaynor-consulting.fr?subject=RDV Elay" style="display:block;background:#d4a536;color:#0d3328;padding:7px;border-radius:8px;font-weight:700;font-size:12px;text-align:center;text-decoration:none">Reserver mon appel gratuit</a></div>';
      }

      setMsgs([...newMsgs, { role: 'assistant', content: html }]);
      speak(html);
      showBubbleMsg(rep);
    } catch (err) {
      const errMsg = String(err).includes('API key') ? 'Cle API non configuree. Contactez Noria : contact@elaynor-consulting.fr' : 'Erreur de connexion. Contactez Noria : contact@elaynor-consulting.fr';
      setMsgs([...newMsgs, { role: 'assistant', content: errMsg }]);
    }
    setLoading(false);
  }

  function toggleMic() {
    if (listening) { recRef.current?.stop(); recRef.current = null; setListening(false); return; }
    const SR = (window as unknown as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) { setMsgs(m => [...m, { role: 'assistant', content: "Utilisez Chrome pour la reconnaissance vocale." }]); return; }
    const rec = new SR();
    rec.lang = 'fr-FR'; rec.continuous = false; rec.interimResults = false;
    rec.onresult = (e: SpeechRecognitionEvent) => { sendMsg(e.results[0][0].transcript); rec.stop(); setListening(false); };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
    recRef.current = rec;
    setListening(true);
  }

  return (
    <>
      <div style={{ position: 'fixed', bottom: isMobile ? 14 : 24, right: isMobile ? 14 : 24, zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {showBubble && (
          <div style={{
            position: 'absolute', bottom: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)',
            background: '#0d3328', color: '#d4a536', borderRadius: 12, padding: '8px 14px',
            fontSize: 12, fontWeight: 600, border: '1.5px solid #d4a536',
            maxWidth: 210, textAlign: 'center', whiteSpace: 'normal', zIndex: 2,
            pointerEvents: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}>
            {bubble}
            <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', borderWidth: 7, borderStyle: 'solid', borderColor: '#0d3328 transparent transparent transparent' }} />
          </div>
        )}

        <div style={{ cursor: 'pointer' }} onClick={() => setOpen(v => !v)}>
          <TalkingAvatar onReady={onAvatarReady} size={isMobile ? 80 : 110} />
        </div>

        <div onClick={() => setOpen(v => !v)} style={{
          background: '#0d3328', border: '2px solid #d4a536', borderRadius: 30,
          padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 8,
          cursor: 'pointer', marginTop: -6, boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e676', display: 'block', animation: 'livePulse 2s infinite' }} />
          <strong style={{ color: '#d4a536', fontSize: 13, fontFamily: 'var(--serif)' }}>Elay</strong>
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, fontFamily: 'var(--sans)' }}>Conseillere</span>
        </div>
      </div>

      {open && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? 150 : 24,
          right: isMobile ? 14 : 170,
          left: isMobile ? 14 : 'auto',
          width: isMobile ? 'auto' : 360,
          background: '#fff', borderRadius: 20,
          boxShadow: '0 20px 80px rgba(0,0,0,0.22)',
          zIndex: 99998, display: 'flex', flexDirection: 'column',
          overflow: 'hidden', maxHeight: isMobile ? 'calc(100vh - 175px)' : '86vh',
        }}>
          <div style={{ background: '#0d3328', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'contain' }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: '#d4a536', fontSize: 14, fontWeight: 700, fontFamily: 'var(--serif)' }}>Elay</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>Conseillere ELAYNOR CONSULTING</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 20, cursor: 'pointer', lineHeight: 1, marginLeft: 4 }}>×</button>
          </div>

          <div ref={msgsRef} style={{ overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10, background: '#f8f6f2', minHeight: 220, maxHeight: 280, flexShrink: 0 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                {m.role === 'assistant' ? (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, overflow: 'hidden', background: '#0d3328' }}>
                    <img src="/avatarr.png" alt="Elay" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                  </div>
                ) : (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#1a5c45,#0d3328)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#d4a536', fontSize: 13, fontWeight: 700 }}>N</span>
                  </div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '9px 13px', borderRadius: 16, fontSize: 13, lineHeight: 1.55,
                  ...(m.role === 'assistant'
                    ? { background: 'white', color: '#1a1a1a', borderRadius: '4px 16px 16px 16px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }
                    : { background: '#0d3328', color: 'white', borderRadius: '16px 4px 16px 16px' }
                  ),
                }} dangerouslySetInnerHTML={{ __html: m.content }} />
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', background: '#0d3328' }}>
                  <img src="/avatarr.png" alt="Elay" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
                <div style={{ background: 'white', padding: '9px 13px', borderRadius: '4px 16px 16px 16px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#0d3328', opacity: 0.4, display: 'block', animation: `edt 1.4s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ background: '#f8f6f2', borderTop: '1px solid #eee', padding: '7px 12px', overflow: 'hidden', maxHeight: structs ? 160 : 34, transition: 'max-height .3s', flexShrink: 0 }}>
            <div onClick={() => setStructs(v => !v)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: structs ? 6 : 0 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#0d3328', letterSpacing: 1, textTransform: 'uppercase' }}>Mon champ d'intervention</span>
              <span style={{ fontSize: 11, color: '#d4a536', fontWeight: 700 }}>{structs ? '▾' : '▸'}</span>
            </div>
            {structs && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {quickBtns.map(b => (
                  <button key={b.label} onClick={() => sendMsg(b.q)} style={{
                    background: 'white', border: '1px solid #d4a536', color: '#0d3328',
                    padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600,
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#d4a536'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.color = '#0d3328'; }}>
                    {b.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ padding: '9px 12px', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: 7, alignItems: 'center', flexShrink: 0 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder="Ecrivez ou parlez..."
              style={{ flex: 1, border: '1px solid #ddd', borderRadius: 22, padding: '8px 14px', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
            />
            <button onClick={toggleMic} title="Microphone" style={{
              width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: listening ? '#ff4444' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={listening ? 'white' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </button>
            <button onClick={() => sendMsg()} disabled={loading} title="Envoyer" style={{
              width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: '#0d3328', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
                <path d="m22 2-7 20-4-9-9-4z"/>
                <path d="M22 2 11 13"/>
              </svg>
            </button>
          </div>
          <div style={{ textAlign: 'center', fontSize: 10, color: '#aaa', padding: '4px 12px 8px', background: 'white' }}>Conversation securisee — RGPD</div>
        </div>
      )}

      <style>{`
        @keyframes edt { 0%,80%,100% { opacity: 0.4 } 40% { opacity: 1; transform: scale(1.2) } }
        @keyframes elayFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(0.8deg); }
          50% { transform: translateY(-4px) rotate(-0.5deg); }
          75% { transform: translateY(-10px) rotate(0.3deg); }
        }
      `}</style>
    </>
  );
}
