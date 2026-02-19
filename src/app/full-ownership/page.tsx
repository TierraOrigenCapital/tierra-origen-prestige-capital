"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { FullOwnershipCalculator } from "@/components/FullOwnershipCalculator";

const STEP_KEYS = ["step1", "step2", "step3", "step4", "step5", "step6", "step7", "step8"] as const;

export default function FullOwnershipPage() {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden">
      <section className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[var(--accent-light)] opacity-50 blur-3xl -z-10" />
        <div className="mx-auto max-w-4xl">
          <div className="relative mb-10 h-56 overflow-hidden rounded-2xl sm:h-72">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
              alt="Colombian property for full ownership"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
          </div>
          <div className="max-w-3xl">
            <span className="text-2xl" aria-hidden>🇪🇸</span>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">{t("fullOwnership.title")}</h1>
            <p className="mt-6 text-lg text-slate-600">
              {t("fullOwnership.intro")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900">{t("fullOwnership.processFlow")}</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ol className="space-y-3">
              {STEP_KEYS.map((key, i) => (
                <li
                  key={key}
                  className="flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-soft border border-slate-100"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-slate-700">{t(`fullOwnership.${key}`)}</span>
                </li>
              ))}
            </ol>
            <FullOwnershipCalculator />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2 mb-12">
            <div className="relative h-52 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
                alt="Colombian urban building"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-52 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
                alt="Modern property in Colombia"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{t("fullOwnership.financial")}</h2>
            <ul className="mt-6 space-y-2 text-slate-600">
              <li>• {t("fullOwnership.financial1")}</li>
              <li>• {t("fullOwnership.financial2")}</li>
              <li>• {t("fullOwnership.financial3")}</li>
              <li>• {t("fullOwnership.financial4")}</li>
              <li>• {t("fullOwnership.financial5")}</li>
              <li>• {t("fullOwnership.financial6")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-slate-50/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">{t("fullOwnership.whatYouOwn")}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {["own1", "own2", "own3", "own4"].map((key) => (
              <li key={key} className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-soft">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                {t(`fullOwnership.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/signup?path=full-ownership"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-colored hover:opacity-95 transition-opacity"
          >
            {t("fullOwnership.cta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
