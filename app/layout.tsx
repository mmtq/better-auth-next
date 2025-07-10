import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavSign from "@/components/general/nav-sign";

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
          <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80">
                BetterAuthNext
              </Link>

              <div className="flex items-center gap-2">
                {/* Example Nav Button */}
                <NavSign />

                {/* Optional Theme Toggle */}
                {/* <ModeToggle /> */}
              </div>
            </div>
          </header>

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
