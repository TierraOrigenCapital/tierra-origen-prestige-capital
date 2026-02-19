import Link from "next/link";
import { FractionalCalculator } from "@/components/FractionalCalculator";

export const metadata = {
  title: "Fractional Property Investment – For Colombians in Process | Tierra Origen Prestige Capital",
  description:
    "Invest in Colombian real estate through fractional ownership. Own a percentage, earn proportional returns.",
};

export default function FractionalPage() {
  const howItWorks = [
    "Each property is divided into shares",
    "Investors purchase fractions (e.g. 1%, 5%, 10%)",
    "Property is fully managed and rented",
    "Rental income distributed proportionally",
    "Appreciation distributed upon sale",
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-[var(--gold-light)] opacity-50 blur-3xl -z-10" />
        <div className="mx-auto max-w-3xl">
          <span className="text-2xl" aria-hidden>🌍</span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Fractional Property Investment – Accessible to Colombians in Process
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Colombians residing in Spain who are awaiting residency papers or in regularization can invest in Colombian real estate through a fractional ownership structure. Instead of buying 100%, you purchase a percentage share of a property together with other investors.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ul className="space-y-3">
              {howItWorks.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-soft border border-slate-100">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--gold-light)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                  </span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <FractionalCalculator />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Example</h2>
          <p className="mt-4 text-slate-600">
            A €200,000 property divided into 100 shares. You buy 5 shares → You own <strong>5%</strong>. You receive <strong>5%</strong> of net rental profits.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Financial Structure</h2>
          <ul className="mt-6 space-y-2 text-slate-600">
            <li>• Minimum investment defined per property</li>
            <li>• Rental target yield: <strong>10–20%</strong> gross (market dependent)</li>
            <li>• <strong>10%</strong> management fee on rental income</li>
            <li>• Insurance included</li>
            <li>• Transparent bank handling fees</li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-50/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">What You Own</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Legal fractional participation", "Proportional rental income", "Proportional appreciation rights", "Exit options defined in agreement"].map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-soft">
                <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                {item}
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
            Start Fractional Investment
          </Link>
        </div>
      </section>
    </div>
  );
}
