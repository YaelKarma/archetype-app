export interface StarData {
  // ── 5 outer vertices ──────────────────────────────
  A: number;  // left      (288°)
  B: number;  // top       (0°)
  C: number;  // right     (72°)
  D: number;  // btm-right (144°)
  E: number;  // btm-left  (216°)
  // ── center ───────────────────────────────────────
  F: number;
  // ── 5 inner intersections ─────────────────────────
  AB: number;   // (324°) — intersection of A→C and E→B
  BC: number;   // (36°)  — intersection of A→C and B→D
  CD: number;   // (108°) — intersection of B→D and C→E
  DE: number;   // (180°) — intersection of C→E and D→A
  EA: number;   // (252°) — intersection of D→A and E→B
  // ── on line A→C (horizontal row) ─────────────────
  A_AB:  number;  // midpoint(A,  AB)
  AB_BC: number;  // midpoint(AB, BC)  ← center of row
  BC_C:  number;  // midpoint(BC, C)
  // ── on line B→D ───────────────────────────────────
  B_BC:  number;  // midpoint(B,  BC)
  BC_CD: number;  // midpoint(BC, CD)
  CD_D:  number;  // midpoint(CD, D)
  // ── on line C→E ───────────────────────────────────
  C_CD:  number;  // midpoint(C,  CD)
  CD_DE: number;  // midpoint(CD, DE)
  DE_E:  number;  // midpoint(DE, E)
  // ── on line D→A ───────────────────────────────────
  D_DE:  number;  // midpoint(D,  DE)
  DE_EA: number;  // midpoint(DE, EA)
  EA_A:  number;  // midpoint(EA, A)
  // ── on line E→B ───────────────────────────────────
  E_EA:  number;  // midpoint(E,  EA)
  EA_AB: number;  // midpoint(EA, AB)
  AB_B:  number;  // midpoint(AB, B)
}

function sumDigits(n: number): number {
  return String(n).split("").reduce((s, d) => s + parseInt(d, 10), 0);
}

export function reduceTo22(n: number): number {
  while (n > 22) n = sumDigits(n);
  return n;
}

export function calculate(day: number, month: number, year: number): StarData {
  // ── outer vertices ──────────────────────────────────────
  const A = reduceTo22(day);
  const B = reduceTo22(month);
  const C = reduceTo22(sumDigits(year));
  const D = reduceTo22(A + B + C);
  const E = reduceTo22(A + B + C + D);
  const F = reduceTo22(A + B + C + D + E);

  // ── inner intersections ─────────────────────────────────
  const AB = reduceTo22(A + B);
  const BC = reduceTo22(B + C);
  const CD = reduceTo22(C + D);
  const DE = reduceTo22(D + E);
  const EA = reduceTo22(E + A);

  // ── on line A→C ────────────────────────────────────────
  const A_AB  = reduceTo22(A  + AB);
  const AB_BC = reduceTo22(AB + BC);
  const BC_C  = reduceTo22(BC + C);

  // ── on line B→D ────────────────────────────────────────
  const B_BC  = reduceTo22(B  + BC);
  const BC_CD = reduceTo22(BC + CD);
  const CD_D  = reduceTo22(CD + D);

  // ── on line C→E ────────────────────────────────────────
  const C_CD  = reduceTo22(C  + CD);
  const CD_DE = reduceTo22(CD + DE);
  const DE_E  = reduceTo22(DE + E);

  // ── on line D→A ────────────────────────────────────────
  const D_DE  = reduceTo22(D  + DE);
  const DE_EA = reduceTo22(DE + EA);
  const EA_A  = reduceTo22(EA + A);

  // ── on line E→B ────────────────────────────────────────
  const E_EA  = reduceTo22(E  + EA);
  const EA_AB = reduceTo22(EA + AB);
  const AB_B  = reduceTo22(AB + B);

  return {
    A, B, C, D, E, F,
    AB, BC, CD, DE, EA,
    A_AB, AB_BC, BC_C,
    B_BC, BC_CD, CD_D,
    C_CD, CD_DE, DE_E,
    D_DE, DE_EA, EA_A,
    E_EA, EA_AB, AB_B,
  };
}
