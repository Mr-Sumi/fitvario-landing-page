// Original hand-drawn marks used as accents on the lime panels. Decorative only (aria-hidden).

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path className="fv-doodle" d="M24 4 C25.5 15 33 22.5 44 24 C33 25.5 25.5 33 24 44 C22.5 33 15 25.5 4 24 C15 22.5 22.5 15 24 4 Z" />
    </svg>
  );
}

// A loose loop with an arrowhead, drawn from the headline towards the main button
export function LoopArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 200" className={className} aria-hidden fill="none">
      <path
        className="fv-doodle"
        d="M8 12 C120 6 214 40 208 100 C204 140 160 150 150 126 C142 106 170 96 184 112 C206 138 150 188 52 176"
      />
      <path className="fv-doodle" d="M70 156 L46 178 L78 192" />
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 24" className={className} aria-hidden fill="none">
      <path className="fv-doodle" d="M4 14 C20 2 28 24 44 12 C60 0 68 24 84 12 C100 0 108 24 124 12 C136 4 146 10 156 8" />
    </svg>
  );
}

// A plain thin line with a soft dip, like the line in the reference's black banner
export function PulseLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} aria-hidden fill="none">
      <path d="M2 70 C40 70 60 10 90 14 C112 17 100 44 124 44 C150 44 160 30 198 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Abstract tile art in the brand colours: shapes only, no data
export function TileArtRings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden fill="none">
      <circle cx="150" cy="78" r="58" stroke="var(--ink)" strokeWidth="14" strokeDasharray="210 400" strokeLinecap="round" />
      <circle cx="150" cy="78" r="58" stroke="var(--lime)" strokeWidth="14" strokeDasharray="120 400" strokeDashoffset="-215" strokeLinecap="round" />
      <path d="M20 120 C40 90 58 130 80 100 C100 74 112 96 130 70" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function TileArtBlocks({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden fill="none">
      <path d="M96 140 L150 30 L205 140 Z" fill="var(--lime)" />
      <rect x="60" y="86" width="36" height="54" rx="6" fill="var(--ink)" />
      <path d="M150 60 C170 40 190 70 168 84 C152 94 146 76 158 72" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
