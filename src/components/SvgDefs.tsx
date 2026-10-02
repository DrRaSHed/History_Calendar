/** Shared SVG patterns and gradients, referenced by url(#id) throughout the chart. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        {/* Light lithographic hatching laid over ribbon fills. */}
        <pattern id="cf-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#fff8e6" strokeWidth="0.9" strokeOpacity="0.26" />
        </pattern>
        {/* Dark engraved hatching for badges and shading. */}
        <pattern id="cf-hatch-dark" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#1d1a17" strokeWidth="0.8" strokeOpacity="0.28" />
        </pattern>
        {/* Faint stipple for the compressed deep past. */}
        <pattern id="cf-stipple" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.6" fill="#7a5c3e" fillOpacity="0.28" />
          <circle cx="5" cy="5" r="0.5" fill="#7a5c3e" fillOpacity="0.2" />
        </pattern>
        {/* Circular picture window shared by every medallion (badge space is -50..50). */}
        <clipPath id="cf-badge-clip" clipPathUnits="userSpaceOnUse">
          <circle r="40" />
        </clipPath>
        <linearGradient id="cf-crease" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#5a4128" stopOpacity="0" />
          <stop offset="0.42" stopColor="#5a4128" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#fffaf0" stopOpacity="0.55" />
          <stop offset="0.58" stopColor="#5a4128" stopOpacity="0.1" />
          <stop offset="1" stopColor="#5a4128" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cf-future" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f5efe0" stopOpacity="0" />
          <stop offset="1" stopColor="#f5efe0" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="cf-band" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#eadeca" stopOpacity="0.85" />
          <stop offset="1" stopColor="#e2d3b5" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  );
}
