import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sharan G | Computer Science & Engineering Student",
  description:
    "Sharan G’s student portfolio: projects in software, databases, machine learning, and financial systems, alongside B.Tech studies at KL University.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black text-zinc-50 antialiased selection:bg-white selection:text-black`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
