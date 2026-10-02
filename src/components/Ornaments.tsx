interface CornerProps {
  size?: number;
  inset?: number;
  className?: string;
}

const CORNERS = [
  { pos: 'top-0 left-0', rot: 0 },
  { pos: 'top-0 right-0', rot: 90 },
  { pos: 'bottom-0 right-0', rot: 180 },
  { pos: 'bottom-0 left-0', rot: 270 },
] as const;

/** Ornamental engraved corner brackets for framed cartouches. */
export function CornerBrackets({ size = 22, inset = 5, className = 'text-ink' }: CornerProps) {
  return (
    <>
      {CORNERS.map((c) => (
        <svg
          key={c.rot}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`pointer-events-none absolute ${c.pos} ${className}`}
          style={{ margin: inset, transform: `rotate(${c.rot}deg)` }}
          fill="none"
          stroke="currentColor"
        >
          <path d="M1.5 22V7.5a6 6 0 0 1 6-6H22" strokeWidth="1.4" />
          <path d="M5.5 22V10a4.5 4.5 0 0 1 4.5-4.5h12" strokeWidth="0.8" />
          <circle cx="4" cy="4" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      ))}
    </>
  );
}

/** Engraved horizontal divider with a central lozenge. */
export function Fleuron({ className = 'text-ink/70' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current" />
      <svg width="28" height="10" viewBox="0 0 28 10" fill="currentColor">
        <path d="M14 0l4 5-4 5-4-5z" />
        <circle cx="4" cy="5" r="1.4" />
        <circle cx="24" cy="5" r="1.4" />
      </svg>
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}
