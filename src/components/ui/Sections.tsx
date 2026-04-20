interface SectionProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function SectionInk({ children, style }: SectionProps) {
  return (
    <section style={{
      padding: '120px 32px',
      background: 'var(--ink-gradient)',
      color: 'var(--cream)',
      position: 'relative', zIndex: 1,
      ...style,
    }}>
      {children}
    </section>
  );
}

export function SectionCream({ children, style }: SectionProps) {
  return (
    <section style={{
      padding: '120px 32px',
      background: 'var(--cream)',
      position: 'relative', zIndex: 1,
      ...style,
    }}>
      {children}
    </section>
  );
}

export function SectionPaper({ children, style }: SectionProps) {
  return (
    <section style={{
      padding: '120px 32px',
      background: 'var(--paper)',
      position: 'relative', zIndex: 1,
      ...style,
    }}>
      {children}
    </section>
  );
}
