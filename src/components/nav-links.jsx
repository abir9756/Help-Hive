"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, House } from "lucide-react";

const navLink =
  "relative flex shrink-0 items-center gap-2 rounded-full px-3 py-2.5 text-[15px] font-medium text-brand-muted transition-colors hover:bg-brand-soft/70 hover:text-brand-ink";

const navIcon = "size-[18px]";

export const navLinks = [
  { href: "/", label: "Home", icon: House, exact: true },
  { href: "/upcomingEvent", label: "Upcoming Events", icon: CalendarDays },
];

export function NavLinksFallback() {
  return (
    <div className="ml-1 flex items-center gap-0.5 lg:ml-3">
      {navLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-label={label}
          className={navLink}
        >
          <Icon className={navIcon} strokeWidth={2} aria-hidden="true" />
          <span className="hidden sm:inline">{label}</span>
        </Link>
      ))}
    </div>
  );
}

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="ml-1 flex items-center gap-0.5 lg:ml-3">
      {navLinks.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            aria-label={label}
            className={`${navLink} ${isActive ? "bg-brand-soft font-semibold text-brand-ink" : ""}`}
          >
            <Icon className={navIcon} strokeWidth={2} aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
            {isActive ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand-accent"
              />
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
