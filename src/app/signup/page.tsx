"use client";

// Residency status option: "In Process of Legalization" (not "Without papers")
import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const STEPS = [
  { id: 1, title: "Create Account" },
  { id: 2, title: "KYC Verification" },
  { id: 3, title: "Investment Preference" },
] as const;

function SignupForm() {
  const searchParams = useSearchParams();
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
          <h1 className="mt-6 text-2xl font-bold text-slate-900">Application Submitted</h1>
          <p className="mt-2 text-slate-600">Your inquiry is now <strong>Pending Approval</strong>. We will review your application and get in touch.</p>
          <Link href="/dashboard" className="mt-8 inline-block rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:opacity-95">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white p-6 shadow-soft border border-slate-100 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Investment Application</h1>
        <p className="mt-1 text-slate-600">Unified sign-up for full ownership or fractional investment.</p>

        <div className="mt-8 flex gap-2">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={`h-2 flex-1 rounded-full ${step >= s.id ? "bg-[var(--accent)]" : "bg-slate-200"}`}
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-2 text-sm font-medium text-slate-500">Step {step} of 3: {STEPS[step - 1].title}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full name</label>
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
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
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
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label htmlFor="countryOfOrigin" className="block text-sm font-medium text-slate-700">Country of origin</label>
                <input
                  id="countryOfOrigin"
                  type="text"
                  value={form.countryOfOrigin}
                  onChange={(e) => setForm({ ...form, countryOfOrigin: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Residency status</label>
                <select
                  value={form.residencyStatus}
                  onChange={(e) => setForm({ ...form, residencyStatus: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  <option value="legal">Legal resident in Spain</option>
                  <option value="in_process">In Process of Legalization</option>
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-slate-600">In the next phase you will upload: passport, NIE (if available), proof of address, tax ID (if applicable). For this MVP we collect your intent; file upload can be added later.</p>
              <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                KYC: Passport upload, NIE (if available), proof of address, tax identification (if applicable).
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700">Investment type</label>
                <select
                  value={form.investmentType}
                  onChange={(e) => setForm({ ...form, investmentType: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  <option value="">Select</option>
                  <option value="full">Full ownership</option>
                  <option value="fractional">Fractional investment</option>
                </select>
              </div>
              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium text-slate-700">Budget range</label>
                <input
                  id="budgetRange"
                  type="text"
                  placeholder="e.g. €50,000 – €150,000"
                  value={form.budgetRange}
                  onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label htmlFor="riskProfile" className="block text-sm font-medium text-slate-700">Risk profile</label>
                <select
                  id="riskProfile"
                  value={form.riskProfile}
                  onChange={(e) => setForm({ ...form, riskProfile: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  <option value="">Select</option>
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="growth">Growth</option>
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
                Back
              </button>
            )}
            <button
              type="submit"
              className="rounded-xl bg-[var(--accent)] px-6 py-2.5 font-semibold text-white shadow-colored hover:opacity-95"
            >
              {step < 3 ? "Continue" : "Submit application"}
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
