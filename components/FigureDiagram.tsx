"use client";
import type { StarData } from "@/lib/calculate";

const GOLD   = "#E8C878";
const GOLD2  = "#C8973A";
const FILL   = "rgba(20,10,3,0.93)";
const TEXT   = "#EDE0C4";
const MUTED  = "#B09070";

function Node({ x, y, r, value, fontSize, ringColor, sw }: {
  x: number; y: number; r: number; value: number | null;
  fontSize: number; ringColor: string; sw: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y + 4} r={r} fill="rgba(0,0,0,0.15)" />
      <circle cx={x} cy={y} r={r} fill={FILL} stroke={ringColor} strokeWidth={sw} />
      {value !== null && (
        <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
          fill={TEXT} fontSize={fontSize} fontWeight="700"
          fontFamily="var(--font-montserrat), system-ui, sans-serif">
          {value}
        </text>
      )}
    </g>
  );
}

export default function FigureDiagram({ data, maxWidth = 500 }: {
  data: StarData | null; maxWidth?: number;
}) {
  const v = data;

  // SVG viewBox matches image pixel dimensions
  const W = 1448, H = 1086;

  // Circle sizes (in image px)
  const rO = 62, rI = 40, rC = 50;
  const fsO = 46, fsI = 32, fsC = 38, fsS = 24;

  // Outer vertices (A=left-hand, B=head-top, C=right-hand, D=right-foot, E=left-foot)
  const oA = { x: 76,   y: 430 };
  const oB = { x: 724,  y: 90  };
  const oC = { x: 1372, y: 430 };
  const oD = { x: 1178, y: 855 };
  const oE = { x: 270,  y: 855 };

  // Inner intersections — computed as geometric star line intersections
  // AB = A→C ∩ E→B, BC = A→C ∩ B→D, CD = B→D ∩ C→E, DE = C→E ∩ D→A, EA = D→A ∩ E→B
  const iAB = { x: 522,  y: 430 };
  const iBC = { x: 926,  y: 430 };
  const iCD = { x: 1009, y: 570 };
  const iDE = { x: 724,  y: 680 };
  const iEA = { x: 439,  y: 570 };

  const cF  = { x: 724,  y: 536 };

  // Midpoints (avg of two adjacent nodes)
  function mp(a: {x:number;y:number}, b: {x:number;y:number}) {
    return { x: Math.round((a.x+b.x)/2), y: Math.round((a.y+b.y)/2) };
  }

  const mA_AB   = mp(oA,  iAB);
  const mAB_BC  = mp(iAB, iBC);
  const mBC_C   = mp(iBC, oC);
  const mB_BC   = mp(oB,  iBC);
  const mBC_CD  = mp(iBC, iCD);
  const mCD_D   = mp(iCD, oD);
  const mC_CD   = mp(oC,  iCD);
  const mCD_DE  = mp(iCD, iDE);
  const mDE_E   = mp(iDE, oE);
  const mD_DE   = mp(oD,  iDE);
  const mDE_EA  = mp(iDE, iEA);
  const mEA_A   = mp(iEA, oA);
  const mE_EA   = mp(oE,  iEA);
  const mEA_AB  = mp(iEA, iAB);
  const mAB_B   = mp(iAB, oB);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth, margin: "0 auto" }}>
      <img src="/figure.png" alt="archetype diagram"
        style={{ width: "100%", display: "block", borderRadius: 12 }} />

      {v && (
        <svg viewBox={`0 0 ${W} ${H}`}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>

          {/* ── Outer vertices ── */}
          <Node x={oB.x} y={oB.y} r={rO} value={v.B} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={oA.x} y={oA.y} r={rO} value={v.A} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={oC.x} y={oC.y} r={rO} value={v.C} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={oE.x} y={oE.y} r={rO} value={v.E} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={oD.x} y={oD.y} r={rO} value={v.D} fontSize={fsO} ringColor={GOLD}  sw={5} />

          {/* ── Inner intersections ── */}
          <Node x={iAB.x} y={iAB.y} r={rI} value={v.AB} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={iBC.x} y={iBC.y} r={rI} value={v.BC} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={iEA.x} y={iEA.y} r={rI} value={v.EA} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={iCD.x} y={iCD.y} r={rI} value={v.CD} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={iDE.x} y={iDE.y} r={rI} value={v.DE} fontSize={fsI} ringColor={GOLD2} sw={3} />

          {/* ── Center ── */}
          <Node x={cF.x} y={cF.y} r={rC} value={v.F} fontSize={fsC} ringColor={GOLD} sw={4} />

          {/* ── Midpoint numbers (small, no ring) ── */}
          {([
            [mA_AB,  v.A_AB ],  [mAB_BC, v.AB_BC], [mBC_C,  v.BC_C ],
            [mB_BC,  v.B_BC ],  [mBC_CD, v.BC_CD], [mCD_D,  v.CD_D ],
            [mC_CD,  v.C_CD ],  [mCD_DE, v.CD_DE], [mDE_E,  v.DE_E ],
            [mD_DE,  v.D_DE ],  [mDE_EA, v.DE_EA], [mEA_A,  v.EA_A ],
            [mE_EA,  v.E_EA ],  [mEA_AB, v.EA_AB], [mAB_B,  v.AB_B ],
          ] as [{x:number;y:number}, number | null | undefined][]).map(([pos, val], i) =>
            val != null ? (
              <text key={i} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="central"
                fill={MUTED} fontSize={fsS} fontWeight="600"
                fontFamily="var(--font-montserrat), system-ui, sans-serif">
                {val}
              </text>
            ) : null
          )}
        </svg>
      )}
    </div>
  );
}
