import Link from "next/link";

export const metadata = {
  title: "Dashboard | Tierra Origen Prestige Capital",
  description: "Manage your investments and view documents.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Investor Dashboard</h1>
      <p className="mt-1 text-slate-600">Overview of your investments and pending actions.</p>

      {/* Pending approval banner */}
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div>
            <h2 className="font-semibold text-slate-900">Pending approval</h2>
            <p className="text-sm text-slate-600">Your inquiry is under review. We will notify you once approved.</p>
          </div>
        </div>
      </div>

      {/* Dashboard sections placeholder */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {[
          { title: "Investment overview", desc: "Total invested, expected return, rental income, property value", href: "#" },
          { title: "Documents", desc: "Agreements, notary records, insurance, bank confirmation", href: "#" },
          { title: "Income reports", desc: "Monthly rental income, fees, net profit, annual summary", href: "#" },
          { title: "Pending actions", desc: "Deposit required, signature pending, verification", href: "#" },
          { title: "Withdrawals", desc: "Request payout or reinvest", href: "#" },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow-soft border border-slate-100 hover:shadow-colored transition-shadow"
          >
            <h3 className="font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{card.desc}</p>
            <Link href={card.href} className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
              View →
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Full dashboard with Wix-backed data and login will be connected in a later stage.
      </p>
    </div>
  );
}
