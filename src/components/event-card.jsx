import Link from "next/link";
import { ArrowRight, CalendarDays, Heart, MapPin } from "lucide-react";

import { formatEventDate } from "@/lib/events";

export default function EventCard({ event }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_22px_50px_-42px_rgba(10,61,43,0.55)] transition duration-300 hover:-translate-y-2 hover:border-brand-accent/40 hover:shadow-[0_30px_55px_-38px_rgba(10,61,43,0.6)]">
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute top-4 left-4 rounded-full bg-brand-soft/95 px-4 py-2 text-xs font-bold text-brand-ink shadow-sm">
          {event.category}
        </span>

        <button
          aria-label="Save event"
          className="absolute top-4 right-4 z-10 rounded-full bg-card/90 p-2.5 text-brand-ink transition hover:bg-brand-light hover:text-brand-deep"
        >
          <Heart size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-brand-accent">
          <CalendarDays size={17} aria-hidden="true" />
          {formatEventDate(event.date)}
        </div>

        <h3 className="line-clamp-2 text-xl font-bold text-brand-ink transition group-hover:text-brand-accent">
          {event.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-brand-muted">
          {event.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm text-brand-muted">
          <MapPin
            size={17}
            className="shrink-0 text-brand-accent"
            aria-hidden="true"
          />
          {event.location}
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <Link
            href={`/upcomingEvent/${event._id}`}
            className="flex items-center justify-between font-semibold text-brand-ink transition after:absolute after:inset-0 after:content-[''] hover:text-brand-accent"
          >
            View Details
            <ArrowRight
              size={19}
              className="transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
