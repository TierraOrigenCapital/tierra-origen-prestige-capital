import Link from "next/link";

export const metadata = {
  title: "Full Property Ownership – For Legal Residents in Spain | Tierra Origen Prestige Capital",
  description:
    "Colombians legally residing in Spain can purchase fully owned property in Colombia through our structured investment fund.",
};

export default function FullOwnershipPage() {
  const steps = [
    "Submit Investment Inquiry",
    "KYC & Identity Verification",
    "Initial 15% Deposit into Escrow Bank Account",
    "Property Selection",
    "Sign Notary Agreement in Spain",
    "Property Registered in Colombia",
    "Colombian Bank Manages Handover",
    "Property Enters Rental Operation",
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[var(--accent-light)] opacity-50 blur-3xl -z-10" />
        <div className="mx-auto max-w-3xl">
          <span className="text-2xl" aria-hidden>🇪🇸</span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Full Property Ownership – For Legal Residents in Spain
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Colombians legally residing in Spain can purchase fully owned property in Colombia through our structured investment fund and property acquisition vehicle. You become the <strong>100% legal owner</strong> of the property.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Process Flow</h2>
          <ol className="mt-6 space-y-3">
            {steps.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-soft border border-slate-100"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Financial Structure</h2>
          <ul className="mt-6 space-y-2 text-slate-600">
            <li>• Initial approval deposit: <strong>15%</strong></li>
            <li>• Target rental yield: <strong>10–20%</strong> annually (market dependent)</li>
            <li>• Management fee: <strong>10%</strong> of rental income</li>
            <li>• Property insurance included</li>
            <li>• Colombian bank commission disclosed</li>
            <li>• Annual financial reporting provided</li>
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-slate-50/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">What You Own</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Full property title in Colombia", "Rental income rights", "Appreciation upside", "Ability to sell property in future"].map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-soft">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                {item}
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
            Apply for Full Ownership Investment
          </Link>
        </div>
      </section>
    </div>
  );
}
