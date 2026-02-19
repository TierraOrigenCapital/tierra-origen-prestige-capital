"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { key: "home", href: "/" },
  { key: "fullOwnership", href: "/full-ownership" },
  { key: "fractional", href: "/fractional" },
  { key: "apply", href: "/signup" },
  { key: "dashboard", href: "/dashboard" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/80 shadow-soft">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-[var(--accent)] transition-colors"
        >
          Tierra Origen Prestige Capital
        </Link>

        <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border border-slate-200/80 bg-white/80 p-0.5">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              lang === "en" ? "bg-[var(--accent)] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-label="English"
            aria-pressed={lang === "en"}
          >
            EN <span aria-hidden>🇺🇸</span>
          </button>
          <button
            type="button"
            onClick={() => setLang("es")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              lang === "es" ? "bg-[var(--accent)] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-label="Español"
            aria-pressed={lang === "es"}
          >
            ES <span aria-hidden>🇪🇸</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "text-[var(--accent)]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-lg px-4 py-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-2 text-sm font-medium ${
                pathname === item.href ? "text-[var(--accent)]" : "text-slate-600"
              }`}
              onClick={() => setOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
