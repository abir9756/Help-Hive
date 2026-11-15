import {
  CalendarDays,
  HandHeart,
  House,
  Image as ImageIcon,
  LogIn,
  Mail,
  Moon,
  Sun,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const navLink =
  "flex shrink-0 items-center gap-2 rounded-full px-3 py-2.5 text-[15px] font-medium text-[#3d4a41] transition-colors hover:bg-brand-soft/70 hover:text-brand"

const navIcon = "size-[18px]"

export default function SiteNavbar() {
  return (
    <header className="relative isolate overflow-hidden bg-brand-surface px-3 py-4 sm:px-5 lg:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-24 size-80 rounded-full bg-[#dce8cd]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-[#e7f0d9]/80 blur-3xl"
      />

      <nav
        aria-label="Main"
        className="relative mx-auto flex w-full max-w-[1180px] items-center gap-1.5 rounded-[30px] border border-[#e5e9dc] bg-white px-3 py-3 shadow-[0_22px_50px_-34px_rgba(10,61,43,0.55)] sm:gap-2 sm:px-5 lg:py-3.5"
      >
        <a href="#" aria-label="HelpHive home" className="flex shrink-0 items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
            <HandHeart className="size-8" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span
            aria-hidden="true"
            className="hidden h-9 w-px bg-[#e4e8db] sm:block"
          />
          <span className="hidden flex-col sm:flex">
            <span className="text-[27px] leading-none font-extrabold tracking-[-0.05em] text-brand">
              Help<span className="text-brand-accent">Hive</span>
            </span>
            <span className="mt-1 hidden text-[10px] font-medium text-brand-muted xl:block">
              Together for a better tomorrow.
            </span>
          </span>
        </a>

        <div className="ml-1 flex items-center gap-0.5 lg:ml-3">
          <a
            href="#"
            aria-current="page"
            aria-label="Home"
            className={`${navLink} relative bg-brand-soft font-semibold text-brand`}
          >
            <House className={navIcon} strokeWidth={2} aria-hidden="true" />
            <span className="hidden sm:inline">Home</span>
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand"
            />
          </a>

          <a href="#" aria-label="Upcoming Events" className={navLink}>
            <CalendarDays
              className={navIcon}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Upcoming Events</span>
          </a>
        </div>

       

        <div className="ml-auto flex shrink-0 items-center gap-2 pl-1 sm:gap-3">
         

          <div
            aria-hidden="true"
            className="hidden items-center gap-0.5 rounded-full bg-[#f7f4e7] p-1 md:flex"
          >
            <span className="grid size-8 place-items-center rounded-full bg-[#fdf2c9] text-[#d79a20] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <Sun className="size-4" strokeWidth={2} />
            </span>
            <span className="grid size-8 place-items-center rounded-full text-[#1f2a22]">
              <Moon className="size-4" strokeWidth={2} />
            </span>
          </div>

        <Link href={'/login'}>
          <Button
            type="button"
            aria-label="Login"
            className="h-11 shrink-0 gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(10,61,43,0.65)] hover:bg-brand/90 sm:px-5"
          >
            <LogIn className="size-[18px]" strokeWidth={2} aria-hidden="true" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        </Link>
        </div>
      </nav>
    </header>
  )
}
