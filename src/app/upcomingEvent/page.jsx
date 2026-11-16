import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, CalendarCheck } from "lucide-react";

import UpcomingEventsExplorer from "@/components/upcoming-events-explorer";
import { getUpcomingEvents } from "@/lib/events";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const metadata = {
  title: "Upcoming Events — HelpHive",
};

async function getEvents() {
  try {
    const response = await fetch(`${API_URL}/upcomingEvent`);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

function EventsSkeleton() {
  return (
    <section id="events" className="mx-auto max-w-[1180px] px-5 py-16">
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-[390px] animate-pulse rounded-3xl bg-brand-soft"
          />
        ))}
      </div>
    </section>
  );
}

async function EventsList() {
  await connection();

  const events = await getEvents();
  const upcomingEvents = getUpcomingEvents(events);

  return <UpcomingEventsExplorer events={upcomingEvents} />;
}

export default function UpcomingEvents() {
  return (
    <main className="min-h-[calc(100svh-104px)] bg-brand-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand px-5 py-20 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-20 size-96 rounded-full bg-brand-accent/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/3 size-80 rounded-full bg-brand-soft/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1180px]">
          <div className="max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-brand-light backdrop-blur-sm">
              <CalendarCheck size={16} aria-hidden="true" />
              Make a Difference Together
            </span>

            <h1 className="text-4xl leading-tight font-bold md:text-6xl">
              Upcoming Events,
              <span className="text-brand-light"> Real Impact.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
              Discover meaningful community events, connect with passionate
              people, and become part of something bigger.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#events"
                className="inline-flex items-center gap-2 rounded-full bg-brand-light px-6 py-3 font-semibold text-brand-deep transition-colors duration-300 hover:bg-brand-light/85"
              >
                Explore Events <ArrowRight size={18} aria-hidden="true" />
              </a>

              <Link
                href="/createEvent"
                className="rounded-full border border-white/30 px-6 py-3 font-semibold transition-colors duration-300 hover:bg-white/10"
              >
                Create an Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<EventsSkeleton />}>
        <EventsList />
      </Suspense>
    </main>
  );
}
