"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { FullOwnershipCalculator } from "@/components/FullOwnershipCalculator";
import { FractionalSignupPreview } from "@/components/FractionalSignupPreview";

const APPLIED_KEY = "tierra_has_applied";

type Residency = "" | "legal" | "in_process";
type InvestmentType = "" | "full" | "fractional";

function OptionCard({
  selected,
  onClick,
  icon,
  title,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
        selected
          ? "border-[var(--accent)] bg-[var(--accent-light)]/30 shadow-colored"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-soft hover:scale-[1.02] active:scale-[0.99]"
      }`}
    >
      {selected && (
        <span className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-white">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-slate-200 transition-colors text-slate-700">
        {icon}
      </span>
      <h3 className={`mt-3 font-bold ${selected ? "text-slate-900" : "text-slate-800"}`}>{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </button>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const pathParam = searchParams.get("path");

  const [step, setStep] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    residency: (pathParam === "fractional" ? "in_process" : pathParam === "full-ownership" ? "legal" : "") as Residency,
    investmentType: (pathParam === "full-ownership" ? "full" : pathParam === "fractional" ? "fractional" : "") as InvestmentType,
    budgetRange: "",
    depositReady: "",
    shareRange: 25,
    riskProfile: "",
    fullName: "",
    email: "",
    phone: "",
    countryOfOrigin: "Colombia",
    password: "",
    confirmPassword: "",
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      handleNext();
      return;
    }
    if (form.password !== form.confirmPassword || form.password.length < 8) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          countryOfOrigin: form.countryOfOrigin,
          password: form.password,
          residency: form.residency,
          investmentType: form.investmentType,
          budgetRange: form.budgetRange,
          depositReady: form.depositReady,
          shareRange: form.shareRange,
          riskProfile: form.riskProfile,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Could not submit application");
      }
      if (typeof window !== "undefined") {
        sessionStorage.setItem(APPLIED_KEY, "1");
      }
      setShowConfirm(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordMatch = form.password === form.confirmPassword && form.password.length >= 8;
  const canProceed =
    (step === 1 && form.residency) ||
    (step === 2 && form.investmentType) ||
    (step === 3) ||
    (step === 4 && form.fullName && form.email && passwordMatch);

  if (showConfirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden />
        <div className="relative animate-modal-in rounded-3xl border-2 border-[var(--success)]/30 bg-white p-8 shadow-success max-w-md w-full mx-auto">
          <div className="absolute -inset-1 bg-[var(--success)]/20 rounded-3xl blur-xl -z-10" />
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--success-light)]">
            <svg className="h-9 w-9 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-slate-900 text-center">{t("signup.confirmTitle")}</h1>
          <p className="mt-2 text-slate-600 text-center">{t("signup.confirmSub")}</p>
          <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{t("signup.confirmResidency")}</span>
              <span className="font-medium text-slate-900">
                {form.residency === "legal" ? t("signup.residentLegal") : t("signup.residentProcess")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t("signup.confirmInvestment")}</span>
              <span className="font-medium text-slate-900">
                {form.investmentType === "full" ? t("signup.investmentFull") : t("signup.investmentFractional")}
              </span>
            </div>
            {(form.budgetRange || form.depositReady) && (
              <div className="flex justify-between">
                <span className="text-slate-500">{t("signup.confirmBudget")}</span>
                <span className="font-medium text-slate-900">{form.budgetRange || form.depositReady}</span>
              </div>
            )}
          </div>
          <p className="mt-4 text-xs text-slate-500 text-center">{t("signup.confirmNext")}</p>
          <p className="mt-2 text-sm font-medium text-slate-700 text-center">{t("signup.confirmLoginHint")}</p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center rounded-xl bg-[var(--success)] px-6 py-3.5 font-semibold text-white shadow-success hover:opacity-95 transition-opacity"
            >
              {t("signup.goToPanel")}
            </Link>
            <Link href="/login" className="text-center text-sm text-slate-600 hover:text-[var(--accent)]">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white p-6 shadow-soft border border-slate-100 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">{t("signup.title")}</h1>
        <p className="mt-1 text-slate-600">{t("signup.subtitle")}</p>
        <div className="mt-8 flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${step >= i + 1 ? "bg-[var(--accent)]" : "bg-slate-200"}`}
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-2 text-sm font-medium text-slate-500">
          {step === 1 && t("signup.residencyQuestion")}
          {step === 2 && t("signup.investQuestion")}
          {step === 3 && form.investmentType === "full" && t("signup.fullPathStep")}
          {step === 3 && form.investmentType === "fractional" && t("signup.fracPathStep")}
          {step === 4 && t("signup.detailsStep")}
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-in">
                <OptionCard
                  selected={form.residency === "legal"}
                  onClick={() => setForm({ ...form, residency: "legal" })}
                  icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                  title={t("signup.residencyLegal")}
                  desc={t("signup.residencyLegalDesc")}
                />
                <OptionCard
                  selected={form.residency === "in_process"}
                  onClick={() => setForm({ ...form, residency: "in_process" })}
                  icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  title={t("signup.residencyProcess")}
                  desc={t("signup.residencyProcessDesc")}
                />
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-in">
                <OptionCard
                  selected={form.investmentType === "full"}
                  onClick={() => setForm({ ...form, investmentType: "full" })}
                  icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                  title={t("signup.investmentFull")}
                  desc={t("signup.investFullDesc")}
                />
                <OptionCard
                  selected={form.investmentType === "fractional"}
                  onClick={() => setForm({ ...form, investmentType: "fractional" })}
                  icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /></svg>}
                  title={t("signup.investmentFractional")}
                  desc={t("signup.investFracDesc")}
                />
              </div>
            )}

            {step === 3 && form.investmentType === "full" && (
              <div className="space-y-6 animate-slide-in">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft">
                  <p className="text-sm font-medium text-slate-600 mb-4">{t("signup.fullPathCalcSub")}</p>
                  <FullOwnershipCalculator />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">{t("signup.fullPathBudget")}</label>
                  <input type="text" placeholder={t("signup.budgetPlaceholder")} value={form.budgetRange} onChange={(e) => setForm({ ...form, budgetRange: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">{t("signup.fullPathDeposit")}</label>
                  <input type="text" placeholder="ej. €30.000" value={form.depositReady} onChange={(e) => setForm({ ...form, depositReady: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
                </div>
              </div>
            )}

            {step === 3 && form.investmentType === "fractional" && (
              <div className="space-y-6 animate-slide-in">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft">
                  <p className="text-sm font-medium text-slate-600 mb-4">{t("signup.fracPathCalcSub")}</p>
                  <FractionalSignupPreview shareRange={form.shareRange} onShareChange={(v) => setForm({ ...form, shareRange: v })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">{t("signup.fracPathBudget")}</label>
                  <input type="text" placeholder={t("signup.budgetPlaceholderFrac")} value={form.budgetRange} onChange={(e) => setForm({ ...form, budgetRange: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">{t("signup.fracPathShare")}</label>
                  <div className="mt-2 flex gap-2 text-xs text-slate-500"><span>{t("signup.fracPathShareLow")}</span><span className="flex-1" /><span>{t("signup.fracPathShareHigh")}</span></div>
                  <input type="range" min={0} max={50} value={form.shareRange} onChange={(e) => setForm({ ...form, shareRange: Number(e.target.value) })} className="ownership-slider mt-1 h-6 w-full cursor-grab appearance-none bg-transparent [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow-lg" />
                  <p className="mt-1 text-sm font-medium text-[var(--accent)]">{form.shareRange}{t("signup.fracPathShareUnit")}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">{t("signup.fracPathRisk")}</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["conservative", "moderate", "growth"].map((v) => (
                      <button key={v} type="button" onClick={() => setForm({ ...form, riskProfile: v })} className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${form.riskProfile === v ? "border-[var(--accent)] bg-[var(--accent-light)]/50 text-slate-900" : "border-slate-200 hover:border-slate-300"}`}>
                        {t(`signup.risk${v.charAt(0).toUpperCase() + v.slice(1)}` as "riskConservative" | "riskModerate" | "riskGrowth")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-slide-in">
                <div className="rounded-2xl border-2 border-[var(--accent)]/20 bg-[var(--accent-light)]/20 p-5">
                  <h3 className="font-bold text-slate-900">{t("signup.accountBoxTitle")}</h3>
                  <p className="mt-2 text-sm text-slate-600">{t("signup.accountBoxDesc")}</p>
                </div>
                <p className="text-slate-600">{t("signup.detailsSub")}</p>
                <div><label className="block text-sm font-medium text-slate-700">{t("signup.fullName")}</label><input type="text" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" /></div>
                <div><label className="block text-sm font-medium text-slate-700">{t("signup.email")}</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" /></div>
                <div><label className="block text-sm font-medium text-slate-700">{t("signup.phone")}</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" /></div>
                <div><label className="block text-sm font-medium text-slate-700">{t("signup.countryOfOrigin")}</label><input type="text" value={form.countryOfOrigin} onChange={(e) => setForm({ ...form, countryOfOrigin: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" /></div>
                <div><label className="block text-sm font-medium text-slate-700">{t("signup.password")}</label><input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={t("signup.passwordPlaceholder")} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" /></div>
                <div><label className="block text-sm font-medium text-slate-700">{t("signup.confirmPassword")}</label><input type="password" required minLength={8} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder={t("signup.confirmPasswordPlaceholder")} className={`mt-2 block w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-1 ${form.confirmPassword && form.password !== form.confirmPassword ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-slate-300 focus:border-[var(--accent)] focus:ring-[var(--accent)]"}`} /></div>
                {form.confirmPassword && form.password !== form.confirmPassword && <p className="text-sm text-red-600">{t("signup.passwordMismatch")}</p>}
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">{t("signup.kycNote")}</div>
                {submitError && <p className="text-sm text-red-600">{submitError}</p>}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            {step > 1 && <button type="button" onClick={handleBack} className="rounded-xl border border-slate-300 px-6 py-2.5 font-medium text-slate-700 hover:bg-slate-50 transition-colors">{t("signup.back")}</button>}
            <button type="submit" disabled={!canProceed || isSubmitting} className="rounded-xl bg-[var(--accent)] px-6 py-2.5 font-semibold text-white shadow-colored hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
              {isSubmitting ? "..." : step < totalSteps ? t("signup.continue") : t("signup.submit")}
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
