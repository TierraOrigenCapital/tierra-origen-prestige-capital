import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Tierra Origen Prestige Capital | Invest in Colombian Real Estate from Spain",
  description:
    "Secure platform for Colombians in Spain to invest in income-producing real estate in Colombia. Full ownership or fractional investment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen bg-[var(--background)] font-sans antialiased text-[var(--foreground)]">
        <Header />
        <main className="min-h-[calc(100vh-80px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
