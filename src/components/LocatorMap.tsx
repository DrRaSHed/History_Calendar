import { motion, useReducedMotion } from 'framer-motion';

/** Crude engraved world outline (lon/lat polygons) — enough to say "roughly here", no more. */
const LAND: [number, number][][] = [
  // North America
  [[-168, 66], [-162, 70], [-156, 71], [-141, 70], [-128, 70], [-110, 68], [-95, 68], [-90, 64], [-94, 59], [-86, 56], [-80, 52], [-78, 58], [-76, 62], [-70, 60], [-62, 58], [-56, 52], [-60, 47], [-66, 44], [-70, 42], [-74, 40], [-76, 36], [-80, 32], [-81, 27], [-80, 25], [-83, 29], [-89, 30], [-94, 29], [-97, 26], [-97, 21], [-95, 18], [-91, 19], [-87, 21], [-88, 16], [-84, 15], [-83, 10], [-80, 9], [-77, 8], [-80, 7], [-83, 8], [-86, 11], [-92, 14], [-97, 16], [-105, 20], [-106, 23], [-110, 27], [-113, 31], [-117, 32], [-121, 35], [-124, 40], [-124, 46], [-126, 50], [-132, 55], [-140, 60], [-148, 60], [-153, 58], [-160, 56], [-165, 60]],
  // Greenland
  [[-73, 78], [-60, 82], [-30, 83], [-20, 78], [-20, 70], [-30, 68], [-43, 60], [-50, 62], [-55, 68], [-66, 70]],
  // South America
  [[-77, 8], [-72, 12], [-64, 10.5], [-60, 8], [-52, 5], [-50, 0], [-44, -2], [-35, -5], [-35, -9], [-39, -15], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-63, -41], [-65, -47], [-68, -52], [-70, -55], [-74, -52], [-74, -45], [-72, -38], [-71, -30], [-70, -18], [-76, -14], [-81, -6], [-80, -1], [-77, 4]],
  // Eurasia
  [[-9, 37], [-9, 43], [-2, 43.5], [-1, 46], [-4, 48], [2, 51], [5, 53], [8, 54], [8, 57], [5, 60], [5, 62], [14, 67], [20, 70], [28, 71], [32, 70], [41, 67], [44, 68], [60, 69], [68, 69], [73, 72], [80, 73], [95, 76], [110, 77], [125, 73], [140, 72], [160, 70], [170, 69], [180, 68], [180, 65], [170, 62], [163, 58], [156, 52], [150, 59], [142, 59], [137, 54], [141, 52], [140, 48], [135, 43], [130, 42], [128, 38], [126, 35], [126, 38], [122, 40], [122, 37], [119, 35], [122, 31], [120, 27], [116, 23], [110, 21], [108, 17], [106, 10], [103, 10], [100, 13], [100, 6], [104, 1], [100, 3], [98, 8], [98, 16], [94, 17], [92, 22], [87, 21], [80, 15], [78, 8], [75, 12], [73, 18], [72, 21], [68, 23], [66, 25], [57, 25.5], [56.5, 27], [52, 28], [48, 30], [50, 26], [52, 24], [56, 26], [59, 22], [55, 17], [52, 16], [44, 13.5], [43, 17], [39, 21], [36, 29], [34, 31], [36, 36], [32, 36.5], [27, 37], [26, 40], [29, 41], [28, 42], [24, 40], [23, 37], [21, 38], [19, 41], [16, 42], [18, 40], [16, 38], [12, 42], [10, 44], [8, 44], [4, 43], [0, 39], [-1, 37], [-5, 36]],
  // Africa
  [[-17, 21], [-13, 28], [-10, 30], [-6, 36], [0, 36], [10, 37], [11, 33], [20, 31], [25, 32], [32, 31], [34, 27], [38, 21], [43, 12], [51, 12], [48, 5], [40, -3], [40, -10], [39, -16], [35, -24], [33, -28], [28, -33], [20, -35], [18, -32], [14, -23], [12, -14], [13, -8], [9, -1], [9, 4], [5, 6], [-4, 5], [-8, 4.5], [-13, 8], [-17, 14]],
  // Australia
  [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -19], [153, -27], [150, -37], [141, -38], [135, -34], [115, -34]],
  // Britain
  [[-5, 50], [1, 51], [2, 53], [-2, 57], [-5, 58], [-6, 55], [-3, 54]],
  // Japan
  [[130, 31], [132, 34], [136, 35], [140, 36], [142, 40], [141, 44], [144, 43], [141, 45], [139, 42], [136, 37], [131, 34]],
];

const W = 360;
const H = 150;
const LAT_TOP = 84;
const px = (lon: number) => lon + 180;
const py = (lat: number) => LAT_TOP - lat;

const path = (poly: [number, number][]) => `M${poly.map(([lo, la]) => `${px(lo).toFixed(1)},${py(la).toFixed(1)}`).join('L')}Z`;

interface LocatorMapProps {
  coords: [number, number] | null;
  body?: 'earth' | 'moon';
  color: string;
  label: string;
}

/** Engraved locator plate: a world sketch (or the Moon) with a pigment-coloured pin. */
export function LocatorMap({ coords, body = 'earth', color, label }: LocatorMapProps) {
  const reduced = useReducedMotion();
  const moon = body === 'moon';
  let pin: { x: number; y: number } | null = null;
  if (coords) {
    const [lat, lon] = coords;
    pin = moon
      ? { x: 180 + 64 * Math.cos((lat * Math.PI) / 180) * Math.sin((lon * Math.PI) / 180), y: 75 - 64 * Math.sin((lat * Math.PI) / 180) }
      : { x: px(lon), y: py(lat) };
  }

  return (
    <svg style={{ direction: 'ltr' }} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="block h-auto w-full">
      <rect width={W} height={H} fill="#EADECA" />
      <rect width={W} height={H} fill="url(#cf-stipple)" opacity=".7" />
      {moon ? (
        <>
          <circle cx="180" cy="75" r="64" fill="#F2E8C8" stroke="#2E2A26" strokeWidth="2" />
          <circle cx="180" cy="75" r="64" fill="url(#cf-hatch-dark)" />
          {[[160, 52, 14, 9], [200, 62, 12, 8], [150, 88, 10, 7], [190, 100, 9, 6]].map(([x, y, rx, ry], i) => (
            <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#C9BE98" stroke="#2E2A26" strokeOpacity=".5" strokeWidth="1" />
          ))}
          {[[140, 70, 3], [215, 88, 4], [172, 38, 3], [225, 52, 3]].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#2E2A26" strokeOpacity=".45" strokeWidth="1" />
          ))}
        </>
      ) : (
        <>
          <g stroke="#2E2A26" strokeOpacity=".13" strokeWidth=".7" fill="none">
            {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lo) => (
              <path key={lo} d={`M${px(lo)},0V${H}`} />
            ))}
            {[60, 30, 0, -30, -60].map((la) => (
              <path key={la} d={`M0,${py(la)}H${W}`} />
            ))}
            <path d={`M0,${py(0)}H${W}`} strokeOpacity=".3" strokeDasharray="3 3" />
          </g>
          {LAND.map((poly, i) => (
            <g key={i}>
              <path d={path(poly)} fill="#E2D3B5" stroke="#2E2A26" strokeWidth="1" strokeLinejoin="round" />
              <path d={path(poly)} fill="url(#cf-hatch-dark)" />
            </g>
          ))}
        </>
      )}
      <rect x="1" y="1" width={W - 2} height={H - 2} fill="none" stroke="#2E2A26" strokeWidth="1.4" />
      <rect x="4" y="4" width={W - 8} height={H - 8} fill="none" stroke="#2E2A26" strokeWidth=".5" strokeOpacity=".6" />
      {pin && (
        <g transform={`translate(${pin.x.toFixed(1)} ${pin.y.toFixed(1)})`}>
          {!reduced && (
            <motion.circle
              r={5}
              fill="none"
              stroke={color}
              strokeWidth={2}
              initial={{ r: 4, opacity: 0.9 }}
              animate={{ r: 16, opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <circle r="9" fill="none" stroke="#2E2A26" strokeWidth=".8" strokeOpacity=".6" />
          <circle r="5" fill={color} stroke="#2E2A26" strokeWidth="1.8" />
          <circle r="1.6" fill="#F5EFE0" />
        </g>
      )}
    </svg>
  );
}
