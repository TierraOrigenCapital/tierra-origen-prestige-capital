"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const DASH_CARDS = [
  { key: "overview", titleKey: "overview", descKey: "overviewDesc" },
  { key: "documents", titleKey: "documents", descKey: "documentsDesc" },
  { key: "incomeReports", titleKey: "incomeReports", descKey: "incomeDesc" },
  { key: "pendingActions", titleKey: "pendingActions", descKey: "pendingActionsDesc" },
  { key: "withdrawals", titleKey: "withdrawals", descKey: "withdrawalsDesc" },
];

const APPLIED_KEY = "tierra_has_applied";

export default function DashboardPage() {
  const { t } = useLanguage();
  const [hasApplied, setHasApplied] = useState<boolean | null>(null);

  useEffect(() => {
    setHasApplied(typeof window !== "undefined" && sessionStorage.getItem(APPLIED_KEY) === "1");
  }, []);

  // Avoid flash: default to locked until we know
  const showUnlocked = hasApplied === true;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {showUnlocked ? (
        /* UNLOCKED: User has applied */
        <>
          <h1 className="text-2xl font-bold text-slate-900">{t("dashboard.title")}</h1>
          <p className="mt-1 text-slate-600">{t("dashboard.subtitle")}</p>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-6 shadow-soft ring-2 ring-amber-100/50 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div>
                <h2 className="font-semibold text-slate-900">{t("dashboard.pendingTitle")}</h2>
                <p className="text-sm text-slate-600">{t("dashboard.pendingDesc")}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {DASH_CARDS.map((card, i) => (
              <div
                key={card.key}
                className="rounded-2xl bg-white p-6 shadow-soft border border-slate-100 transition-all duration-300 hover:shadow-colored animate-fade-in-up opacity-0"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <h3 className="font-semibold text-slate-900">{t(`dashboard.${card.titleKey}`)}</h3>
                <p className="mt-1 text-sm text-slate-600">{t(`dashboard.${card.descKey}`)}</p>
                <Link href="#" className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                  {t("dashboard.view")}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">{t("dashboard.note")}</p>
        </>
      ) : (
        /* EMPTY STATE: Locked, prompt to apply */
        <>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{t("dashboard.emptyTitle")}</h1>
            <p className="mt-4 text-lg text-slate-600">{t("dashboard.emptySub")}</p>
            <Link
              href="/signup"
              className="mt-8 inline-flex flex-col items-center justify-center rounded-2xl bg-[var(--accent)] px-10 py-5 text-base font-semibold text-white shadow-colored hover:opacity-95 transition-opacity"
            >
              <span>{t("dashboard.emptyCta")}</span>
              <span className="text-sm font-normal opacity-90">{t("dashboard.emptyCtaSub")}</span>
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {DASH_CARDS.map((card) => (
              <div
                key={card.key}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-6"
              >
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none" />
                <div className="relative flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-700">{t(`dashboard.${card.titleKey}`)}</h3>
                    <p className="mt-1 text-sm text-slate-500">{t(`dashboard.${card.descKey}`)}</p>
                    <Link
                      href="/signup"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
                    >
                      {t("dashboard.lockedLabel")}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[var(--accent)] bg-white px-8 py-3.5 text-base font-semibold text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors"
            >
              {t("dashboard.emptyCta")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
