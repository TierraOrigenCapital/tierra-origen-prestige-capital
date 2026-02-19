"use client";

import { useState } from "react";

const PROPERTY_PRICE = 200_000;
const ANNUAL_YIELD_LOW = 0.10;
const ANNUAL_YIELD_HIGH = 0.20;
const MANAGEMENT_FEE = 0.10;

export function FractionalCalculator() {
  const [percent, setPercent] = useState(5);

  const yourInvestment = Math.round((PROPERTY_PRICE * percent) / 100);
  const afterManagementLow = Math.round(yourInvestment * ANNUAL_YIELD_LOW * (1 - MANAGEMENT_FEE));
  const afterManagementHigh = Math.round(yourInvestment * ANNUAL_YIELD_HIGH * (1 - MANAGEMENT_FEE));
  const fillPercent = (percent / 50) * 100; // 50 is max

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-gold lg:sticky lg:top-24">
      <h3 className="text-lg font-bold text-slate-900">Your Fractional Share</h3>
      <p className="mt-1 text-sm text-slate-500">Drag the slider to explore your investment</p>

      <div className="mt-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Property: €{PROPERTY_PRICE.toLocaleString()}</span>
          <span className="font-bold text-[var(--gold)]">{percent}% share</span>
        </div>
        <div className="relative mt-3">
          <div
            className="pointer-events-none absolute top-1/2 h-2.5 w-full -translate-y-1/2 rounded-full bg-slate-200"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-[var(--gold)] transition-all duration-150"
            style={{ width: `${fillPercent}%` }}
            aria-hidden
          />
          <input
            type="range"
            min={1}
            max={50}
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
            className="fractional-slider relative z-10 mt-0 h-6 w-full cursor-grab appearance-none bg-transparent active:cursor-grabbing [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--gold)] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-110"
          />
        </div>
        <p className="mt-1 text-xs text-slate-400">1% – 50%</p>
      </div>

      <div className="mt-6 space-y-4 rounded-xl bg-slate-50/80 p-4 transition-colors duration-200">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Your investment</span>
          <span className="text-lg font-bold text-slate-900">€{yourInvestment.toLocaleString()}</span>
        </div>
        <div className="rounded-lg border border-slate-200/80 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Est. annual rental income</p>
          <p className="mt-1 text-xl font-bold text-[var(--gold)]">
            €{afterManagementLow.toLocaleString()} – €{afterManagementHigh.toLocaleString()}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">after 10% management fee · 10–20% gross yield</p>
        </div>
      </div>
    </div>
  );
}
