import { useEffect, useRef, useState, useCallback } from 'react';

export type TalkingAvatarHandle = {
  speak: (text: string) => void;
  stop: () => void;
  replay: () => void;
};

interface TalkingAvatarProps {
  onReady?: (handle: TalkingAvatarHandle) => void;
  size?: number;
  className?: string;
}

type MouthShape = 'closed' | 'small' | 'medium' | 'wide' | 'round';

const MOUTH_SHAPES: Record<MouthShape, { w: number; h: number; rx: number }> = {
  closed: { w: 22, h: 3,  rx: 3  },
  small:  { w: 20, h: 8,  rx: 5  },
  medium: { w: 24, h: 14, rx: 8  },
  wide:   { w: 28, h: 10, rx: 6  },
  round:  { w: 18, h: 18, rx: 9  },
};

const SHAPE_SEQUENCE: MouthShape[] = ['small', 'medium', 'wide', 'medium', 'small', 'round', 'medium', 'closed'];

export default function TalkingAvatar({ onReady, size = 110 }: TalkingAvatarProps) {
  const [mouthShape, setMouthShape] = useState<MouthShape>('closed');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [eyeBlink, setEyeBlink] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);
  const [lastText, setLastText] = useState('');

  const animFrameRef = useRef<number>(0);
  const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lipTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shapeidxRef = useRef(0);

  const stopLipSync = useCallback(() => {
    if (lipTimerRef.current) clearInterval(lipTimerRef.current);
    lipTimerRef.current = null;
    setMouthShape('closed');
    setIsSpeaking(false);
  }, []);

  const startLipSync = useCallback(() => {
    stopLipSync();
    setIsSpeaking(true);
    shapeidxRef.current = 0;
    lipTimerRef.current = setInterval(() => {
      shapeidxRef.current = (shapeidxRef.current + 1) % SHAPE_SEQUENCE.length;
      setMouthShape(SHAPE_SEQUENCE[shapeidxRef.current]);
    }, 90);
  }, [stopLipSync]);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    setLastText(text);
    window.speechSynthesis.cancel();
    const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s{2,}/g, ' ').trim();
    if (!clean) return;

    const chunks: string[] = [];
    const sentences = clean.split(/(?<=[.!?])\s+/);
    let cur = '';
    for (const s of sentences) {
      if (!s.trim()) continue;
      if ((cur + ' ' + s).length > 150 && cur.length > 0) {
        chunks.push(cur.trim());
        cur = s;
      } else {
        cur = cur ? cur + ' ' + s : s;
      }
    }
    if (cur) chunks.push(cur.trim());

    let idx = 0;
    const next = () => {
      if (idx >= chunks.length) { stopLipSync(); return; }
      const u = new SpeechSynthesisUtterance(chunks[idx]);
      u.lang = 'fr-FR';
      u.rate = 0.92;
      u.pitch = 1.1;
      const vs = window.speechSynthesis.getVoices();
      for (const v of vs) {
        if (v.lang.startsWith('fr') && !v.name.includes('Thomas')) { u.voice = v; break; }
      }
      u.onstart = () => startLipSync();
      u.onend = () => { idx++; next(); };
      u.onerror = () => { idx++; next(); };
      window.speechSynthesis.speak(u);
    };
    next();
  }, [startLipSync, stopLipSync]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    stopLipSync();
  }, [stopLipSync]);

  const replay = useCallback(() => {
    if (lastText) speak(lastText);
  }, [lastText, speak]);

  useEffect(() => {
    window.speechSynthesis?.getVoices();
  }, []);

  useEffect(() => {
    if (onReady) onReady({ speak, stop, replay });
  }, [speak, stop, replay, onReady]);

  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 4000;
      blinkTimerRef.current = setTimeout(() => {
        setEyeBlink(true);
        setTimeout(() => setEyeBlink(false), 140);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => { if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current); };
  }, []);

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.012;
      setHeadTilt(Math.sin(t) * 1.2);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  useEffect(() => {
    return () => {
      stopLipSync();
      window.speechSynthesis?.cancel();
    };
  }, [stopLipSync]);

  const mouth = MOUTH_SHAPES[mouthShape];
  const avatarH = Math.round(size * 1.27);

  const cx = size * 0.5;
  const mouthY = avatarH * 0.78;
  const eyeY = avatarH * 0.38;
  const eyeSpread = size * 0.18;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div
        style={{
          position: 'relative',
          width: size,
          height: avatarH,
          transform: `rotate(${headTilt}deg)`,
          transition: 'transform 0.3s ease',
          filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))',
        }}
      >
        <img
          src="/avatarr.png"
          alt="Elay — Conseillere ELAYNOR"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
        />

        <svg
          viewBox={`0 0 ${size} ${avatarH}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {eyeBlink && (
            <>
              <ellipse
                cx={cx - eyeSpread}
                cy={eyeY}
                rx={7}
                ry={1.5}
                fill="rgba(30,20,10,0.55)"
              />
              <ellipse
                cx={cx + eyeSpread}
                cy={eyeY}
                rx={7}
                ry={1.5}
                fill="rgba(30,20,10,0.55)"
              />
            </>
          )}

          <rect
            x={cx - mouth.w / 2}
            y={mouthY - mouth.h / 2}
            width={mouth.w}
            height={mouth.h}
            rx={mouth.rx}
            fill={isSpeaking ? 'rgba(20,10,5,0.62)' : 'rgba(20,10,5,0.3)'}
            style={{
              transition: 'all 0.08s ease',
            }}
          />

          {isSpeaking && mouth.h > 6 && (
            <ellipse
              cx={cx}
              cy={mouthY + mouth.h * 0.15}
              rx={mouth.w * 0.38}
              ry={mouth.h * 0.22}
              fill="rgba(180,80,80,0.45)"
            />
          )}
        </svg>
      </div>

    </div>
  );
}
