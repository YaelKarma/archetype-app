import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Yael Karminsky — מחשבון ארכיטיפים NAP",
  description: "מערכת קוגניטיבית-התנהגותית מבוססת ארכיטיפים לזיהוי ושינוי דפוסי חשיבה והתנהגות",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={montserrat.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
