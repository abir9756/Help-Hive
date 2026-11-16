import { Suspense } from "react";
import Link from "next/link";
import { HandHeart } from "lucide-react";

import NavLinks, { NavLinksFallback } from "@/components/nav-links";
import ThemeToggle from "@/components/theme-toggle";
import UserMenu from "@/components/user-menu";

export default function SiteNavbar() {
  return (
    <header className="relative isolate overflow-hidden bg-brand-surface px-3 py-4 sm:px-5 lg:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-24 size-80 rounded-full bg-brand-light/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-brand-light/30 blur-3xl"
      />

      <nav
        aria-label="Main"
        className="relative mx-auto flex w-full max-w-[1180px] items-center gap-1.5 rounded-[30px] border border-border bg-card px-3 py-3 shadow-[0_22px_50px_-34px_rgba(10,61,43,0.55)] sm:gap-2 sm:px-5 lg:py-3.5"
      >
        <Link
          href="/"
          aria-label="HelpHive home"
          className="flex shrink-0 items-center gap-3"
        >
          <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand-ink">
            <HandHeart className="size-8" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span aria-hidden="true" className="hidden h-9 w-px bg-border sm:block" />
          <span className="hidden flex-col sm:flex">
            <span className="text-[27px] leading-none font-extrabold tracking-[-0.05em] text-brand-ink">
              Help<span className="text-brand-accent">Hive</span>
            </span>
            <span className="mt-1 hidden text-[10px] font-medium text-brand-muted xl:block">
              Together for a better tomorrow.
            </span>
          </span>
        </Link>

        <Suspense fallback={<NavLinksFallback />}>
          <NavLinks />
        </Suspense>

        <div className="ml-auto flex shrink-0 items-center gap-2 pl-1 sm:gap-3">
          <ThemeToggle />
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
