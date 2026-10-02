import type { ReactNode } from 'react';

/**
 * Cartoon vignettes in the manner of the small engraved pictures scattered across Adams' 1871 chart:
 * bold ink outlines, flat pigment fills, a little hatching. Every scene is drawn on a 100×100 sheet and
 * shown through a circular window — keep the subject inside a radius of ~46 from the centre.
 */
const INK = '#2E2A26';
const o = { stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;
const thin = { stroke: INK, strokeWidth: 1.3, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;
const bold = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;
const ln = { stroke: INK, strokeWidth: 1.5, strokeLinecap: 'round', fill: 'none' } as const;

const deg = (a: number) => (a * Math.PI) / 180;

function Rays({ cx, cy, r1, r2, n, color, w = 2 }: { cx: number; cy: number; r1: number; r2: number; n: number; color: string; w?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = deg((360 / n) * i);
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(a)}
            y1={cy + r1 * Math.sin(a)}
            x2={cx + r2 * Math.cos(a)}
            y2={cy + r2 * Math.sin(a)}
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
          />
        );
      })}
    </>
  );
}

function Stars({ pts }: { pts: [number, number, number?][] }) {
  return (
    <>
      {pts.map(([x, y, r = 0.9], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#FBF3D6" />
      ))}
    </>
  );
}

/* ───────────────────────── Panel I ───────────────────────── */

function Gobekli() {
  return (
    <>
      <rect width="100" height="100" fill="#F6DFB4" />
      <Rays cx={78} cy={26} r1={12} r2={17} n={10} color="#F2A93B" />
      <circle cx="78" cy="26" r="9.5" fill="#F2A93B" {...o} />
      <path d="M0 64 Q20 52 42 62 T100 58 V100 H0Z" fill="#D9B27A" {...thin} />
      <path d="M0 80 Q50 68 100 80 V100 H0Z" fill="#E9C98E" {...o} />
      <path d="M14 14 q4 -5 8 0 q4 -5 8 0" {...ln} strokeWidth={2} />
      <path d="M58 22 q3 -4 6 0 q3 -4 6 0" {...ln} strokeWidth={1.8} />
      {/* back pillar */}
      <path d="M58 40 H84 V51 H77 V86 H65 V51 H58Z" fill="#B2AB9A" {...o} />
      <path d="M71 51 H76 V85 H71Z" fill="#8F887A" />
      <path d="M60 46 q3 -3 6 0 t6 0 t6 0" {...ln} stroke="#5E564A" />
      <path d="M67 62 v8 M73 62 v8 M67 66 h6" {...ln} stroke="#5E564A" />
      {/* front pillar */}
      <path d="M18 26 H52 V40 H43 V88 H27 V40 H18Z" fill="#C4BDAC" {...bold} />
      <path d="M37 41 H42 V87 H37Z" fill="#968E7E" />
      <path d="M21 33 q3.5 -5 7 0 t7 0 t7 0 t7 0" {...ln} stroke="#5E564A" strokeWidth={2} />
      <path d="M29 52 q5 7 12 0" {...ln} stroke="#5E564A" />
      <rect x="28.5" y="60" width="14" height="4.5" fill="#9A8660" {...thin} />
      <path d="M31 70 v8 M39 70 v8 M31 74 h8" {...ln} stroke="#5E564A" />
      <ellipse cx="14" cy="90" rx="7" ry="4" fill="#A39B8A" {...thin} />
      <ellipse cx="86" cy="92" rx="8" ry="4" fill="#A39B8A" {...thin} />
    </>
  );
}

function Pyramid() {
  const courses = [66, 54, 42, 30];
  return (
    <>
      <rect width="100" height="100" fill="#BFE6E8" />
      <Rays cx={22} cy={24} r1={11} r2={15} n={8} color="#F7C948" />
      <circle cx="22" cy="24" r="8.5" fill="#F7C948" {...o} />
      <path d="M58 74 L77 44 L98 74Z" fill="#E5BF7C" {...o} />
      <path d="M77 44 L98 74 H82Z" fill="#C79A55" />
      <path d="M0 78 Q28 72 52 78 T100 76 V100 H0Z" fill="#EBCB8B" {...o} />
      <path d="M9 80 L46 17 L89 80Z" fill="#F4DA9C" />
      <path d="M46 17 L89 80 H58Z" fill="#CFA55F" />
      {courses.map((y) => (
        <path key={y} d={`M${(9 + (80 - y) * 0.607).toFixed(1)} ${y} H${(46 + (y - 17) * 0.705).toFixed(1)}`} stroke={INK} strokeOpacity=".4" strokeWidth="1.1" />
      ))}
      <path d="M46 17 L58 80" {...ln} />
      <path d="M9 80 L46 17 L89 80Z" fill="none" {...bold} />
      <path d="M0 89 Q25 84 50 89 T100 87 V100 H0Z" fill="#3E92A8" {...o} />
      <path d="M62 87 V70 L76 86Z" fill="#FBF6E8" {...o} />
      <path d="M58 88 H82 L77 93 H63Z" fill="#8A5A33" {...o} />
      {/* palm */}
      <path d="M22 88 Q26 76 21 63" stroke="#7A4F2A" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M21 63 Q13 55 6 59 Q14 60 21 63Z M21 63 Q19 53 12 49 Q18 55 21 63Z M21 63 Q25 53 33 52 Q26 57 21 63Z M21 63 Q31 59 35 65 Q27 63 21 63Z" fill="#2E8B57" {...thin} />
    </>
  );
}

function Seal() {
  return (
    <>
      <rect width="100" height="100" fill="#F1DDB4" />
      <Rays cx={78} cy={20} r1={9} r2={13} n={8} color="#E99A3A" />
      <circle cx="78" cy="20" r="7.5" fill="#E99A3A" {...o} />
      <rect y="78" width="100" height="22" fill="#D2A262" />
      <path d="M0 78 H100" {...o} />
      {/* brick citadel */}
      <rect x="10" y="48" width="44" height="31" fill="#C86F45" {...o} />
      <rect x="18" y="34" width="28" height="15" fill="#D27C50" {...o} />
      {[56, 64, 72].map((y) => (
        <path key={y} d={`M10 ${y} H54`} stroke={INK} strokeOpacity=".5" strokeWidth="1.1" />
      ))}
      {[16, 28, 40, 48].map((x, i) => (
        <path key={x} d={`M${x} ${48 + (i % 2) * 8} v8 M${x + 6} ${56 + (i % 2) * 8} v8`} stroke={INK} strokeOpacity=".5" strokeWidth="1.1" />
      ))}
      <path d="M26 79 V69 a6 6 0 0 1 12 0 V79Z" fill="#3B2A22" {...thin} />
      <path d="M22 41 h4 M30 41 h4 M38 41 h4" stroke={INK} strokeOpacity=".5" strokeWidth="1.1" />
      {/* seal */}
      <rect x="50" y="48" width="42" height="40" rx="5" fill="#EBDDB0" {...bold} />
      <path d="M56 56 h4 M63 55 v4 M67 56 h5 M76 55 v4 M80 56 h4" {...ln} stroke="#6B4A2B" strokeWidth={1.6} />
      <ellipse cx="73" cy="72" rx="12" ry="6.5" fill="#8C5A33" {...o} />
      <ellipse cx="60" cy="69" rx="4.5" ry="3.6" fill="#8C5A33" {...o} />
      <path d="M58 66 Q54 60 58 56" {...ln} strokeWidth={2} />
      <path d="M64 71 q3 4 7 1" {...ln} strokeWidth={1.2} stroke="#F1DDB4" />
      <path d="M64 77 v8 M69 78 v7 M78 78 v7 M83 77 v8" {...ln} strokeWidth={2.4} />
      <path d="M85 68 q5 2 3 9" {...ln} strokeWidth={1.8} />
    </>
  );
}

function Stele() {
  return (
    <>
      <rect width="100" height="100" fill="#EAD9A8" />
      <Rays cx={50} cy={52} r1={36} r2={60} n={28} color="#D5BC7E" w={1.6} />
      <path d="M32 90 V32 a18 18 0 0 1 36 0 V90Z" fill="#3A3632" {...bold} />
      <path d="M37 42 V32 a13 13 0 0 1 26 0 V42Z" fill="#7C766A" {...thin} />
      {/* Hammurabi (left) */}
      <circle cx="43" cy="28" r="3" fill="#CFC7B5" {...thin} />
      <path d="M40 31 h6 v10 h-6Z" fill="#CFC7B5" {...thin} />
      <path d="M46 33 h4" {...ln} stroke="#CFC7B5" />
      {/* Shamash seated (right) */}
      <circle cx="57" cy="26" r="3.2" fill="#E5D9B8" {...thin} />
      <Rays cx={57} cy={26} r1={4.6} r2={6.8} n={8} color="#E5D9B8" w={1.1} />
      <path d="M53 30 h9 v11 h-12 v-6Z" fill="#CFC7B5" {...thin} />
      <circle cx="50.2" cy="34" r="1.6" fill="none" stroke="#E5D9B8" strokeWidth="1.1" />
      {[50, 57, 64, 71, 78].map((y) => (
        <g key={y}>
          {Array.from({ length: 7 }, (_, k) => (
            <path key={k} d={`M${36.5 + k * 4.2} ${y} h2.6 l-1.3 3.2Z`} fill="#D9D1BD" opacity={0.9} />
          ))}
        </g>
      ))}
      <path d="M36 85 h28" {...ln} stroke="#8C8478" />
      <rect x="25" y="88" width="50" height="7" rx="1.5" fill="#9C9486" {...o} />
    </>
  );
}

function OracleBone() {
  return (
    <>
      <rect width="100" height="100" fill="#F0DDBF" />
      <rect y="84" width="100" height="16" fill="#B83A24" opacity=".28" />
      <g transform="rotate(-14 42 46)">
        <ellipse cx="42" cy="46" rx="31" ry="23" fill="#E9D9A6" {...bold} />
        <path d="M42 24 V68" {...ln} />
        <path d="M26 34 H58 M22 44 H62 M22 54 H62 M27 63 H57" stroke={INK} strokeOpacity=".5" strokeWidth="1.3" fill="none" />
        <path d="M49 31 V58 M49 43 L59 39" stroke="#7A2E1A" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M33 31 V40 M30 34 H36 M31 48 h6 v5 h-6Z" stroke="#7A2E1A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="44" cy="36" r="1.8" fill="#6B4A2B" />
        <circle cx="44" cy="52" r="1.8" fill="#6B4A2B" />
      </g>
      {/* bronze ding */}
      <rect x="60" y="62" width="34" height="7" rx="2" fill="#5B9A7B" {...o} />
      <path d="M62 69 h30 v6 q0 10 -15 10 q-15 0 -15 -10z" fill="#5B9A7B" {...o} />
      <path d="M64 58 v-9 h5 v13 M85 62 v-13 h5 v9" fill="none" {...o} />
      <path d="M67 85 v7 M87 85 v7 M77 87 v6" {...ln} strokeWidth={3} />
      <path d="M68 74 q3 -3 6 0 t6 0 t6 0" {...ln} stroke="#2F5E48" />
    </>
  );
}

function ColossalHead() {
  return (
    <>
      <rect width="100" height="100" fill="#CFE5C2" />
      <path d="M0 100 Q8 72 30 62 Q18 84 26 100Z" fill="#2F8F5B" {...o} />
      <path d="M100 100 Q94 70 70 60 Q84 84 76 100Z" fill="#287A4D" {...o} />
      <path d="M30 100 Q38 90 50 96 Q62 90 70 100Z" fill="#3FA66B" {...thin} />
      <path d="M26 58 Q22 24 50 20 Q78 24 74 58 Q76 88 50 91 Q24 88 26 58Z" fill="#8A8D91" {...bold} />
      <path d="M24 47 Q22 21 50 17 Q78 21 76 47 Q50 38 24 47Z" fill="#5D6064" {...o} />
      <path d="M30 34 Q50 26 70 34" {...ln} stroke="#8A8D91" />
      <circle cx="25" cy="60" r="5" fill="#6E7175" {...o} />
      <circle cx="75" cy="60" r="5" fill="#6E7175" {...o} />
      <path d="M34 53 q7 -5 14 0 q-7 4 -14 0Z M52 53 q7 -5 14 0 q-7 4 -14 0Z" fill="#33353A" {...thin} />
      <path d="M33 49 q8 -4 16 0 M51 49 q8 -4 16 0" {...ln} strokeWidth={2.2} />
      <path d="M43 63 q7 -4 14 0 q2 9 -7 10 q-9 -1 -7 -10Z" fill="#76797D" {...o} />
      <path d="M45 68 h2 M53 68 h2" {...ln} />
      <path d="M36 79 q14 -6 28 0 q-14 9 -28 0Z" fill="#5A5D61" {...o} />
      <path d="M39 79 q11 3 22 0" {...ln} />
      <path d="M30 70 q3 8 8 11 M70 70 q-3 8 -8 11" {...ln} stroke="#5D6064" />
    </>
  );
}

/* ───────────────────────── Panel II ───────────────────────── */

function Sage() {
  return (
    <>
      <rect width="100" height="100" fill="#F3DFC1" />
      <path d="M0 72 Q20 56 40 68 T80 62 T100 70 V100 H0Z" fill="#D8C39B" {...thin} />
      <circle cx="78" cy="22" r="10" fill="#FBF6E8" {...o} />
      <path d="M78 12 a10 10 0 0 1 0 20 a5 5 0 0 1 0 -10 a5 5 0 0 0 0 -10Z" fill={INK} />
      <circle cx="78" cy="17" r="1.5" fill={INK} />
      <circle cx="78" cy="27" r="1.5" fill="#FBF6E8" />
      {/* bamboo slips */}
      <g {...thin}>
        <rect x="14" y="66" width="5" height="26" rx="1.2" fill="#D9C27A" />
        <rect x="20" y="64" width="5" height="28" rx="1.2" fill="#E3CE88" />
        <rect x="26" y="66" width="5" height="26" rx="1.2" fill="#D9C27A" />
        <path d="M13 74 H32 M13 85 H32" stroke={INK} strokeWidth="1.6" />
      </g>
      {/* robe */}
      <path d="M30 98 Q27 64 38 55 H62 Q73 64 70 98Z" fill="#B83A24" {...bold} />
      <path d="M50 56 V98" {...ln} stroke="#6E1F12" />
      <ellipse cx="50" cy="75" rx="15" ry="6" fill="#9C2F1C" {...o} />
      {/* head */}
      <circle cx="50" cy="38" r="13" fill="#EBC9A0" {...bold} />
      <rect x="35" y="18" width="30" height="5.5" rx="1" fill={INK} />
      <path d="M39 24 h22 v5 q-11 3 -22 0Z" fill="#2E2A26" />
      <path d="M43 37 q3 -2 6 0 M52 37 q3 -2 6 0" {...ln} strokeWidth={2} />
      <path d="M41 33 q4 -2 8 0 M52 33 q4 -2 8 0" {...ln} strokeWidth={1.5} />
      <path d="M38 44 Q42 66 50 69 Q58 66 62 44 Q50 52 38 44Z" fill="#E8E4DC" {...o} />
      <path d="M44 46 q6 3 12 0" {...ln} stroke="#3A2E27" strokeWidth={2.2} />
    </>
  );
}

function Library() {
  return (
    <>
      <rect width="100" height="100" fill="#CBE5F0" />
      <rect y="66" width="100" height="34" fill="#4FA3C0" />
      <path d="M0 66 H100" {...o} />
      <path d="M6 76 q4 -3 8 0 t8 0 t8 0 t8 0 M54 80 q4 -3 8 0 t8 0 t8 0 t8 0" {...ln} stroke="#E4F4F8" strokeWidth={1.6} />
      {/* Pharos */}
      <path d="M77 68 L80 42 H90 L93 68Z" fill="#EFE3C6" {...o} />
      <rect x="79" y="32" width="12" height="10" fill="#E5D6B2" {...o} />
      <path d="M85 32 q-6 -7 0 -14 q6 7 0 14Z" fill="#F29C38" {...o} />
      <path d="M81 52 h8 M80 60 h10" {...ln} strokeWidth={1.1} />
      {/* library */}
      <path d="M5 46 L35 29 L65 46Z" fill="#F4EAD2" {...bold} />
      <circle cx="35" cy="41" r="3.5" fill="#C99B3D" {...thin} />
      <rect x="7" y="46" width="56" height="5" fill="#E8DCBD" {...o} />
      <rect x="9" y="51" width="52" height="27" fill="#5E4A3A" />
      {[11, 22, 33, 44, 55].map((x) => (
        <rect key={x} x={x - 2.6} y="51" width="6" height="27" fill="#FAF3E0" {...thin} />
      ))}
      <rect x="4" y="78" width="62" height="5" fill="#E8DCBD" {...o} />
      <rect x="1" y="83" width="68" height="5" fill="#DACDAA" {...o} />
      {/* scrolls */}
      <g {...thin}>
        <rect x="20" y="86" width="22" height="6" rx="3" fill="#F7EEC8" />
        <rect x="24" y="80" width="22" height="6" rx="3" fill="#EFE3B2" />
        <circle cx="20" cy="89" r="2.2" fill="#C99B3D" />
        <circle cx="46" cy="83" r="2.2" fill="#C99B3D" />
      </g>
    </>
  );
}

function Volcano() {
  return (
    <>
      <rect width="100" height="100" fill="#4B3B49" />
      <circle cx="50" cy="42" r="36" fill="#C4503A" opacity=".35" />
      <Stars pts={[[14, 20], [86, 16], [92, 44], [10, 48], [30, 8]]} />
      <path d="M26 42 Q10 38 17 26 Q18 12 34 16 Q40 2 56 10 Q72 4 78 20 Q94 26 82 40 Q72 50 58 44 Q44 50 26 42Z" fill="#8B8089" {...bold} />
      <path d="M30 24 Q38 18 46 24 M54 18 Q62 14 70 22 M36 36 Q46 30 56 36" {...ln} stroke="#B8AEB6" strokeWidth={2.2} />
      <path d="M52 22 l-5 9 h6 l-5 10" fill="none" stroke="#F7D13D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 94 L36 50 H64 L98 94Z" fill="#5A3A2E" {...bold} />
      <path d="M36 50 Q50 43 64 50 Q50 57 36 50Z" fill="#F7A531" {...o} />
      <path d="M44 53 Q38 66 45 74 Q40 84 34 94" fill="none" stroke="#F26B21" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M56 53 Q62 64 57 72 Q64 82 68 94" fill="none" stroke="#F26B21" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="40" r="1.6" fill="#F7A531" />
      <circle cx="72" cy="38" r="1.6" fill="#F7A531" />
      <circle cx="22" cy="56" r="1.3" fill="#F7A531" />
      <circle cx="80" cy="58" r="1.3" fill="#F7A531" />
      <rect y="92" width="100" height="8" fill="#2F2630" />
      <path d="M74 92 V82 H88 V92 M72 82 L81 76 L90 82Z" fill="#D9C7A6" {...thin} />
    </>
  );
}

function HouseOfWisdom() {
  const ticks = Array.from({ length: 36 }, (_, i) => i);
  return (
    <>
      <rect width="100" height="100" fill="#22406F" />
      <Stars pts={[[18, 20, 1.1], [30, 12], [76, 14, 1.1], [86, 30], [12, 40], [90, 56], [60, 8]]} />
      <path d="M78 12 a9 9 0 1 0 8 13 a7 7 0 1 1 -8 -13Z" fill="#F3D27A" {...thin} />
      <path d="M0 74 H100 V100 H0Z" fill="#17305A" />
      <path d="M6 74 V58 a8 8 0 0 1 16 0 V74 M30 74 V52 a14 14 0 0 1 28 0 V74 M66 74 V60 a9 9 0 0 1 18 0 V74" fill="#2D4E86" {...thin} />
      <path d="M44 38 V32 M44 32 l-2 -3 M44 32 l2 -3" {...ln} stroke="#F3D27A" />
      {/* astrolabe */}
      <circle cx="50" cy="58" r="29" fill="#C99B3D" {...bold} />
      <circle cx="50" cy="58" r="23" fill="#E2BA5C" {...o} />
      {ticks.map((i) => {
        const a = deg(i * 10);
        return <line key={i} x1={50 + 23 * Math.cos(a)} y1={58 + 23 * Math.sin(a)} x2={50 + 27 * Math.cos(a)} y2={58 + 27 * Math.sin(a)} stroke={INK} strokeWidth={i % 3 === 0 ? 1.4 : 0.8} />;
      })}
      <circle cx="50" cy="58" r="14" fill="none" stroke={INK} strokeWidth="1.3" />
      <path d="M50 35 V81 M27 58 H73" {...ln} />
      <path d="M50 58 m-11 -4 a13 13 0 0 1 22 0 M36 66 q14 10 28 0" {...ln} strokeWidth={1.3} />
      <path d="M36 46 l7 9 l-7 2 M62 70 l-8 -8 l8 -3" fill="#B83A24" {...thin} />
      <path d="M33 82 L67 34" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="58" r="3" fill="#B83A24" {...thin} />
      <circle cx="50" cy="26" r="5.5" fill="none" {...bold} />
      <path d="M50 29 V32" {...ln} strokeWidth={3} />
    </>
  );
}

/* ───────────────────────── Panel III ───────────────────────── */

function MansaMusa() {
  return (
    <>
      <rect width="100" height="100" fill="#F8D08A" />
      <Rays cx={74} cy={26} r1={15} r2={20} n={12} color="#F29E2E" w={2.2} />
      <circle cx="74" cy="26" r="13" fill="#F29E2E" {...o} />
      <path d="M0 80 Q30 68 56 78 T100 74 V100 H0Z" fill="#E9B567" {...o} />
      {/* mud-brick mosque */}
      <path d="M48 80 V54 L54 48 H90 L96 54 V80Z" fill="#C58B5B" {...o} />
      {[54, 70, 86].map((x) => (
        <g key={x}>
          <path d={`M${x - 5} 54 L${x} 34 L${x + 5} 54Z`} fill="#B97A4C" {...o} />
          <circle cx={x} cy="31.5" r="2.4" fill="#FBF3D6" {...thin} />
        </g>
      ))}
      {[58, 64, 70].map((y) => (
        <path key={y} d={`M44 ${y} h4 M96 ${y} h4`} {...ln} strokeWidth={1.6} />
      ))}
      <path d="M66 80 V70 a6 6 0 0 1 12 0 V80Z" fill="#3B2A22" {...thin} />
      {/* king */}
      <path d="M8 100 Q6 74 22 66 H40 Q56 74 54 100Z" fill="#2A6FB0" {...bold} />
      <path d="M24 72 Q31 80 38 72" {...ln} stroke="#E9F2FA" strokeWidth={2.2} />
      <circle cx="31" cy="52" r="12" fill="#7A4A2B" {...bold} />
      <path d="M19 44 L21 31 L26 39 L31 27 L36 39 L41 31 L43 44Z" fill="#E7B52F" {...o} />
      <circle cx="31" cy="35" r="1.5" fill="#B83A24" />
      <path d="M26 53 q2 -2 4 0 M33 53 q2 -2 4 0" {...ln} strokeWidth={1.8} stroke="#F5E8D0" />
      <path d="M27 59 q4 3 8 0" {...ln} stroke="#F5E8D0" strokeWidth={1.8} />
      {/* gold nugget */}
      <path d="M52 92 l3 -8 l7 -3 l7 3 l3 8 l-6 4 h-8Z" fill="#F5C542" {...o} />
      <path d="M57 86 l3 -2 M63 90 l3 1" {...ln} stroke="#FFF1B0" strokeWidth={1.6} />
    </>
  );
}

function Press() {
  return (
    <>
      <rect width="100" height="100" fill="#EFDDB8" />
      <path d="M0 90 H100" {...o} />
      <rect x="20" y="22" width="9" height="62" fill="#9C6B3B" {...o} />
      <rect x="71" y="22" width="9" height="62" fill="#9C6B3B" {...o} />
      <rect x="16" y="14" width="68" height="10" rx="1.5" fill="#8A5A33" {...o} />
      {/* screw + lever */}
      <rect x="45" y="24" width="10" height="38" fill="#B07C48" {...o} />
      {[30, 36, 42, 48, 54].map((y) => (
        <path key={y} d={`M45 ${y} l10 3`} stroke={INK} strokeWidth="1.2" />
      ))}
      <path d="M26 42 H74" stroke={INK} strokeWidth="4.6" strokeLinecap="round" />
      <path d="M26 42 H74" stroke="#8A5A33" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="26" cy="42" r="3" fill="#8A5A33" {...thin} />
      <circle cx="74" cy="42" r="3" fill="#8A5A33" {...thin} />
      <rect x="34" y="62" width="32" height="6" fill="#6E4A2A" {...o} />
      <rect x="22" y="68" width="56" height="8" fill="#9C6B3B" {...o} />
      <rect x="14" y="76" width="72" height="9" rx="1" fill="#8A5A33" {...o} />
      {/* printed page */}
      <g transform="rotate(-6 66 80)">
        <rect x="52" y="64" width="34" height="26" fill="#FFFBEF" {...o} />
        <path d="M65 71 H82 M65 76 H82 M65 81 H82 M56 86 H82" stroke={INK} strokeOpacity=".7" strokeWidth="1.3" />
        <text x="54" y="79" fontFamily="serif" fontWeight="700" fontSize="14" fill="#B83A24">A</text>
      </g>
      {/* type slugs */}
      <g {...thin}>
        <rect x="14" y="80" width="9" height="12" fill="#8C9096" />
        <rect x="24" y="82" width="9" height="12" fill="#A0A4A8" />
        <rect x="34" y="84" width="9" height="12" fill="#8C9096" />
      </g>
      <text x="16" y="89" fontFamily="serif" fontWeight="700" fontSize="8" fill={INK}>G</text>
      <text x="26" y="91" fontFamily="serif" fontWeight="700" fontSize="8" fill={INK}>B</text>
    </>
  );
}

function TemplePyramid() {
  return (
    <>
      <rect width="100" height="100" fill="#BFE2EE" />
      <path d="M0 62 L22 36 L34 46 L50 26 L66 46 L78 38 L100 62Z" fill="#8FA89A" {...o} />
      <path d="M50 26 L44 36 Q50 40 56 36Z M22 36 l-5 6 q5 3 10 0Z" fill="#FBF6E8" {...thin} />
      <path d="M50 26 q-4 -8 2 -12 q4 -3 2 -8" fill="none" stroke="#B9BCC2" strokeWidth="2.6" strokeLinecap="round" />
      <rect y="78" width="100" height="22" fill="#3B8FB0" />
      <path d="M0 78 H100" {...o} />
      <path d="M6 88 q4 -3 8 0 t8 0 M70 90 q4 -3 8 0 t8 0" {...ln} stroke="#BFE2EE" strokeWidth={1.6} />
      <path d="M16 79 L23 64 H77 L84 79Z" fill="#E2CFA2" {...bold} />
      <path d="M26 64 L31 50 H69 L74 64Z" fill="#E8D8B0" {...o} />
      <path d="M33 50 L36 40 H64 L67 50Z" fill="#EFE2BE" {...o} />
      <path d="M44 79 L46 40 H54 L56 79Z" fill="#CFBB8C" {...o} />
      {[46, 52, 58, 64, 70].map((y) => (
        <path key={y} d={`M${44.4 + (y - 40) * 0.05} ${y} H${55.6 - (y - 40) * 0.05}`} stroke={INK} strokeOpacity=".5" strokeWidth="1" />
      ))}
      <path d="M36 40 V29 L42 25 L48 29 V40Z" fill="#2F7FB5" {...o} />
      <path d="M52 40 V29 L58 25 L64 29 V40Z" fill="#C0392B" {...o} />
      <path d="M72 38 q-5 -9 1 -14 q2 7 7 5 q3 7 -2 9Z" fill="#F26B21" {...o} />
      <path d="M70 22 q-4 -6 2 -9 q5 -4 10 0 q6 1 3 7" fill="#8F8A92" {...o} />
      <path d="M12 91 Q26 99 42 91 L38 93 H16Z" fill="#8A5A33" {...o} />
    </>
  );
}

function Telescope() {
  return (
    <>
      <rect width="100" height="100" fill="#243A6B" />
      <Stars pts={[[14, 60, 1.1], [26, 40], [40, 14, 1.1], [58, 8], [88, 52], [92, 76, 1.1], [8, 82], [50, 38]]} />
      <circle cx="70" cy="34" r="20" fill="#F2E8C8" {...bold} />
      <circle cx="64" cy="30" r="4" fill="#D8CBA0" {...thin} />
      <circle cx="78" cy="42" r="5" fill="#D8CBA0" {...thin} />
      <circle cx="72" cy="22" r="2.5" fill="#D8CBA0" {...thin} />
      <circle cx="60" cy="42" r="2.3" fill="#D8CBA0" {...thin} />
      <circle cx="24" cy="26" r="7" fill="#D9A066" {...o} />
      <path d="M18 24 H30 M18.5 28 H29.5" stroke="#A8642F" strokeWidth="1.6" />
      <circle cx="12" cy="30" r="1.2" fill="#FBF3D6" />
      <circle cx="35" cy="22" r="1.2" fill="#FBF3D6" />
      <circle cx="39" cy="28" r="1.2" fill="#FBF3D6" />
      <circle cx="8" cy="23" r="1.2" fill="#FBF3D6" />
      {/* tripod */}
      <path d="M34 66 L18 98 M34 66 L52 98 M34 66 L34 96" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M34 66 L18 98 M34 66 L52 98" stroke="#8A5A33" strokeWidth="1.4" strokeLinecap="round" />
      {/* tube */}
      <g transform="rotate(-38 40 64)">
        <rect x="6" y="61" width="9" height="6" rx="1.5" fill="#C99B3D" {...o} />
        <rect x="14" y="59" width="24" height="10" fill="#8A5A33" {...o} />
        <rect x="38" y="57.5" width="26" height="13" fill="#A9743F" {...o} />
        <rect x="64" y="55.5" width="16" height="17" rx="2" fill="#8A5A33" {...o} />
        <path d="M38 57.5 v13 M64 55.5 v17" stroke="#C99B3D" strokeWidth="3" />
        <ellipse cx="80" cy="64" rx="2.4" ry="8" fill="#BFD7E8" {...thin} />
      </g>
    </>
  );
}

function Factory() {
  const teeth = Array.from({ length: 12 }, (_, i) => i);
  const gear = teeth
    .map((i) => {
      const a0 = deg(i * 30 - 9);
      const a1 = deg(i * 30 + 9);
      const a2 = deg(i * 30 + 15 - 6);
      const a3 = deg(i * 30 + 15 + 6);
      const R = 19;
      const r = 14.5;
      const p = (a: number, rad: number) => `${(74 + rad * Math.cos(a)).toFixed(1)} ${(70 + rad * Math.sin(a)).toFixed(1)}`;
      return `${i === 0 ? 'M' : 'L'}${p(a0, r)} L${p(a0 + 0.1, R)} L${p(a1 - 0.1, R)} L${p(a1, r)} L${p(a2, r)} L${p(a3, r)}`;
    })
    .join(' ');
  return (
    <>
      <rect width="100" height="100" fill="#D8CDBB" />
      <path d="M16 36 Q6 32 11 24 Q12 14 25 16 Q32 8 42 15 Q56 12 56 25 Q60 35 48 36 Q34 41 16 36Z" fill="#8F8A86" {...bold} />
      <path d="M22 26 Q28 21 34 26 M40 22 Q46 19 51 25" {...ln} stroke="#B9B4AF" strokeWidth={2.2} />
      <rect x="21" y="36" width="9" height="40" fill="#B5553A" {...o} />
      <rect x="40" y="36" width="9" height="40" fill="#B5553A" {...o} />
      <path d="M21 46 h9 M21 56 h9 M40 46 h9 M40 56 h9" stroke={INK} strokeOpacity=".4" strokeWidth="1" />
      <path d="M8 78 V58 L22 48 V58 L36 48 V58 L50 48 V58 L64 48 V58 H92 V78Z" fill="#C86F45" {...bold} />
      {[14, 28, 42, 56, 70].map((x) => (
        <rect key={x} x={x} y="62" width="7" height="8" fill="#F7D56B" {...thin} />
      ))}
      <rect y="78" width="100" height="22" fill="#9A8F7E" />
      <path d="M0 78 H100" {...o} />
      <path d={`${gear} Z`} fill="#59544F" {...bold} />
      <circle cx="74" cy="70" r="8" fill="#B08D4C" {...o} />
      <circle cx="74" cy="70" r="2.6" fill={INK} />
      <path d="M74 62 V78 M66 70 H82" stroke={INK} strokeWidth="1.3" />
    </>
  );
}

function Rosetta() {
  const row1 = [30, 37, 44, 51, 58, 65];
  return (
    <>
      <rect width="100" height="100" fill="#E8CD92" />
      <rect y="84" width="100" height="16" fill="#D7B574" />
      <path d="M0 84 H100" {...o} />
      <path d="M18 92 V26 L26 16 H54 L60 22 L67 15 L82 24 V92Z" fill="#4B4A50" {...bold} />
      <path d="M22 90 V28 L28 20" fill="none" stroke="#7B7A82" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18 47 H82 M18 66 H82" stroke="#1F1E22" strokeWidth="1.6" />
      {/* hieroglyphs */}
      <g stroke="#E8DFC8" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx={row1[0]} cy="29" rx="3.2" ry="1.8" />
        <circle cx={row1[0]} cy="29" r="0.9" fill="#E8DFC8" />
        <path d={`M${row1[1]} 26 a2.2 2.2 0 1 1 0.01 0 M${row1[1]} 30 V37 M${row1[1] - 2.6} 33 H${row1[1] + 2.6}`} />
        <path d={`M${row1[2] - 3} 31 q1.5 -3 3 0 t3 0`} />
        <path d={`M${row1[3] - 3} 36 q3 -9 6 0 z`} />
        <circle cx={row1[4]} cy="30" r="3" />
        <circle cx={row1[4]} cy="30" r="0.9" fill="#E8DFC8" />
        <path d={`M${row1[5]} 25 v10 M${row1[5] - 3} 28 h6`} />
        <path d="M24 40 q2 -3 4 0 t4 0 M38 41 h5 M46 41 q2 -3 4 0 M54 40 l3 3 l3 -3 M64 41 h8" />
      </g>
      {/* demotic */}
      <g stroke="#E8DFC8" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d="M24 53 q3 -3 5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0" />
        <path d="M24 58 q3 -3 5 0 t5 0 t5 0 t5 0 t5 0 t5 0" />
        <path d="M24 63 q3 -3 5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0" />
      </g>
      {/* Greek */}
      <text x="50" y="76" textAnchor="middle" fontFamily="'Times New Roman', serif" fontWeight="700" fontSize="7.4" fill="#E8DFC8" letterSpacing="0.8">ΒΑΣΙΛΕΥΣ</text>
      <text x="50" y="85" textAnchor="middle" fontFamily="'Times New Roman', serif" fontWeight="700" fontSize="7.4" fill="#E8DFC8" letterSpacing="0.8">ΠΤΟΛΕΜΑΙΟΣ</text>
    </>
  );
}

/* ───────────────────────── Panel IV ───────────────────────── */

function Flu() {
  return (
    <>
      <rect width="100" height="100" fill="#DCE6C8" />
      <g>
        <Rays cx={78} cy={22} r1={9} r2={13} n={9} color={INK} w={1.8} />
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={78 + 14 * Math.cos(deg(i * 40))} cy={22 + 14 * Math.sin(deg(i * 40))} r="2.4" fill="#F2B138" {...thin} />
        ))}
        <circle cx="78" cy="22" r="9" fill="#D9533A" {...o} />
        <circle cx="75" cy="19" r="1.6" fill="#F5C0B0" />
        <circle cx="82" cy="25" r="1.3" fill="#F5C0B0" />
      </g>
      <path d="M14 100 Q16 74 36 70 H64 Q84 74 86 100Z" fill="#F4F4F0" {...bold} />
      <rect x="44" y="82" width="12" height="4" fill="#D93B2B" />
      <rect x="48" y="78" width="4" height="12" fill="#D93B2B" />
      <circle cx="50" cy="50" r="20" fill="#EBC9A0" {...bold} />
      <path d="M30 44 Q30 24 50 24 Q70 24 70 44 Q50 37 30 44Z" fill="#FFFFFF" {...o} />
      <rect x="47.5" y="27" width="5" height="12" fill="#D93B2B" opacity=".9" />
      <rect x="44" y="30.5" width="12" height="5" fill="#D93B2B" opacity=".9" />
      <path d="M37 47 q4 -4 8 0 M55 47 q4 -4 8 0" {...ln} strokeWidth={2.2} />
      <path d="M36 41 l9 2.4 M64 41 l-9 2.4" {...ln} strokeWidth={1.8} />
      <path d="M32 54 Q50 50 68 54 Q67 70 50 72 Q33 70 32 54Z" fill="#FFFFFF" {...o} />
      <path d="M35 60 H65 M36 65 H64" stroke={INK} strokeOpacity=".35" strokeWidth="1.2" />
      <path d="M32 54 Q26 50 29 44 M68 54 Q74 50 71 44" {...ln} strokeWidth={1.4} />
    </>
  );
}

function Atom() {
  return (
    <>
      <rect width="100" height="100" fill="#E8833A" />
      <rect y="46" width="100" height="54" fill="#F6B85B" />
      <path d="M0 78 L16 62 L30 72 L48 58 L66 72 L82 62 L100 74 V100 H0Z" fill="#6B4A3A" {...o} />
      <rect y="84" width="100" height="16" fill="#C98F55" />
      <path d="M0 84 H100" {...o} />
      <path d="M42 86 Q47 72 45 58 H55 Q53 72 58 86Z" fill="#E2602F" {...o} />
      <path d="M28 54 Q15 46 23 35 Q21 22 36 22 Q42 9 57 17 Q74 14 74 31 Q87 39 77 50 Q66 59 50 55 Q40 61 28 54Z" fill="#F4B63F" {...bold} />
      <path d="M34 42 Q42 34 52 40 Q60 30 68 40" {...ln} stroke="#B8651F" strokeWidth={2.2} />
      <path d="M32 48 Q50 54 68 46" {...ln} stroke="#B8651F" strokeWidth={2} />
      <circle cx="50" cy="35" r="7" fill="#FFF0A8" />
      <circle cx="50" cy="86" r="9" fill="#FFF2B0" {...thin} />
      <path d="M36 88 H22 M64 88 H78 M50 100 V96" {...ln} stroke="#FFF2B0" strokeWidth={2.4} />
      <path d="M14 82 V68 M10 68 H18" {...ln} strokeWidth={2} />
    </>
  );
}

function Astronaut() {
  const stripes = Array.from({ length: 5 }, (_, i) => i);
  return (
    <>
      <rect width="100" height="100" fill="#14162B" />
      <Stars pts={[[12, 20, 1.1], [30, 10], [50, 22], [90, 8, 1.2], [8, 52], [60, 6], [44, 40, 0.7]]} />
      <circle cx="76" cy="26" r="13" fill="#2F7FC0" {...o} />
      <path d="M68 22 q4 -5 9 -2 q3 5 -2 8 q-6 1 -7 -6Z M79 33 q4 -2 6 2 q-3 3 -6 -2Z" fill="#3FA66B" {...thin} />
      <path d="M66 28 q6 -2 12 2 M72 17 q6 -2 10 3" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M0 76 Q30 66 60 74 T100 72 V100 H0Z" fill="#B9B7B0" {...o} />
      <ellipse cx="22" cy="86" rx="9" ry="3.4" fill="#9E9C95" {...thin} />
      <ellipse cx="78" cy="90" rx="10" ry="3.4" fill="#9E9C95" {...thin} />
      {/* flag */}
      <path d="M72 38 V84" stroke="#E8E8E8" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="72" y="38" width="22" height="15" fill="#FFFFFF" {...thin} />
      {stripes.map((i) => (
        <rect key={i} x="72" y={38 + i * 3} width="22" height="1.5" fill="#D93B2B" />
      ))}
      <rect x="72" y="38" width="9" height="8" fill="#2A4FA3" />
      <path d="M74 41 h1 M77 41 h1 M75.5 43.5 h1 M78.5 43.5 h1" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      {/* astronaut */}
      <rect x="26" y="46" width="11" height="26" rx="3" fill="#D8D8D8" {...o} />
      <path d="M32 62 L24 46 M30 44 L42 40" stroke={INK} strokeWidth="0.1" />
      <rect x="35" y="70" width="8" height="18" rx="3" fill="#F2F2F2" {...o} />
      <rect x="45" y="70" width="8" height="18" rx="3" fill="#F2F2F2" {...o} />
      <rect x="34" y="84" width="10" height="6" rx="2.5" fill="#6B6E75" {...o} />
      <rect x="44" y="84" width="10" height="6" rx="2.5" fill="#6B6E75" {...o} />
      <rect x="34" y="50" width="22" height="24" rx="7" fill="#FFFFFF" {...bold} />
      <rect x="38" y="60" width="8" height="5" rx="1" fill="#D93B2B" {...thin} />
      <path d="M55 56 L66 46 L70 42" fill="none" stroke={INK} strokeWidth="6.4" strokeLinecap="round" />
      <path d="M55 56 L66 46 L70 42" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
      <circle cx="46" cy="36" r="12.5" fill="#FFFFFF" {...bold} />
      <ellipse cx="49" cy="37" rx="8" ry="7" fill="#E0A82E" {...o} />
      <path d="M45 33 q3 -3 6 -1" fill="none" stroke="#FFF1B0" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function Dna() {
  const N = 90;
  const samples = Array.from({ length: N + 1 }, (_, i) => {
    const y = 8 + (i * 84) / N;
    const p = (i / N) * Math.PI * 5;
    return { y, s: Math.sin(p), c: Math.cos(p) };
  });
  const strand = (sign: 1 | -1, front: boolean) => {
    let d = '';
    let pen = false;
    samples.forEach((p, i) => {
      const isFront = sign * p.c >= 0;
      const x = 50 + 20 * sign * p.s;
      if (isFront === front) {
        d += `${pen ? 'L' : 'M'}${x.toFixed(1)} ${p.y.toFixed(1)}`;
        pen = true;
      } else {
        if (pen && samples[i - 1]) d += `L${x.toFixed(1)} ${p.y.toFixed(1)}`;
        pen = false;
      }
    });
    return d;
  };
  const rungs = samples.filter((_, i) => i % 6 === 3);
  const colours = ['#B83A24', '#2A7B88', '#C2882E', '#78184A'];
  return (
    <>
      <rect width="100" height="100" fill="#CDE5E6" />
      <circle cx="50" cy="50" r="40" fill="#E4F2F0" opacity=".7" />
      {rungs.map((p, i) => (
        <path key={i} d={`M${(50 - 20 * p.s).toFixed(1)} ${p.y.toFixed(1)} L${(50 + 20 * p.s).toFixed(1)} ${p.y.toFixed(1)}`} stroke={colours[i % 4]} strokeWidth="3.2" strokeLinecap="round" />
      ))}
      <path d={strand(1, false)} fill="none" stroke="#1E4378" strokeWidth="4.4" strokeLinecap="round" opacity=".55" />
      <path d={strand(-1, false)} fill="none" stroke="#B83A24" strokeWidth="4.4" strokeLinecap="round" opacity=".55" />
      <path d={strand(1, true)} fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <path d={strand(1, true)} fill="none" stroke="#2D5FA8" strokeWidth="5" strokeLinecap="round" />
      <path d={strand(-1, true)} fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <path d={strand(-1, true)} fill="none" stroke="#D9533A" strokeWidth="5" strokeLinecap="round" />
    </>
  );
}

export const VIGNETTES: Record<string, () => ReactNode> = {
  't-pillar': Gobekli,
  pyramid: Pyramid,
  seal: Seal,
  stele: Stele,
  'oracle-bone': OracleBone,
  'colossal-head': ColossalHead,
  scroll: Sage,
  library: Library,
  volcano: Volcano,
  book: HouseOfWisdom,
  coins: MansaMusa,
  press: Press,
  'temple-pyramid': TemplePyramid,
  telescope: Telescope,
  factory: Factory,
  rosetta: Rosetta,
  virus: Flu,
  atom: Atom,
  rocket: Astronaut,
  dna: Dna,
};

/** Draws a vignette on the 100×100 sheet (callers translate/scale/clip). */
export function Vignette({ type }: { type: string }) {
  const Draw = VIGNETTES[type];
  return Draw ? <>{Draw()}</> : <rect width="100" height="100" fill="#EADECA" />;
}
