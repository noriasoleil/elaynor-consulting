interface EyebrowProps {
  children: React.ReactNode;
  light?: boolean;
  center?: boolean;
}

export function Eyebrow({ children, light, center }: EyebrowProps) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
      color: light ? 'var(--gold-400)' : 'var(--gold-600)',
      display: 'inline-flex', alignItems: 'center', gap: 10,
      justifyContent: center ? 'center' : undefined,
      width: center ? '100%' : undefined,
    }}>
      <span style={{ display: 'block', width: 28, height: 1, background: light ? 'var(--gold-400)' : 'var(--gold-500)' }} />
      {children}
    </span>
  );
}
