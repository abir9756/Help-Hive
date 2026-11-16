import Link from "next/link";
import { ArrowRight, CalendarHeart, Heart } from "lucide-react";

export const metadata = {
  title: "Joined Events — HelpHive",
};

export default function JoinedEventsPage() {
  return (
    <main className="min-h-[calc(100svh-104px)] bg-brand-surface px-5 py-16 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-bold tracking-widest text-brand-accent uppercase">
              Your Impact
            </p>
            <h1 className="text-3xl font-bold text-brand-ink md:text-4xl">
              Joined Events
            </h1>
            <p className="mt-3 max-w-xl text-brand-muted">
              Every event you join will be collected here so you can revisit the
              causes you have supported.
            </p>
          </div>

          <Link
            href="/upcomingEvent"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-accent hover:bg-brand-soft/60 md:self-auto"
          >
            <CalendarHeart size={18} aria-hidden="true" />
            Browse Events
          </Link>
        </div>

        <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center shadow-[0_22px_50px_-46px_rgba(10,61,43,0.5)]">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-soft text-brand-ink">
            <Heart size={30} aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-brand-ink">
            You have not joined an event yet
          </h2>
          <p className="mx-auto mt-3 max-w-md text-brand-muted">
            Find a cause you care about and take the first step toward making a
            difference in your community.
          </p>
          <Link
            href="/upcomingEvent"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            Explore upcoming events
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
