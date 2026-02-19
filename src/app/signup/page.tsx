"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const STEPS = [
  { id: 1, key: "step1" },
  { id: 2, key: "step2" },
  { id: 3, key: "step3" },
] as const;

function SignupForm() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const pathParam = searchParams.get("path"); // full-ownership | fractional
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryOfOrigin: "Colombia",
    residencyStatus: pathParam === "fractional" ? "in_process" : "legal",
    investmentType: pathParam === "full-ownership" ? "full" : pathParam === "fractional" ? "fractional" : "",
    budgetRange: "",
    riskProfile: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem("tierra_has_applied", "1");
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="rounded-2xl bg-white p-8 shadow-soft border border-slate-100">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-light)]">
            <svg className="h-7 w-7 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-slate-900">{t("signup.submitted")}</h1>
          <p className="mt-2 text-slate-600">{t("signup.pending")}</p>
          <Link href="/dashboard" className="mt-8 inline-block rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:opacity-95">
            {t("signup.goDashboard")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white p-6 shadow-soft border border-slate-100 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">{t("signup.title")}</h1>
        <p className="mt-1 text-slate-600">{t("signup.subtitle")}</p>

        <div className="mt-8 flex gap-2">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={`h-2 flex-1 rounded-full ${step >= s.id ? "bg-[var(--accent)]" : "bg-slate-200"}`}
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-2 text-sm font-medium text-slate-500">Step {step} of 3: {t(`signup.${STEPS[step - 1].key}`)}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">{t("signup.fullName")}</label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">{t("signup.email")}</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">{t("signup.phone")}</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label htmlFor="countryOfOrigin" className="block text-sm font-medium text-slate-700">{t("signup.countryOfOrigin")}</label>
                <input
                  id="countryOfOrigin"
                  type="text"
                  value={form.countryOfOrigin}
                  onChange={(e) => setForm({ ...form, countryOfOrigin: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">{t("signup.residencyStatus")}</label>
                <select
                  value={form.residencyStatus}
                  onChange={(e) => setForm({ ...form, residencyStatus: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  <option value="legal">{t("signup.residentLegal")}</option>
                  <option value="in_process">{t("signup.residentProcess")}</option>
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-slate-600">{t("signup.kycText")}</p>
              <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                {t("signup.kycNote")}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700">{t("signup.investmentType")}</label>
                <select
                  value={form.investmentType}
                  onChange={(e) => setForm({ ...form, investmentType: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  <option value="">{t("signup.select")}</option>
                  <option value="full">{t("signup.investmentFull")}</option>
                  <option value="fractional">{t("signup.investmentFractional")}</option>
                </select>
              </div>
              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium text-slate-700">{t("signup.budgetRange")}</label>
                <input
                  id="budgetRange"
                  type="text"
                  placeholder={t("signup.budgetPlaceholder")}
                  value={form.budgetRange}
                  onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label htmlFor="riskProfile" className="block text-sm font-medium text-slate-700">{t("signup.riskProfile")}</label>
                <select
                  id="riskProfile"
                  value={form.riskProfile}
                  onChange={(e) => setForm({ ...form, riskProfile: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  <option value="">{t("signup.select")}</option>
                  <option value="conservative">{t("signup.riskConservative")}</option>
                  <option value="moderate">{t("signup.riskModerate")}</option>
                  <option value="growth">{t("signup.riskGrowth")}</option>
                </select>
              </div>
            </>
          )}

          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-xl border border-slate-300 px-6 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
              >
                {t("signup.back")}
              </button>
            )}
            <button
              type="submit"
              className="rounded-xl bg-[var(--accent)] px-6 py-2.5 font-semibold text-white shadow-colored hover:opacity-95"
            >
              {step < 3 ? t("signup.continue") : t("signup.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-xl px-4 py-20 text-center text-slate-500">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
