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

  return (
    <div style={{ position: "relative", width: "100%", maxWidth, margin: "0 auto" }}>
      <img src="/figure.png" alt="archetype diagram"
        style={{ width: "100%", display: "block", borderRadius: 12 }} />

      {v && (
        <svg viewBox={`0 0 ${W} ${H}`}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>

          {/* ── Outer vertices ── */}
          <Node x={724}  y={90}  r={rO} value={v.B} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={72}   y={425} r={rO} value={v.A} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={1376} y={425} r={rO} value={v.C} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={270}  y={855} r={rO} value={v.E} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={1178} y={855} r={rO} value={v.D} fontSize={fsO} ringColor={GOLD}  sw={5} />

          {/* ── Inner intersections ── */}
          <Node x={425}  y={385} r={rI} value={v.AB} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={890}  y={385} r={rI} value={v.BC} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={440}  y={625} r={rI} value={v.EA} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={910}  y={625} r={rI} value={v.CD} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={660}  y={748} r={rI} value={v.DE} fontSize={fsI} ringColor={GOLD2} sw={3} />

          {/* ── Center ── */}
          <Node x={660}  y={538} r={rC} value={v.F}  fontSize={fsC} ringColor={GOLD}  sw={4} />

          {/* ── Midpoint numbers (small, no ring) ── */}
          {([
            [248,  405, v.A_AB ],  [657,  385, v.AB_BC], [1133, 405, v.BC_C ],
            [807,  237, v.B_BC ],  [900,  505, v.BC_CD], [1044, 740, v.CD_D ],
            [1143, 525, v.C_CD ],  [785,  686, v.CD_DE], [465,  801, v.DE_E ],
            [919,  801, v.D_DE ],  [550,  686, v.DE_EA], [256,  525, v.EA_A ],
            [355,  740, v.E_EA ],  [432,  505, v.EA_AB], [574,  237, v.AB_B ],
          ] as [number, number, number | null | undefined][]).map(([x, y, val], i) =>
            val != null ? (
              <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
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
