/**
 * layout.tsx
 * 
 * uses default layout from vercel template
 */

import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Havana prototype",
  description: "A prorotype university backdrop with real-time chat with an AI agent and/or admin ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
