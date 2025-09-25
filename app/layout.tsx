import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONG Ndao hifanosika",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      
   <link  rel="icon" href="/logo.jpg"   className="LOGO"/>  
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
