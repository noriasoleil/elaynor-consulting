export function CircuitBg() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.35, zIndex: 0 }}
    >
      <defs>
        <linearGradient id="circuitGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#d4a536" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M 0 120 L 280 120 L 320 160 L 560 160 L 600 120 L 1000 120 L 1040 80 L 1600 80" fill="none" stroke="url(#circuitGrad)" strokeWidth="1.2" strokeDasharray="6 4" style={{ animation: 'circuitFlow 30s linear infinite' }} />
      <path d="M 0 780 L 400 780 L 440 740 L 900 740 L 940 780 L 1600 780" fill="none" stroke="url(#circuitGrad)" strokeWidth="1.2" strokeDasharray="6 4" style={{ animation: 'circuitFlow 30s linear infinite' }} />
      <path d="M 0 420 L 200 420 L 240 380 L 480 380 L 520 420 L 760 420 L 800 460 L 1600 460" fill="none" stroke="url(#circuitGrad)" strokeWidth="1.2" strokeDasharray="6 4" style={{ animation: 'circuitFlow 30s linear infinite' }} />
      <path d="M 200 0 L 200 120 M 520 0 L 520 80 M 900 0 L 900 60 M 1280 0 L 1280 100" fill="none" stroke="url(#circuitGrad)" strokeWidth="1.2" strokeDasharray="6 4" />
      <path d="M 340 900 L 340 780 M 700 900 L 700 740 M 1080 900 L 1080 780 M 1440 900 L 1440 780" fill="none" stroke="url(#circuitGrad)" strokeWidth="1.2" strokeDasharray="6 4" />
      <g>
        {[
          [280, 120], [560, 160], [1040, 80],
          [440, 740], [940, 780],
          [240, 380], [520, 420], [800, 460],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#2dd4bf" opacity="0.6"
            style={{ animation: `nodePulse 3s ease-in-out ${(i % 3) * 0.75}s infinite`, transformOrigin: `${cx}px ${cy}px` }} />
        ))}
      </g>
    </svg>
  );
}
