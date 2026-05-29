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
          <Node x={724}  y={58}  r={rO} value={v.B} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={72}   y={400} r={rO} value={v.A} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={1376} y={400} r={rO} value={v.C} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={285}  y={828} r={rO} value={v.E} fontSize={fsO} ringColor={GOLD}  sw={5} />
          <Node x={1163} y={828} r={rO} value={v.D} fontSize={fsO} ringColor={GOLD}  sw={5} />

          {/* ── Inner intersections ── */}
          <Node x={430}  y={390} r={rI} value={v.AB} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={890}  y={390} r={rI} value={v.BC} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={448}  y={628} r={rI} value={v.EA} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={908}  y={628} r={rI} value={v.CD} fontSize={fsI} ringColor={GOLD2} sw={3} />
          <Node x={660}  y={742} r={rI} value={v.DE} fontSize={fsI} ringColor={GOLD2} sw={3} />

          {/* ── Center ── */}
          <Node x={660}  y={542} r={rC} value={v.F}  fontSize={fsC} ringColor={GOLD}  sw={4} />

          {/* ── Midpoint numbers (small, no ring) ── */}
          {([
            [250,  396, v.A_AB ],  [660,  390, v.AB_BC], [1120, 396, v.BC_C ],
            [810,  224, v.B_BC ],  [896,  510, v.BC_CD], [1022, 730, v.CD_D ],
            [1130, 518, v.C_CD ],  [786,  686, v.CD_DE], [472,  784, v.DE_E ],
            [900,  784, v.D_DE ],  [554,  686, v.DE_EA], [258,  518, v.EA_A ],
            [366,  730, v.E_EA ],  [440,  510, v.EA_AB], [578,  224, v.AB_B ],
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
