import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Streamline Email Design: AI-Powered Email Builder for Next.js 15",
  description:
    "Create stunning, responsive email templates in minutes with our drag-and-drop AI-powered email builder. Seamlessly integrated with Next.js 15, optimize your email marketing effortlessly.",
  keywords: [
    "email builder",
    "Next.js 15",
    "AI email design",
    "responsive templates",
    "email marketing",
    "drag-and-drop email builder",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
