import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import NavSign from "@/components/general/nav-sign";
import Header from "@/components/general/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BetterAuthNext",
  description: "Next.js + BetterAuth",
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
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          {/* Header */}
          <Header />
          {/* Main Content */}
          <main className="flex-1 container max-w-4xl w-full mx-auto px-4 py-6">
            {children}
          </main>
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
