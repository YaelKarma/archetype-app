"use client";

import { useRef, useState } from "react";

interface Props {
  onComplete: (isoDate: string) => void;
  dark?: boolean;
}

export default function DateInput({ onComplete, dark = false }: Props) {
  const [dd, setDd]     = useState("");
  const [mm, setMm]     = useState("");
  const [yyyy, setYyyy] = useState("");

  const mmRef   = useRef<HTMLInputElement>(null);
  const yyyyRef = useRef<HTMLInputElement>(null);

  function tryComplete(d: string, m: string, y: string) {
    if (d.length === 2 && m.length === 2 && y.length === 4) {
      onComplete(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);
    }
  }

  function handleDd(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDd(v);
    if (v.length === 2) mmRef.current?.focus();
    tryComplete(v, mm, yyyy);
  }
  function handleMm(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMm(v);
    if (v.length === 2) yyyyRef.current?.focus();
    tryComplete(dd, v, yyyy);
  }
  function handleYyyy(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYyyy(v);
    tryComplete(dd, mm, v);
  }
  function handleMmKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && mm === "")
      (e.currentTarget.previousElementSibling?.previousElementSibling as HTMLInputElement)?.focus();
  }
  function handleYyyyKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && yyyy === "")
      (e.currentTarget.previousElementSibling?.previousElementSibling as HTMLInputElement)?.focus();
  }

  const segStyle: React.CSSProperties = dark ? {
    background: "rgba(255,240,200,0.07)",
    border: "1.5px solid rgba(200,151,58,0.35)",
    borderRadius: 10, padding: "13px 0",
    fontSize: 18, fontWeight: 700, textAlign: "center",
    outline: "none", color: "#EDE0C4",
    fontFamily: "var(--font-montserrat), sans-serif",
    direction: "ltr", transition: "border-color 0.2s, box-shadow 0.2s",
  } : {
    background: "rgba(255,255,255,0.7)",
    border: "1.5px solid #DDC7A8",
    borderRadius: 10, padding: "13px 0",
    fontSize: 18, fontWeight: 700, textAlign: "center",
    outline: "none", color: "#57483C",
    fontFamily: "var(--font-montserrat), sans-serif",
    direction: "ltr", transition: "border-color 0.2s, box-shadow 0.2s",
  };

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.style.borderColor = "#C8973A";
    e.target.style.boxShadow = dark
      ? "0 0 0 3px rgba(200,151,58,0.20)"
      : "0 0 0 3px rgba(202,168,105,0.18)";
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.target.style.borderColor = dark ? "rgba(200,151,58,0.35)" : "#DDC7A8";
    e.target.style.boxShadow = "none";
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, direction: "ltr", justifyContent: "center" }}>
      <input value={dd} onChange={handleDd} onFocus={onFocus} onBlur={onBlur}
        placeholder="DD" maxLength={2} inputMode="numeric" style={{ ...segStyle, width: 64 }} />
      <span style={{ color: "#C8973A", fontSize: 20, fontWeight: 300, marginBottom: 2 }}>·</span>
      <input ref={mmRef} value={mm} onChange={handleMm} onKeyDown={handleMmKey} onFocus={onFocus} onBlur={onBlur}
        placeholder="MM" maxLength={2} inputMode="numeric" style={{ ...segStyle, width: 64 }} />
      <span style={{ color: "#C8973A", fontSize: 20, fontWeight: 300, marginBottom: 2 }}>·</span>
      <input ref={yyyyRef} value={yyyy} onChange={handleYyyy} onKeyDown={handleYyyyKey} onFocus={onFocus} onBlur={onBlur}
        placeholder="YYYY" maxLength={4} inputMode="numeric" style={{ ...segStyle, width: 90 }} />
    </div>
  );
}
