"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { FractionalCalculator } from "@/components/FractionalCalculator";

const HOW_KEYS = ["how1", "how2", "how3", "how4", "how5"] as const;

export default function FractionalPage() {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden">
      <section className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-[var(--gold-light)] opacity-50 blur-3xl -z-10" />
        <div className="mx-auto max-w-4xl">
          <div className="relative mb-10 h-56 overflow-hidden rounded-2xl sm:h-72">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
              alt="Colombian property for fractional investment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
          </div>
          <div className="max-w-3xl">
            <span className="text-2xl" aria-hidden>🌍</span>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">{t("fractional.title")}</h1>
            <p className="mt-6 text-lg text-slate-600">{t("fractional.intro")}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900">{t("fractional.howWorks")}</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ul className="space-y-3">
              {HOW_KEYS.map((key) => (
                <li key={key} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-soft border border-slate-100">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--gold-light)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                  </span>
                  <span className="text-slate-700">{t(`fractional.${key}`)}</span>
                </li>
              ))}
            </ul>
            <FractionalCalculator />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-3 mb-10">
            <div className="relative h-40 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3f?w=400&q=80"
                alt="Colombian terrain"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-40 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80"
                alt="Property in Colombia"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-40 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80"
                alt="Colombian real estate"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          </div>
          <div className="max-w-3xl rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">{t("fractional.example")}</h2>
            <p className="mt-4 text-slate-600">{t("fractional.exampleText")}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">{t("fractional.financial")}</h2>
          <ul className="mt-6 space-y-2 text-slate-600">
            <li>• {t("fractional.financial1")}</li>
            <li>• {t("fractional.financial2")}</li>
            <li>• {t("fractional.financial3")}</li>
            <li>• {t("fractional.financial4")}</li>
            <li>• {t("fractional.financial5")}</li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-50/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">{t("fractional.whatYouOwn")}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {["own1", "own2", "own3", "own4"].map((key) => (
              <li key={key} className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-soft">
                <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                {t(`fractional.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/signup?path=fractional"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--gold)] px-8 py-4 text-base font-semibold text-white shadow-gold hover:opacity-95 transition-opacity"
          >
            {t("fractional.cta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
