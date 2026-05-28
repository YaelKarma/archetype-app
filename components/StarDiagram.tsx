"use client";

import type { StarData } from "@/lib/calculate";

function pt(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function mid(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
function lerp(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

const PHI_SQ  = ((1 + Math.sqrt(5)) / 2) ** 2;
const R_RATIO = 1 / PHI_SQ;

type P = { x: number; y: number };

// ─── Vitruvian figure ────────────────────────────────────────
function VitruvianFigure({ cx, cy, R, vA, vB, vC, vD, vE, dark = false }: {
  cx: number; cy: number; R: number;
  vA: P; vB: P; vC: P; vD: P; vE: P; dark?: boolean;
}) {
  const h      = R * 0.226;
  const hR     = h * 0.50;
  const hCy    = cy - R + hR;
  const neckBY = cy - R + h * 1.36;
  const shouldY = cy - R + h * 2.02;
  const shouldW = R * 0.232;
  const pecY   = cy - R + h * 2.88;
  const pecW   = R * 0.202;
  const waistY = cy - R + h * 3.76;
  const waistW = R * 0.134;
  const hipY   = cy - R + h * 4.22;
  const hipW   = R * 0.184;
  const crotchY = cy - R + h * 4.66;

  const elbowL = lerp({ x: cx - shouldW, y: shouldY }, vA, 0.52);
  const elbowR = lerp({ x: cx + shouldW, y: shouldY }, vC, 0.52);
  const kneeL  = lerp({ x: cx - hipW * 0.55, y: crotchY }, vE, 0.52);
  const kneeR  = lerp({ x: cx + hipW * 0.55, y: crotchY }, vD, 0.52);

  const INK = dark ? "#F5E8C0" : "#6B4F30";
  const SW  = dark ? 2.8 : 1.4;

  return (
    <g stroke={INK} fill="none" strokeLinecap="round" strokeLinejoin="round"
       strokeWidth={SW} opacity={dark ? 1.0 : 0.55}>

      {/* Head */}
      <ellipse cx={cx} cy={hCy} rx={hR * 0.88} ry={hR} />

      {/* Neck */}
      <line x1={cx - hR * 0.28} y1={hCy + hR} x2={cx - hR * 0.36} y2={neckBY} />
      <line x1={cx + hR * 0.28} y1={hCy + hR} x2={cx + hR * 0.36} y2={neckBY} />

      {/* Trapezius */}
      <path d={`M ${cx - hR*0.36},${neckBY}
                C ${cx - shouldW*0.5},${neckBY + h*0.12}
                  ${cx - shouldW*0.92},${shouldY - h*0.06}
                  ${cx - shouldW},${shouldY}`} />
      <path d={`M ${cx + hR*0.36},${neckBY}
                C ${cx + shouldW*0.5},${neckBY + h*0.12}
                  ${cx + shouldW*0.92},${shouldY - h*0.06}
                  ${cx + shouldW},${shouldY}`} />

      {/* Left body outline */}
      <path d={`M ${cx - shouldW},${shouldY}
                C ${cx - shouldW*1.08},${pecY - h*0.08}
                  ${cx - pecW*1.10},${pecY + h*0.06}
                  ${cx - pecW*0.82},${waistY - h*0.2}
                C ${cx - waistW*1.35},${waistY}
                  ${cx - hipW},${hipY}
                  ${cx - hipW*0.55},${crotchY}`} />
      {/* Right body outline */}
      <path d={`M ${cx + shouldW},${shouldY}
                C ${cx + shouldW*1.08},${pecY - h*0.08}
                  ${cx + pecW*1.10},${pecY + h*0.06}
                  ${cx + pecW*0.82},${waistY - h*0.2}
                C ${cx + waistW*1.35},${waistY}
                  ${cx + hipW},${hipY}
                  ${cx + hipW*0.55},${crotchY}`} />

      {/* Pec lines */}
      <path d={`M ${cx - pecW*0.72},${pecY}
                Q ${cx - pecW*0.18},${pecY + h*0.07}
                  ${cx},${pecY}`} />
      <path d={`M ${cx},${pecY}
                Q ${cx + pecW*0.18},${pecY + h*0.07}
                  ${cx + pecW*0.72},${pecY}`} />

      {/* Sternum */}
      <line x1={cx} y1={neckBY + h*0.10} x2={cx} y2={waistY} strokeWidth={SW*0.55} />

      {/* Abs hint */}
      <path d={`M ${cx - R*0.062},${waistY - h*0.16}
                Q ${cx},${waistY - h*0.10}
                  ${cx + R*0.062},${waistY - h*0.16}`} strokeWidth={SW*0.65} />

      {/* Navel */}
      <circle cx={cx} cy={cy} r={R * 0.016} />

      {/* Left arm upper */}
      <path d={`M ${cx - shouldW},${shouldY}
                C ${cx - shouldW*1.1},${shouldY + h*0.06}
                  ${elbowL.x + R*0.04},${elbowL.y - h*0.08}
                  ${elbowL.x},${elbowL.y}`} />
      {/* Left arm lower */}
      <path d={`M ${elbowL.x},${elbowL.y}
                C ${elbowL.x - R*0.04},${elbowL.y + h*0.07}
                  ${vA.x + R*0.05},${vA.y - h*0.04}
                  ${vA.x},${vA.y}`} />

      {/* Right arm upper */}
      <path d={`M ${cx + shouldW},${shouldY}
                C ${cx + shouldW*1.1},${shouldY + h*0.06}
                  ${elbowR.x - R*0.04},${elbowR.y - h*0.08}
                  ${elbowR.x},${elbowR.y}`} />
      {/* Right arm lower */}
      <path d={`M ${elbowR.x},${elbowR.y}
                C ${elbowR.x + R*0.04},${elbowR.y + h*0.07}
                  ${vC.x - R*0.05},${vC.y - h*0.04}
                  ${vC.x},${vC.y}`} />

      {/* Left leg upper */}
      <path d={`M ${cx - hipW*0.55},${crotchY}
                C ${cx - hipW*0.88},${crotchY + h*0.10}
                  ${kneeL.x + R*0.04},${kneeL.y - h*0.08}
                  ${kneeL.x},${kneeL.y}`} />
      {/* Left leg lower */}
      <path d={`M ${kneeL.x},${kneeL.y}
                C ${kneeL.x - R*0.04},${kneeL.y + h*0.07}
                  ${vE.x + R*0.05},${vE.y - h*0.04}
                  ${vE.x},${vE.y}`} />

      {/* Right leg upper */}
      <path d={`M ${cx + hipW*0.55},${crotchY}
                C ${cx + hipW*0.88},${crotchY + h*0.10}
                  ${kneeR.x - R*0.04},${kneeR.y - h*0.08}
                  ${kneeR.x},${kneeR.y}`} />
      {/* Right leg lower */}
      <path d={`M ${kneeR.x},${kneeR.y}
                C ${kneeR.x + R*0.04},${kneeR.y + h*0.07}
                  ${vD.x - R*0.05},${vD.y - h*0.04}
                  ${vD.x},${vD.y}`} />

      {/* Da Vinci circle */}
      <circle cx={cx} cy={cy} r={R * 1.04} strokeDasharray="4,6" opacity={0.45} />
    </g>
  );
}

// ─── Number node ─────────────────────────────────────────────
function LabelNode({ x, y, value, fontSize, ring = 0, ringColor = "#786551",
  textColor = "#57483C", strokeWidth = 1, fill = "none" }: {
  x: number; y: number; value: number | null; fontSize: number;
  ring?: number; ringColor?: string; textColor?: string; strokeWidth?: number;
  fill?: string;
}) {
  return (
    <g>
      {ring > 0 && (
        <>
          {/* shadow */}
          <circle cx={x} cy={y + 1.8} r={ring} fill="rgba(90,60,30,0.10)" />
          <circle cx={x} cy={y} r={ring}
            fill={fill} stroke={ringColor} strokeWidth={strokeWidth} />
        </>
      )}
      {value !== null && (
        <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
          fill={textColor} fontSize={fontSize} fontWeight="700"
          fontFamily="var(--font-montserrat), system-ui, sans-serif">
          {value}
        </text>
      )}
    </g>
  );
}

interface Props { data: StarData | null; size?: number; dark?: boolean; }

export default function StarDiagram({ data, size = 460, dark = false }: Props) {
  const cx = size / 2, cy = size / 2;
  const R  = size * 0.385;
  const ri = R * R_RATIO;

  const vB = pt(cx, cy, R, 0);   const vC = pt(cx, cy, R, 72);
  const vD = pt(cx, cy, R, 144); const vE = pt(cx, cy, R, 216);
  const vA = pt(cx, cy, R, 288); const vF = { x: cx, y: cy };

  const iAB = pt(cx, cy, ri, 324); const iBC = pt(cx, cy, ri, 36);
  const iCD = pt(cx, cy, ri, 108); const iDE = pt(cx, cy, ri, 180);
  const iEA = pt(cx, cy, ri, 252);

  const pA_AB  = mid(vA, iAB);  const pAB_BC = mid(iAB, iBC);
  const pBC_C  = mid(iBC, vC);  const pB_BC  = mid(vB, iBC);
  const pBC_CD = mid(iBC, iCD); const pCD_D  = mid(iCD, vD);
  const pC_CD  = mid(vC, iCD);  const pCD_DE = mid(iCD, iDE);
  const pDE_E  = mid(iDE, vE);  const pD_DE  = mid(vD, iDE);
  const pDE_EA = mid(iDE, iEA); const pEA_A  = mid(iEA, vA);
  const pE_EA  = mid(vE, iEA);  const pEA_AB = mid(iEA, iAB);
  const pAB_B  = mid(iAB, vB);

  const BROWN  = dark ? "#EDE0C4" : "#3A2A1A";
  const DARK   = dark ? "#EDE0C4" : "#1A0E06";
  const GOLD   = dark ? "#E8C878" : "#C8973A";
  const MUTED  = dark ? "#B09070" : "#8a7060";
  const CREAM  = dark ? "rgba(26,15,7,0.97)"  : "rgba(248,238,215,0.97)";
  const CREAM2 = dark ? "rgba(30,18,8,0.95)"  : "rgba(245,234,208,0.94)";

  const starPath = [vB, vD, vA, vC, vE]
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + "Z";
  const innerPath = [iAB, iBC, iCD, iDE, iEA]
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + "Z";

  // Font sizes
  const fsO = R * 0.105;
  const fsI = R * 0.082;
  const fsS = R * 0.066;
  const fsC = R * 0.098;
  // Ring radii
  const rO = R * 0.138;
  const rI = R * 0.090;
  const rC = R * 0.108;

  const v = data;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Vitruvian figure */}
      <VitruvianFigure cx={cx} cy={cy} R={R} vA={vA} vB={vB} vC={vC} vD={vD} vE={vE} dark={dark} />

      {/* Pentagram */}
      <path d={starPath} fill="none" stroke={GOLD} strokeWidth={1.8}
            strokeLinejoin="round" opacity={0.80} />
      <path d={innerPath} fill="none" stroke={GOLD} strokeWidth={1.0} opacity={0.45} />

      {/* Midpoints — plain numbers, no ring */}
      {([
        [pA_AB,  v?.A_AB ], [pAB_BC, v?.AB_BC], [pBC_C,  v?.BC_C ],
        [pB_BC,  v?.B_BC ], [pBC_CD, v?.BC_CD], [pCD_D,  v?.CD_D ],
        [pC_CD,  v?.C_CD ], [pCD_DE, v?.CD_DE], [pDE_E,  v?.DE_E ],
        [pD_DE,  v?.D_DE ], [pDE_EA, v?.DE_EA], [pEA_A,  v?.EA_A ],
        [pE_EA,  v?.E_EA ], [pEA_AB, v?.EA_AB], [pAB_B,  v?.AB_B ],
      ] as [P, number | null | undefined][]).map(([pos, val], i) => (
        <LabelNode key={i} x={pos.x} y={pos.y}
          value={val ?? null} fontSize={fsS} textColor={MUTED} />
      ))}

      {/* Inner intersections — cream filled ring with gold border */}
      {([
        [iAB, v?.AB], [iBC, v?.BC], [iCD, v?.CD], [iDE, v?.DE], [iEA, v?.EA],
      ] as [P, number | null | undefined][]).map(([pos, val], i) => (
        <LabelNode key={i} x={pos.x} y={pos.y} value={val ?? null}
          fontSize={fsI} ring={rI} fill={CREAM2}
          ringColor={GOLD} strokeWidth={1.4} textColor={BROWN} />
      ))}

      {/* Center — cream with dark border */}
      <LabelNode x={vF.x} y={vF.y} value={v?.F ?? null}
        fontSize={fsC} ring={rC} fill={CREAM2}
        ringColor={DARK} strokeWidth={1.8} textColor={BROWN} />

      {/* Outer vertices — large circles with thick border */}
      {([
        [vA, v?.A], [vB, v?.B], [vC, v?.C], [vD, v?.D], [vE, v?.E],
      ] as [P, number | null | undefined][]).map(([pos, val], i) => (
        <LabelNode key={i} x={pos.x} y={pos.y} value={val ?? null}
          fontSize={fsO} ring={rO} fill={CREAM}
          ringColor={dark ? GOLD : "#1A0E06"} strokeWidth={3.0}
          textColor={dark ? "#EDE0C4" : "#1A0E06"} />
      ))}
    </svg>
  );
}
