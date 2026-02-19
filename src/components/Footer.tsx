import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-900">Tierra Origen Prestige Capital</p>
            <p className="mt-1 text-sm text-slate-500">
              Colombian real estate investment for Colombians in Spain.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link href="/full-ownership" className="text-sm text-slate-600 hover:text-[var(--accent)]">
              Full Ownership
            </Link>
            <Link href="/fractional" className="text-sm text-slate-600 hover:text-[var(--accent)]">
              Fractional
            </Link>
            <Link href="/signup" className="text-sm text-slate-600 hover:text-[var(--accent)]">
              Apply
            </Link>
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-[var(--accent)]">
              Dashboard
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          © {new Date().getFullYear()} Tierra Origen Prestige Capital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
