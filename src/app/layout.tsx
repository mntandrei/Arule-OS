import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Arule OS | Your Personal Desktop",
    template: "%s | Arule OS",
  },
  description:
    "A customizable web-based desktop environment with interactive windows, applications, and a personalized workspace.",
  applicationName: "Arule OS",
  keywords: [
    "Arule OS",
    "Web OS",
    "Browser OS",
    "Web Desktop",
    "Desktop Environment",
    "Virtual Desktop",
    "Web Applications",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({children}: Readonly<{children: ReactNode;}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} h-dvh w-full overflow-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
