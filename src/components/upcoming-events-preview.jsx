"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import EventCard from "@/components/event-card";
import { getUpcomingEvents } from "@/lib/events";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const PREVIEW_LIMIT = 6;

export default function UpcomingEventsPreview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/upcomingEvent`);
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const upcomingEvents = getUpcomingEvents(events, { limit: PREVIEW_LIMIT });

  return (
    <section className="border-t border-border bg-brand-surface px-5 py-16 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-bold tracking-widest text-brand-accent uppercase">
              Find Your Purpose
            </p>
            <h2 className="text-3xl font-bold text-brand-ink md:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-3 text-brand-muted">
              Find an opportunity to help your community.
            </p>
          </div>

          <Link
            href="/upcomingEvent"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-accent hover:bg-brand-soft/60 md:self-auto"
          >
            View All Events
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        {/* Event Cards */}
        {loading ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[390px] animate-pulse rounded-3xl bg-brand-soft"
              />
            ))}
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card py-16 text-center">
            <CalendarDays
              size={42}
              className="mx-auto text-brand-muted/30"
              aria-hidden="true"
            />
            <h3 className="mt-4 text-xl font-bold text-brand-ink">
              No Events Found
            </h3>
            <p className="mt-2 text-sm text-brand-muted">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
