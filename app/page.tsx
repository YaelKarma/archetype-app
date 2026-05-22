"use client";

import { useState } from "react";
import StarDiagram from "@/components/StarDiagram";
import DateInput from "@/components/DateInput";
import { calculate, type StarData } from "@/lib/calculate";
import { getArchetype } from "@/lib/archetypes";

type Step = "form" | "result";

const BG      = "#1A0F07";
const BG2     = "#231408";
const CREAM   = "#EDE0C4";
const CREAM2  = "#D4C4A0";
const GOLD    = "#C8973A";
const GOLD2   = "#E8C878";
const BORDER  = "rgba(200,151,58,0.22)";
const MUTED   = "#C8B490";

const btnGold: React.CSSProperties = {
  width: "100%", padding: "16px 0", borderRadius: 50, border: "none",
  background: `linear-gradient(135deg, #C8973A, #F0D080, #C8973A)`,
  color: "#1A0F07", fontWeight: 800, fontSize: 15, cursor: "pointer",
  fontFamily: "var(--font-montserrat), sans-serif", letterSpacing: 1.5,
  boxShadow: "0 4px 20px rgba(200,151,58,0.35)",
  transition: "opacity 0.2s",
};
const btnOutline: React.CSSProperties = {
  width: "100%", padding: "13px 0", borderRadius: 50,
  border: `1px solid ${BORDER}`,
  background: "transparent",
  color: CREAM2, fontWeight: 600, fontSize: 13, cursor: "pointer",
  fontFamily: "var(--font-montserrat), sans-serif", letterSpacing: 1,
};

const card: React.CSSProperties = {
  background: "rgba(255,240,210,0.04)",
  border: `1px solid ${BORDER}`,
  borderRadius: 14, padding: 20, width: "100%",
};

export default function HomePage() {
  const [step, setStep]           = useState<Step>("form");
  const [birthDate, setBirthDate] = useState("");
  const [starData, setStarData]   = useState<StarData | null>(null);
  const [lang, setLang]           = useState<"he" | "en">("he");

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    if (!birthDate) return;
    const [year, month, day] = birthDate.split("-").map(Number);
    setStarData(calculate(day, month, year));
    setStep("result");
  }

  function reset() {
    setStep("form"); setBirthDate(""); setStarData(null);
  }

  const isHe = lang === "he";
  const mainArchetype = starData ? getArchetype(starData.A) : null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: BG, color: CREAM }}>

      {/* ── HEADER ── */}
      <header style={{
        padding: "14px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: `1px solid ${BORDER}`,
        background: "rgba(26,15,7,0.85)", backdropFilter: "blur(10px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: CREAM, letterSpacing: 2 }}>
            YAEL KARMINSKY
          </div>
          <div style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: 3, marginTop: 1 }}>
            NAP
          </div>
        </div>
        <button onClick={() => setLang(l => l === "he" ? "en" : "he")} style={{
          background: "none", border: `1px solid ${BORDER}`, borderRadius: 8,
          color: MUTED, padding: "4px 14px", cursor: "pointer",
          fontSize: 12, fontFamily: "var(--font-montserrat), sans-serif",
        }}>
          {isHe ? "EN" : "עב"}
        </button>
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* ─── STEP 1: Form ─── */}
        {step === "form" && (
          <div style={{ width: "100%", maxWidth: 520, padding: "44px 28px 64px" }} className="animate-fade-up">

            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: 6, marginBottom: 10 }}>
                N · A · P
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: CREAM, marginBottom: 12, lineHeight: 1.3 }}>
                Neuro-Archetypal Profiling
              </h1>
              <div style={{
                width: 48, height: 1,
                background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
                margin: "0 auto 16px",
              }} />
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.9, direction: "rtl" }}>
                {isHe
                  ? <>מערכת קוגניטיבית-התנהגותית מבוססת ארכיטיפים<br />לזיהוי ושינוי דפוסי חשיבה והתנהגות</>
                  : <>A cognitive-behavioral system based on archetypes<br />for identifying and transforming patterns of thought and behavior</>
                }
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
              <img
                src="/figure.png"
                alt="archetype diagram"
                style={{ width: 320, maxWidth: "100%", borderRadius: 16, opacity: 0.92 }}
              />
            </div>

            <p style={{ textAlign: "center", fontSize: 13, color: MUTED, marginBottom: 22 }}>
              {isHe ? "הכנסי את תאריך הלידה שלך" : "Enter your date of birth"}
            </p>

            <form onSubmit={handleCalculate}>
              <label style={{
                display: "block", marginBottom: 12, fontWeight: 600, fontSize: 11,
                color: GOLD, textAlign: "center", letterSpacing: 2,
              }}>
                {isHe ? "תאריך לידה" : "DATE OF BIRTH"}
              </label>
              <div style={{ marginBottom: 20 }}>
                <DateInput onComplete={setBirthDate} dark />
              </div>
              <button type="submit" disabled={!birthDate}
                style={{ ...btnGold, opacity: birthDate ? 1 : 0.4, cursor: birthDate ? "pointer" : "not-allowed" }}>
                {isHe ? "חשבי את הארכיטיפים שלי" : "Calculate My Archetype"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 40, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 11, color: MUTED, letterSpacing: 0.3 }}>
                מרכז להעצמה והתפתחות אישית · Yael Karminsky
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Result ─── */}
        {step === "result" && starData && mainArchetype && (
          <div style={{ width: "100%", maxWidth: 620, padding: "32px 28px 64px" }} className="animate-fade-up">

            <div style={{ textAlign: "center", marginBottom: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: 6 }}>N · A · P</div>
            </div>

            <div style={{ textAlign: "center", fontSize: 18, fontWeight: 800, color: CREAM, marginBottom: 14 }}>
              {isHe ? "תרשים הארכיטיפים המלא שלך" : "Your Full Archetype Chart"}
            </div>

            {isHe && (
              <div style={{ textAlign: "center", marginBottom: 24, direction: "rtl" }}>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.85, marginBottom: 8 }}>
                  מפת הארכיטיפים שלך היא הקוד הפסיכולוגי הייחודי שנחרט בך מהלידה.
                  כל מספר בתרשים הוא ארכיטיפ — דפוס עמוק של חשיבה, רגש והתנהגות שמעצב את חייך.
                </p>
                <p style={{ fontSize: 12, color: GOLD, fontWeight: 600, letterSpacing: 0.3, lineHeight: 1.7 }}>
                  תודעה · רגש · מימוש ופרנסה · זוגיות ומערכות יחסים · בריאות פיסית ומנטלית · נשמה
                </p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
              <StarDiagram data={starData} size={380} dark />
            </div>

            {/* Main archetype card */}
            <div style={{ ...card, borderColor: `rgba(200,151,58,0.45)`, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%",
                  border: `1.5px solid ${GOLD}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 800, color: GOLD, flexShrink: 0,
                }}>
                  {mainArchetype.symbol}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: CREAM }}>
                    {isHe ? mainArchetype.nameHe : mainArchetype.nameEn}
                  </div>
                  <div style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>
                    {isHe ? "הארכיטיפ הראשי שלך" : "YOUR MAIN ARCHETYPE"}
                  </div>
                </div>
              </div>

              <div style={{
                width: "100%", height: 1,
                background: `linear-gradient(to right, ${GOLD}, transparent)`,
                marginBottom: 16,
              }} />

              {isHe && mainArchetype.fullDescriptionHe.split("\n\n").map((para, i) => (
                <p key={i} style={{ color: CREAM2, lineHeight: 1.9, fontSize: 14, marginBottom: 14, direction: "rtl", textAlign: "right" }}>
                  {para}
                </p>
              ))}
              {!isHe && (
                <p style={{ color: CREAM2, lineHeight: 1.85, fontSize: 14 }}>
                  {mainArchetype.descriptionEn}
                </p>
              )}

              {isHe && (
                <div style={{
                  marginTop: 10, padding: "14px 16px",
                  background: "rgba(200,151,58,0.08)",
                  borderRight: `3px solid ${GOLD}`,
                  borderRadius: "0 8px 8px 0", direction: "rtl",
                }}>
                  <div style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>משפט מפתח</div>
                  <div style={{ fontSize: 14, color: CREAM, fontWeight: 700, lineHeight: 1.7, direction: "rtl" }}>
                    {mainArchetype.keyPhraseHe}
                  </div>
                </div>
              )}
            </div>

            {/* Plus / Minus */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {([
                { label: isHe ? "ביטוי חיובי" : "POSITIVE",  items: mainArchetype.plusHe,  accent: GOLD },
                { label: isHe ? "צד צל"       : "SHADOW",    items: mainArchetype.minusHe, accent: "#C08888" },
              ] as const).map(({ label, items, accent }) => (
                <div key={label} style={card}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: accent, marginBottom: 10, letterSpacing: 1 }}>
                    {label.toUpperCase()}
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.map((item, i) => (
                      <li key={i} style={{ fontSize: 12, color: CREAM2, display: "flex", gap: 7, lineHeight: 1.6 }}>
                        <span style={{ color: accent, flexShrink: 0 }}>›</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Teaser */}
            {isHe && (
              <div style={{
                marginBottom: 28, padding: "20px 18px",
                background: "rgba(200,151,58,0.05)",
                border: `1px solid rgba(200,151,58,0.2)`,
                borderRadius: 12, direction: "rtl", textAlign: "right",
              }}>
                <p style={{ fontSize: 13, color: CREAM2, lineHeight: 1.9, marginBottom: 12 }}>
                  מה שקראת עכשיו הוא רק טעימה קטנה ממה שהמטריצה שלך באמת יודעת לספר עלייך.
                </p>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.9, marginBottom: 12 }}>
                  בתוך התרשים שלך יש עוד ארכיטיפים שמראים איך את פועלת בכל תחום בחיים — בזוגיות, בכסף, בקריירה, בבריאות, במה שממלא אותך, וגם במה ששואב ממך את כל הכוח.
                </p>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.9, marginBottom: 12 }}>
                  המטריצה הזו מראה לא רק את הפוטנציאל שלך, אלא גם את החסמים, הדפוסים והמקומות שבהם את נעצרת שוב ושוב — לפעמים בלי להבין למה.
                </p>
                <p style={{ fontSize: 13, color: CREAM, fontWeight: 600, lineHeight: 1.9, marginBottom: 12 }}>
                  כי לפעמים הבעיה היא לא שאין לך יכולת.<br />
                  הבעיה היא שאת עדיין לא רואה מה באמת מפעיל אותך מבפנים.
                </p>
                <p style={{ fontSize: 13, color: CREAM, fontWeight: 700, lineHeight: 1.85 }}>
                  NAP היא שיטה ייחודית שמאפשרת לאבחן את הפוטנציאל שלך בצורה עמוקה ומדויקת, להבין מה באמת עוצר אותך — ולקבל כיוון ברור מה כדאי לשנות כדי להתחיל לבנות את החיים שאת באמת רוצה.
                </p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={reset} style={{ ...btnOutline, maxWidth: 280 }}>
                {isHe ? "חשבי ארכיטיפ חדש" : "Calculate New Archetype"}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer style={{
        borderTop: `1px solid ${BORDER}`, padding: "14px 24px",
        textAlign: "center", fontSize: 11, color: MUTED, letterSpacing: 0.4,
      }}>
        © Yael Karminsky · NAP — Neuro-Archetypal Profiling
      </footer>
    </div>
  );
}
