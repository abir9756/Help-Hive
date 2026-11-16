import Link from "next/link";
import { ArrowRight, CalendarPlus, CalendarRange } from "lucide-react";

export const metadata = {
  title: "Manage Events — HelpHive",
};

export default function ManageEventsPage() {
  return (
    <main className="min-h-[calc(100svh-104px)] bg-brand-surface px-5 py-16 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-bold tracking-widest text-brand-accent uppercase">
              Your Events
            </p>
            <h1 className="text-3xl font-bold text-brand-ink md:text-4xl">
              Manage Events
            </h1>
            <p className="mt-3 max-w-xl text-brand-muted">
              Keep track of the events you have created and update them whenever
              your plans change.
            </p>
          </div>

          <Link
            href="/createEvent"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(10,61,43,0.7)] transition hover:bg-brand/90 md:self-auto"
          >
            <CalendarPlus size={18} aria-hidden="true" />
            Create Event
          </Link>
        </div>

        <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center shadow-[0_22px_50px_-46px_rgba(10,61,43,0.5)]">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-soft text-brand-ink">
            <CalendarRange size={30} aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-brand-ink">
            No events to manage yet
          </h2>
          <p className="mx-auto mt-3 max-w-md text-brand-muted">
            Once you publish an event, it will appear here so you can review it
            and keep the details up to date.
          </p>
          <Link
            href="/createEvent"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            Create your first event
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
