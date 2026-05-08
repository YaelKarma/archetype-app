"use client";

import { useState } from "react";
import StarDiagram from "@/components/StarDiagram";
import DateInput from "@/components/DateInput";
import { calculate, type StarData } from "@/lib/calculate";
import { getArchetype } from "@/lib/archetypes";

type Step = "form" | "email" | "result";

const BROWN  = "#57483C";
const GOLD   = "#CAA869";
const BEIGE  = "#DDC7A8";
const MUTED  = "#9a8272";

const btnStyle: React.CSSProperties = {
  width: "100%", padding: "13px 0", borderRadius: 50, border: `1px solid ${GOLD}`,
  background: "transparent",
  color: BROWN, fontWeight: 700, fontSize: 14, cursor: "pointer",
  fontFamily: "var(--font-montserrat), sans-serif", letterSpacing: 1,
  transition: "background 0.2s, color 0.2s",
};
const btnSolidStyle: React.CSSProperties = {
  ...btnStyle,
  background: `linear-gradient(135deg, #CAA869, #EAD38F, #CAA869)`,
  border: "none",
};

export default function HomePage() {
  const [step, setStep]             = useState<Step>("form");
  const [birthDate, setBirthDate]   = useState("");
  const [email, setEmail]           = useState("");
  const [name, setName]             = useState("");
  const [starData, setStarData]     = useState<StarData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lang, setLang]             = useState<"he" | "en">("he");

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    if (!birthDate) return;
    const [year, month, day] = birthDate.split("-").map(Number);
    setStarData(calculate(day, month, year));
    setStep("email");
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitting(false);
    setStep("result");
  }

  function reset() {
    setStep("form"); setBirthDate(""); setEmail(""); setName(""); setStarData(null);
  }

  const isHe = lang === "he";
  const mainArchetype = starData ? getArchetype(starData.A) : null;

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.55)",
    border: `1px solid ${BEIGE}`,
    borderRadius: 14,
    padding: 20,
    width: "100%",
    backdropFilter: "blur(4px)",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER ── */}
      <header style={{
        padding: "14px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: `1px solid rgba(198,170,129,0.4)`,
        background: "rgba(237,224,200,0.7)", backdropFilter: "blur(8px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: BROWN, letterSpacing: 1.5 }}>
            YAEL KARMINSKY
          </div>
          <div style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: 3, marginTop: 1 }}>
            NAP
          </div>
        </div>
        <button onClick={() => setLang(l => l === "he" ? "en" : "he")} style={{
          background: "none", border: `1px solid ${BEIGE}`, borderRadius: 8,
          color: MUTED, padding: "4px 14px", cursor: "pointer",
          fontSize: 12, fontFamily: "var(--font-montserrat), sans-serif",
        }}>
          {isHe ? "EN" : "עב"}
        </button>
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* ─── STEP 1: Form ─── */}
        {step === "form" && (
          <div style={{ width: "100%", maxWidth: 520, padding: "36px 28px 56px" }} className="animate-fade-up">

            {/* NAP brand block */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: 5, marginBottom: 6 }}>
                N · A · P
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: BROWN, marginBottom: 10, lineHeight: 1.3 }}>
                Neuro-Archetypal Profiling
              </h1>
              <div className="gold-line" style={{ marginBottom: 12 }} />
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.85, direction: "rtl" }}>
                {isHe
                  ? <>מערכת קוגניטיבית-התנהגותית מבוססת ארכיטיפים<br />לזיהוי ושינוי דפוסי חשיבה והתנהגות</>
                  : <>A cognitive-behavioral system based on archetypes<br />for identifying and transforming patterns of thought and behavior</>
                }
              </p>
            </div>

            {/* Star preview */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}
                 className="animate-shimmer">
              <StarDiagram data={null} size={260} />
            </div>

            <p style={{ textAlign: "center", fontSize: 13, color: MUTED, marginBottom: 22 }}>
              {isHe ? "הכנסי את תאריך הלידה שלך" : "Enter your date of birth"}
            </p>

            <form onSubmit={handleCalculate}>
              <label style={{
                display: "block", marginBottom: 12, fontWeight: 600, fontSize: 12,
                color: BROWN, textAlign: "center", letterSpacing: 0.5,
              }}>
                {isHe ? "תאריך לידה" : "DATE OF BIRTH"}
              </label>
              <div style={{ marginBottom: 18 }}>
                <DateInput onComplete={setBirthDate} />
              </div>
              <button type="submit" disabled={!birthDate}
                style={{ ...btnSolidStyle, opacity: birthDate ? 1 : 0.45, cursor: birthDate ? "pointer" : "not-allowed" }}>
                {isHe ? "חשבי את הארכיטיפ שלי" : "Calculate My Archetype"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 36, paddingTop: 22, borderTop: `1px solid ${BEIGE}` }}>
              <div style={{ fontSize: 11, color: MUTED, letterSpacing: 0.3 }}>
                מרכז להעצמה והתפתחות אישית · Yael Karminsky
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Email ─── */}
        {step === "email" && starData && (
          <div style={{ width: "100%", maxWidth: 520, padding: "28px 28px 56px" }} className="animate-fade-up">

            <div style={{ textAlign: "center", marginBottom: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: 5 }}>N · A · P</div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <StarDiagram data={starData} size={310} />
            </div>

            {mainArchetype && (
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: BROWN, marginBottom: 2 }}>
                  {isHe ? mainArchetype.nameHe : mainArchetype.nameEn}
                </div>
                <div style={{ fontSize: 11, color: GOLD, fontWeight: 600, letterSpacing: 2 }}>
                  {mainArchetype.symbol}
                </div>
              </div>
            )}

            <div className="gold-line" style={{ marginBottom: 22 }} />

            <p style={{ textAlign: "center", fontWeight: 700, fontSize: 15, color: BROWN, marginBottom: 4 }}>
              {isHe ? "עוד צעד אחד" : "One More Step"}
            </p>
            <p style={{ textAlign: "center", fontSize: 13, color: MUTED, marginBottom: 20 }}>
              {isHe ? "הכנסי פרטים לקבלת מפת הנשמה המלאה" : "Enter your details to receive your full soul map"}
            </p>

            <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="text" placeholder={isHe ? "שם פרטי" : "First Name"}
                value={name} onChange={e => setName(e.target.value)} required
                dir={isHe ? "rtl" : "ltr"}
                style={{ textAlign: isHe ? "right" : "left" }}
              />
              <input
                type="email" placeholder={isHe ? "כתובת אימייל" : "Email Address"}
                value={email} onChange={e => setEmail(e.target.value)} required
                dir="ltr" style={{ textAlign: "left" }}
              />
              <button type="submit" disabled={submitting}
                style={{ ...btnSolidStyle, opacity: submitting ? 0.6 : 1, cursor: submitting ? "not-allowed" : "pointer" }}>
                {submitting ? "..." : (isHe ? "הצגי את מפת הנשמה שלי" : "Show My Soul Map")}
              </button>
              <button type="button" onClick={() => setStep("form")} style={{
                background: "none", border: "none", color: MUTED,
                cursor: "pointer", fontSize: 13, paddingTop: 2,
                fontFamily: "var(--font-montserrat), sans-serif",
              }}>
                ← {isHe ? "חזרה" : "Back"}
              </button>
            </form>
          </div>
        )}

        {/* ─── STEP 3: Result ─── */}
        {step === "result" && starData && mainArchetype && (
          <div style={{ width: "100%", maxWidth: 620, padding: "28px 28px 56px" }} className="animate-fade-up">

            <div style={{ textAlign: "center", marginBottom: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: 5 }}>N · A · P</div>
            </div>
            {name && (
              <div style={{ textAlign: "center", fontSize: 14, color: BROWN, fontWeight: 600, marginBottom: 2 }}>
                {isHe ? `שלום, ${name}` : `Hello, ${name}`}
              </div>
            )}
            <div style={{ textAlign: "center", fontSize: 17, fontWeight: 800, color: BROWN, marginBottom: 10 }}>
              {isHe ? "תרשים הארכיטיפים המלא שלך" : "Your Full Archetype Chart"}
            </div>

            {isHe && (
              <div style={{ textAlign: "center", marginBottom: 22, direction: "rtl" }}>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.80, marginBottom: 8 }}>
                  מפת הארכיטיפים שלך היא הקוד הפסיכולוגי הייחודי שנחרט בך מהלידה.
                  כל מספר בתרשים הוא ארכיטיפ — דפוס עמוק של חשיבה, רגש והתנהגות שמעצב את חייך.
                </p>
                <p style={{ fontSize: 12, color: GOLD, fontWeight: 600, letterSpacing: 0.3, lineHeight: 1.7 }}>
                  תודעה · רגש · מימוש ופרנסה · זוגיות ומערכות יחסים · בריאות פיסית ומנטלית · נשמה
                </p>
                <p style={{ fontSize: 12, color: MUTED, marginTop: 6, lineHeight: 1.7 }}>
                  מי שיודעת לפענח את הקוד — פיצחה את עצמה.
                </p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <StarDiagram data={starData} size={380} />
            </div>

            {/* Main archetype */}
            <div style={{ ...card, borderColor: GOLD, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  border: `1.5px solid ${GOLD}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 800, color: GOLD, flexShrink: 0,
                }}>
                  {mainArchetype.symbol}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: BROWN }}>
                    {isHe ? mainArchetype.nameHe : mainArchetype.nameEn}
                  </div>
                  <div style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 1.5 }}>
                    {isHe ? "הארכיטיפ הראשי שלך" : "YOUR MAIN ARCHETYPE"}
                  </div>
                </div>
              </div>
              <div className="gold-line" style={{ marginBottom: 14, marginLeft: 0, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />

              {/* Full description paragraphs */}
              {isHe && mainArchetype.fullDescriptionHe.split("\n\n").map((para, i) => (
                <p key={i} style={{ color: BROWN, lineHeight: 1.9, fontSize: 14, marginBottom: 14, direction: "rtl", textAlign: "right" }}>
                  {para}
                </p>
              ))}
              {!isHe && (
                <p style={{ color: BROWN, lineHeight: 1.85, fontSize: 14 }}>
                  {mainArchetype.descriptionEn}
                </p>
              )}

              {/* Key phrase */}
              {isHe && (
                <div style={{
                  marginTop: 8,
                  padding: "14px 16px",
                  background: "rgba(202,168,105,0.08)",
                  borderRight: `3px solid ${GOLD}`,
                  borderRadius: "0 8px 8px 0",
                  direction: "rtl",
                }}>
                  <div style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>משפט מפתח</div>
                  <div style={{ fontSize: 14, color: BROWN, fontWeight: 700, lineHeight: 1.7, direction: "rtl" }}>
                    {mainArchetype.keyPhraseHe}
                  </div>
                </div>
              )}

            </div>

            {/* Plus / Minus */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 26 }}>
              {([
                { label: isHe ? "ביטוי חיובי" : "POSITIVE",  items: mainArchetype.plusHe,  accent: "#786551" },
                { label: isHe ? "צד צל"       : "SHADOW",    items: mainArchetype.minusHe, accent: "#C69E9D" },
              ] as const).map(({ label, items, accent }) => (
                <div key={label} style={card}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: accent, marginBottom: 10, letterSpacing: 1 }}>
                    {label.toUpperCase()}
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                    {items.map((item, i) => (
                      <li key={i} style={{ fontSize: 12, color: BROWN, display: "flex", gap: 7, lineHeight: 1.6 }}>
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
                marginBottom: 26,
                padding: "18px 16px",
                background: "rgba(87,72,60,0.04)",
                border: `1px solid rgba(202,168,105,0.3)`,
                borderRadius: 12,
                direction: "rtl",
                textAlign: "right",
              }}>
                <p style={{ fontSize: 13, color: BROWN, lineHeight: 1.88, marginBottom: 12 }}>
                  מה שקראת עכשיו הוא רק טעימה קטנה ממה שהמטריצה שלך באמת יודעת לספר עלייך.
                </p>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.88, marginBottom: 12 }}>
                  בתוך התרשים שלך יש עוד ארכיטיפים שמראים איך את פועלת בכל תחום בחיים — בזוגיות, בכסף, בקריירה, בבריאות, במה שממלא אותך, וגם במה ששואב ממך את כל הכוח.
                </p>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.88, marginBottom: 12 }}>
                  המטריצה הזו מראה לא רק את הפוטנציאל שלך, אלא גם את החסמים, הדפוסים והמקומות שבהם את נעצרת שוב ושוב — לפעמים בלי להבין למה.
                </p>
                <p style={{ fontSize: 13, color: BROWN, fontWeight: 600, lineHeight: 1.88, marginBottom: 12 }}>
                  כי לפעמים הבעיה היא לא שאין לך יכולת.<br />
                  הבעיה היא שאת עדיין לא רואה מה באמת מפעיל אותך מבפנים.
                </p>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.88, marginBottom: 14 }}>
                  וכשמבינים את המבנה הפנימי האמיתי שלך — פתאום הרבה דברים מתחילים להתחבר. דברים שעד עכשיו הרגישו תקועים, מתחילים לזוז סוף סוף בכיוון הנכון.
                </p>
                <p style={{ fontSize: 13, color: BROWN, fontWeight: 700, lineHeight: 1.85 }}>
                  NAP היא שיטה ייחודית שמאפשרת לאבחן את הפוטנציאל שלך בצורה עמוקה ומדויקת, להבין מה באמת עוצר אותך — ולקבל כיוון ברור מה כדאי לשנות כדי להתחיל לבנות את החיים שאת באמת רוצה.
                </p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={reset} style={{ ...btnStyle, maxWidth: 280 }}>
                {isHe ? "חשבי ארכיטיפ חדש" : "Calculate New Archetype"}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer style={{
        borderTop: `1px solid rgba(198,170,129,0.4)`, padding: "14px 24px",
        textAlign: "center", fontSize: 11, color: MUTED, letterSpacing: 0.4,
      }}>
        © Yael Karminsky · NAP — Neuro-Archetypal Profiling
      </footer>
    </div>
  );
}
