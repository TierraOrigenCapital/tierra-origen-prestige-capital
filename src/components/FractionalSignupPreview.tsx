"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PROPERTY_PRICE = 200_000;
const INVEST_MIN = 200;
const INVEST_MAX = 100_000;
const ANNUAL_YIELD_LOW = 0.10;
const ANNUAL_YIELD_HIGH = 0.20;
const MANAGEMENT_FEE = 0.10;

export function FractionalSignupPreview({
  shareRange,
  onShareChange,
}: {
  shareRange: number;
  onShareChange: (v: number) => void;
}) {
  const { t } = useLanguage();
  const [investAmount, setInvestAmount] = useState(() => {
    const fromShare = Math.round((PROPERTY_PRICE * shareRange) / 100);
    return Math.max(INVEST_MIN, Math.min(INVEST_MAX, fromShare));
  });

  useEffect(() => {
    const fromShare = Math.round((PROPERTY_PRICE * shareRange) / 100);
    setInvestAmount(Math.max(INVEST_MIN, Math.min(INVEST_MAX, fromShare)));
  }, [shareRange]);

  const derivedShare = Math.min(50, (investAmount / PROPERTY_PRICE) * 100);
  const yourInvestment = Math.round(investAmount);
  const afterManagementLow = Math.round(yourInvestment * ANNUAL_YIELD_LOW * (1 - MANAGEMENT_FEE));
  const afterManagementHigh = Math.round(yourInvestment * ANNUAL_YIELD_HIGH * (1 - MANAGEMENT_FEE));
  const fillPercent = ((investAmount - INVEST_MIN) / (INVEST_MAX - INVEST_MIN)) * 100;

  const handleInvestChange = (val: number) => {
    setInvestAmount(val);
    const share = Math.min(50, Math.round((val / PROPERTY_PRICE) * 100));
    onShareChange(share);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{t("signup.fracPathBudget")}</span>
          <span className="font-bold text-[var(--accent)]">€{investAmount.toLocaleString()}</span>
        </div>
        <div className="relative mt-3">
          <div className="pointer-events-none absolute top-1/2 h-2.5 w-full -translate-y-1/2 rounded-full bg-slate-200" />
          <div
            className="pointer-events-none absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-[var(--accent)] will-change-[width]"
            style={{ width: `${fillPercent}%` }}
          />
          <input
            type="range"
            min={INVEST_MIN}
            max={INVEST_MAX}
            step={100}
            value={investAmount}
            onInput={(e) => handleInvestChange(Number((e.target as HTMLInputElement).value))}
            className="ownership-slider relative z-10 h-6 w-full cursor-grab appearance-none bg-transparent active:cursor-grabbing [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow-lg"
          />
        </div>
        <p className="mt-1 text-xs text-slate-400">€200 – €100,000</p>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50/80 p-4">
        <div>
          <p className="text-xs font-medium text-slate-500">{t("fracCalc.yourInvestment")}</p>
          <p className="mt-1 text-lg font-bold text-slate-900">€{yourInvestment.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">{t("fracCalc.share")}</p>
          <p className="mt-1 text-lg font-bold text-[var(--accent)]">{derivedShare.toFixed(1)}%</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{t("fracCalc.estIncome")}</p>
        <p className="mt-1 text-xl font-bold text-[var(--accent)]">
          €{afterManagementLow.toLocaleString()} – €{afterManagementHigh.toLocaleString()}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">{t("fracCalc.afterFees")}</p>
      </div>
    </div>
  );
}
