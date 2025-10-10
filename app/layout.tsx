// app/layout.tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext"; // Ajouter cette importation

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONG Ndao hifanosika",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <AuthProvider> {/* Ajouter AuthProvider ici */}
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}