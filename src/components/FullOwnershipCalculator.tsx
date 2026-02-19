"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PRICE_MIN = 50_000;
const PRICE_MAX = 500_000;
const PRICE_STEP = 5_000;
const DOWN_PAYMENT_PCT_MIN = 15;
const DOWN_PAYMENT_PCT_MAX = 100;
const YEARS_MIN = 5;
const YEARS_MAX = 30;
const FIXED_RATE = 0.14;   // 14% annual
const VARIABLE_RATE = 0.17; // 17% annual
const TAX_RATE = 0.025;    // 2.5% property transfer tax
const COST_RATE = 0.015;   // 1.5% notary + registration

function pmt(rate: number, nper: number, pv: number): number {
  if (rate === 0) return pv / nper;
  return pv * (rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}

export function FullOwnershipCalculator() {
  const { t } = useLanguage();
  const [price, setPrice] = useState(200_000);
  const [downPct, setDownPct] = useState(15);
  const [years, setYears] = useState(15);
  const [interestType, setInterestType] = useState<"fixed" | "variable">("fixed");

  const rate = interestType === "fixed" ? FIXED_RATE : VARIABLE_RATE;
  const downPayment = Math.round((price * downPct) / 100);
  const loanAmount = price - downPayment;
  const monthlyRate = rate / 12;
  const numPayments = years * 12;
  const monthlyCuota = loanAmount > 0 ? pmt(monthlyRate, numPayments, loanAmount) : 0;
  const totalTax = Math.round(price * TAX_RATE);
  const totalCosts = Math.round(price * COST_RATE);
  const totalFees = totalTax + totalCosts;

  // Progress for visual intensity: 0–1 based on how "complete" the config is
  const progress = useMemo(() => {
    const p1 = (price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN);
    const p2 = (downPct - DOWN_PAYMENT_PCT_MIN) / (DOWN_PAYMENT_PCT_MAX - DOWN_PAYMENT_PCT_MIN);
    const p3 = (years - YEARS_MIN) / (YEARS_MAX - YEARS_MIN);
    return (p1 + p2 + p3) / 3;
  }, [price, downPct, years]);

  const fillPrice = ((price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const fillDown = ((downPct - DOWN_PAYMENT_PCT_MIN) / (DOWN_PAYMENT_PCT_MAX - DOWN_PAYMENT_PCT_MIN)) * 100;
  const fillYears = ((years - YEARS_MIN) / (YEARS_MAX - YEARS_MIN)) * 100;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-500 lg:sticky lg:top-24"
      style={{
        boxShadow: `0 25px 50px -12px rgba(13, 148, 136, ${0.15 + progress * 0.2}), 0 4px 24px -4px rgba(0,0,0,0.06)`,
      }}
    >
      {/* Ambient blur that intensifies with progress */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-30 transition-opacity duration-500"
        style={{
          background: "var(--accent)",
          filter: "blur(60px)",
          opacity: 0.2 + progress * 0.4,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-20 transition-opacity duration-500"
        style={{
          background: "var(--accent)",
          filter: "blur(50px)",
          opacity: 0.1 + progress * 0.3,
        }}
      />

      <div className="relative">
        <h3 className="text-lg font-bold text-slate-900">{t("fullCalc.title")}</h3>
        <p className="mt-1 text-sm text-slate-500">{t("fullCalc.subtitle")}</p>

        {/* Slider 1: Property price */}
        <div className="mt-8">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">{t("fullCalc.propertyPrice")}</span>
            <span className="font-bold text-[var(--accent)]">€{price.toLocaleString()}</span>
          </div>
          <div className="relative mt-3">
            <div className="pointer-events-none absolute top-1/2 h-2.5 w-full -translate-y-1/2 rounded-full bg-slate-200" />
            <div
              className="pointer-events-none absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-[var(--accent)] will-change-[width]"
              style={{ width: `${fillPrice}%` }}
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={price}
              onInput={(e) => setPrice(Number((e.target as HTMLInputElement).value))}
              className="ownership-slider relative z-10 h-6 w-full cursor-grab appearance-none bg-transparent active:cursor-grabbing [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">€50,000 – €500,000</p>
        </div>

        {/* Slider 2: Down payment % */}
        <div className="mt-8">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">{t("fullCalc.initialDeposit")}</span>
            <span className="font-bold text-[var(--accent)]">
              {downPct}% = €{downPayment.toLocaleString()}
            </span>
          </div>
          <div className="relative mt-3">
            <div className="pointer-events-none absolute top-1/2 h-2.5 w-full -translate-y-1/2 rounded-full bg-slate-200" />
            <div
              className="pointer-events-none absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-[var(--accent)] will-change-[width]"
              style={{ width: `${fillDown}%` }}
            />
            <input
              type="range"
              min={DOWN_PAYMENT_PCT_MIN}
              max={DOWN_PAYMENT_PCT_MAX}
              value={downPct}
              onInput={(e) => setDownPct(Number((e.target as HTMLInputElement).value))}
              className="ownership-slider relative z-10 h-6 w-full cursor-grab appearance-none bg-transparent active:cursor-grabbing [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">15% – 100%</p>
        </div>

        {/* Slider 3: Term in years */}
        <div className="mt-8">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">{t("fullCalc.loanTerm")}</span>
            <span className="font-bold text-[var(--accent)]">{years} {t("fullCalc.years")}</span>
          </div>
          <div className="relative mt-3">
            <div className="pointer-events-none absolute top-1/2 h-2.5 w-full -translate-y-1/2 rounded-full bg-slate-200" />
            <div
              className="pointer-events-none absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-[var(--accent)] will-change-[width]"
              style={{ width: `${fillYears}%` }}
            />
            <input
              type="range"
              min={YEARS_MIN}
              max={YEARS_MAX}
              value={years}
              onInput={(e) => setYears(Number((e.target as HTMLInputElement).value))}
              className="ownership-slider relative z-10 h-6 w-full cursor-grab appearance-none bg-transparent active:cursor-grabbing [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">5 – 30 years</p>
        </div>

        {/* Interest type toggle */}
        <div className="mt-8">
          <p className="text-sm font-medium text-slate-700">{t("fullCalc.interestType")}</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setInterestType("fixed")}
              className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                interestType === "fixed"
                  ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t("fullCalc.fixed")} ({(FIXED_RATE * 100).toFixed(0)}%)
            </button>
            <button
              type="button"
              onClick={() => setInterestType("variable")}
              className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                interestType === "variable"
                  ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t("fullCalc.variable")} ({(VARIABLE_RATE * 100).toFixed(0)}%)
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 space-y-4">
          <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/80 p-4 transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">{t("fullCalc.loanAmount")}</span>
              <span className="text-xl font-bold text-slate-900">€{loanAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-[var(--accent-light)]/50 to-white p-4 transition-all duration-300">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{t("fullCalc.monthlyCuota")}</p>
            <p className="mt-1 text-2xl font-bold text-[var(--accent)]">
              €{Math.round(monthlyCuota).toLocaleString()}/mo
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200/80 bg-white p-4">
              <p className="text-xs font-medium text-slate-500">{t("fullCalc.tax")}</p>
              <p className="mt-1 font-bold text-slate-900">€{totalTax.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-4">
              <p className="text-xs font-medium text-slate-500">{t("fullCalc.costs")}</p>
              <p className="mt-1 font-bold text-slate-900">€{totalCosts.toLocaleString()}</p>
            </div>
          </div>
          <div
            className="rounded-xl border-2 border-[var(--accent)]/30 bg-[var(--accent-light)]/20 p-4 transition-all duration-300"
            style={{
              boxShadow: `0 4px 14px rgba(13, 148, 136, ${0.1 + progress * 0.15})`,
            }}
          >
            <p className="text-xs font-medium text-slate-600">{t("fullCalc.totalUpfront")}</p>
            <p className="mt-1 text-lg font-bold text-[var(--accent)]">
              €{(downPayment + totalFees).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
