import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notlar",
  description: "Türkiye'deki sunucuda çalışan self-host Supabase demosu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
