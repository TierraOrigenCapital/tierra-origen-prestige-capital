import Link from "next/link";

export default function Home() {
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
            Invest in Colombian Real Estate — From Spain.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            A secure, structured platform for Colombians abroad to build wealth through property in Colombia.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/full-ownership"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-semibold text-white shadow-colored hover:opacity-95 transition-opacity"
            >
              I Am a Legal Resident in Spain
            </Link>
            <Link
              href="/fractional"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[var(--accent)] bg-white px-6 py-3.5 text-base font-semibold text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors"
            >
              I Am in Process / Without Papers
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200/80 bg-white/50 backdrop-blur-sm py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How It Works</h2>
          <p className="mt-2 text-slate-600">Three simple steps to start building wealth in Colombia.</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { step: "1", title: "Apply & Verify Identity", desc: "Submit your inquiry and complete KYC verification." },
              { step: "2", title: "Choose Your Investment Model", desc: "Full ownership or fractional—pick what fits your situation." },
              { step: "3", title: "Earn Rental Income + Appreciation", desc: "Receive proportional returns and track everything in your dashboard." },
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
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl text-center">Two Investment Paths</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="group rounded-2xl bg-white p-8 shadow-soft border border-slate-100 hover:shadow-colored transition-all duration-300">
              <span className="text-3xl" aria-hidden>🇪🇸</span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">For Legal Residents in Spain</h3>
              <p className="mt-2 text-slate-600">
                Full property ownership in Colombia. Managed, insured, income-generating.
              </p>
              <Link
                href="/full-ownership"
                className="mt-6 inline-flex items-center text-[var(--accent)] font-semibold hover:underline"
              >
                Explore Full Ownership →
              </Link>
            </div>
            <div className="group rounded-2xl bg-white p-8 shadow-soft border border-slate-100 hover:shadow-gold transition-all duration-300">
              <span className="text-3xl" aria-hidden>🌍</span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">For Colombians in Regularization</h3>
              <p className="mt-2 text-slate-600">
                Fractional property investment. Own a percentage. Earn proportional returns.
              </p>
              <Link
                href="/fractional"
                className="mt-6 inline-flex items-center text-[var(--gold)] font-semibold hover:underline"
              >
                Explore Fractional Investment →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security & structure */}
      <section className="border-y border-slate-200/80 bg-slate-50/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl text-center">Security & Structure</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Notary-backed agreements (Spain)",
              "Registered property title in Colombia",
              "Colombian bank-managed transactions",
              "Rental insurance protection",
              "Transparent annual management reporting",
              "Dashboard access for investors",
            ].map((item) => (
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
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Returns & Fees</h2>
          <p className="mt-4 text-slate-600">
            Target gross rental yield: <strong>10–20%</strong> annually (depending on property). Management fee:{" "}
            <strong>10%</strong> of rental income generated. Property insurance included. Colombian bank handling fees disclosed transparently.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[var(--accent-light)]/40 blur-3xl rounded-full scale-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Start Building Wealth in Colombia</h2>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-colored hover:opacity-95 transition-opacity"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
