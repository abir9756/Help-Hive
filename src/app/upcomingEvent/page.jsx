"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Search,
  ArrowRight,
  Filter,
  CalendarCheck,
} from "lucide-react";

import EventCard from "@/components/event-card";
import { getUpcomingEvents } from "@/lib/events";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const categories = [
  "All Events",
  "Community Service",
  "Cleanup",
  "Plantation",
  "Education",
  "Donation",
  "Healthcare",
  "Animal Welfare",
];

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Events");
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

  const upcomingEvents = getUpcomingEvents(events, { category, search });

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

      {/* Events Section */}
      <section
        id="events"
        className="mx-auto max-w-[1180px] px-5 py-16"
      >
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-bold tracking-widest text-brand-accent uppercase">
              Find Your Purpose
            </p>
            <h2 className="text-3xl font-bold text-brand-ink md:text-4xl">
              Explore Upcoming Events
            </h2>
            <p className="mt-3 text-brand-muted">
              Find an opportunity to help your community.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card px-5 py-3 shadow-[0_18px_40px_-32px_rgba(10,61,43,0.5)]">
            <p className="text-sm text-brand-muted">Available Events</p>
            <p className="text-2xl font-bold text-brand-ink">
              {upcomingEvents.length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand-muted/70"
              size={20}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search by event name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-4 pr-4 pl-12 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/50 focus:border-brand-accent focus:ring-4 focus:ring-brand-soft"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4">
            <Filter size={18} className="text-brand-accent" aria-hidden="true" />
            <span className="text-sm font-medium text-brand-muted">
              Filter events
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex gap-3 overflow-x-auto pb-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                category === item
                  ? "bg-brand text-white shadow-[0_10px_24px_-16px_rgba(10,61,43,0.8)]"
                  : "border border-border bg-card text-brand-muted hover:border-brand-accent hover:text-brand-ink"
              }`}
            >
              {item}
            </button>
          ))}
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
          <div className="rounded-3xl border border-dashed border-border bg-card py-20 text-center">
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
            <button
              onClick={() => {
                setSearch("");
                setCategory("All Events");
              }}
              className="mt-5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
