"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const COLOMBIAN_IMAGES = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Colombian architecture" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3f?w=600&q=80", alt: "Colombian mountain terrain" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", alt: "Colombian property" },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[var(--accent-light)] opacity-60 blur-3xl" />
          <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-[var(--gold-light)] opacity-50 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            {t("home.heroSub")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/full-ownership"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-semibold text-white shadow-colored hover:opacity-95 transition-opacity"
            >
              {t("home.ctaResident")}
            </Link>
            <Link
              href="/fractional"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[var(--accent)] bg-white px-6 py-3.5 text-base font-semibold text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors"
            >
              {t("home.ctaProcess")}
            </Link>
          </div>
        </div>
      </section>

      {/* Colombian properties gallery */}
      <section className="overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {COLOMBIAN_IMAGES.map((img) => (
              <div key={img.src} className="relative h-64 min-w-[280px] flex-shrink-0 snap-center overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 400px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200/80 bg-white/50 backdrop-blur-sm py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("home.howWorks")}</h2>
          <p className="mt-2 text-slate-600">{t("home.howWorksSub")}</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { step: "1", title: t("home.step1"), desc: t("home.step1Desc") },
              { step: "2", title: t("home.step2"), desc: t("home.step2Desc") },
              { step: "3", title: t("home.step3"), desc: t("home.step3Desc") },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl bg-white p-6 shadow-soft border border-slate-100 hover:shadow-colored transition-shadow"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-light)] text-[var(--accent)] font-bold">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two investment paths */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl text-center">{t("home.twoPaths")}</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="group rounded-2xl overflow-hidden bg-white shadow-soft border border-slate-100 hover:shadow-colored transition-all duration-300">
              <div className="relative h-48 bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                  alt="Full ownership property in Colombia"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <span className="text-3xl" aria-hidden>🇪🇸</span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{t("home.pathLegal")}</h3>
                <p className="mt-2 text-slate-600">{t("home.pathLegalDesc")}</p>
                <Link
                  href="/full-ownership"
                  className="mt-6 inline-flex items-center text-[var(--accent)] font-semibold hover:underline"
                >
                  {t("home.pathLegalCta")}
                </Link>
              </div>
            </div>
            <div className="group rounded-2xl overflow-hidden bg-white shadow-soft border border-slate-100 hover:shadow-gold transition-all duration-300">
              <div className="relative h-48 bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Fractional investment property in Colombia"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <span className="text-3xl" aria-hidden>🌍</span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{t("home.pathReg")}</h3>
                <p className="mt-2 text-slate-600">{t("home.pathRegDesc")}</p>
                <Link
                  href="/fractional"
                  className="mt-6 inline-flex items-center text-[var(--gold)] font-semibold hover:underline"
                >
                  {t("home.pathRegCta")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & structure */}
      <section className="border-y border-slate-200/80 bg-slate-50/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl text-center">{t("home.security")}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {[t("home.security1"), t("home.security2"), t("home.security3"), t("home.security4"), t("home.security5"), t("home.security6")].map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-soft">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-light)]">
                  <svg className="h-3.5 w-3.5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Returns & fees */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("home.returns")}</h2>
          <p className="mt-4 text-slate-600">
            {t("home.returnsDesc")}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[var(--accent-light)]/40 blur-3xl rounded-full scale-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("home.ctaFinal")}</h2>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-colored hover:opacity-95 transition-opacity"
          >
            {t("home.applyNow")}
          </Link>
        </div>
      </section>
    </div>
  );
}
