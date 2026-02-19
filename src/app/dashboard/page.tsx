"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const DASH_CARDS = [
  { key: "overview", titleKey: "overview", descKey: "overviewDesc" },
  { key: "documents", titleKey: "documents", descKey: "documentsDesc" },
  { key: "incomeReports", titleKey: "incomeReports", descKey: "incomeDesc" },
  { key: "pendingActions", titleKey: "pendingActions", descKey: "pendingActionsDesc" },
  { key: "withdrawals", titleKey: "withdrawals", descKey: "withdrawalsDesc" },
];

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">{t("dashboard.title")}</h1>
      <p className="mt-1 text-slate-600">{t("dashboard.subtitle")}</p>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-6">
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
        {DASH_CARDS.map((card) => (
          <div
            key={card.key}
            className="rounded-2xl bg-white p-6 shadow-soft border border-slate-100 hover:shadow-colored transition-shadow"
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
    </div>
  );
}
