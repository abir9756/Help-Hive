"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  Heart,
  Share2,
  Users,
  ShieldCheck,
  HandHeart,
  LoaderCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function LoadingState() {
  return (
    <div className="flex min-h-[calc(100svh-104px)] items-center justify-center bg-brand-surface">
      <LoaderCircle
        className="animate-spin text-brand-accent"
        size={40}
        aria-hidden="true"
      />
    </div>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <EventDetailsContent />
    </Suspense>
  );
}

function EventDetailsContent() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/upcomingEvent`);

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        const foundEvent = Array.isArray(data)
          ? data.find((item) => item._id === id)
          : null;

        setEvent(foundEvent ?? null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  const formatDate = (date) =>
    new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Event link copied!");
    } catch {
      alert("Unable to copy event link.");
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!event) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-brand-surface px-5 text-center">
        <CalendarDays
          size={55}
          className="text-brand-muted/30"
          aria-hidden="true"
        />
        <h2 className="mt-5 text-2xl font-bold text-brand-ink">Event Not Found</h2>
        <p className="mt-2 text-brand-muted">
          This event may have been removed or does not exist.
        </p>
        <Link
          href="/upcomingEvent"
          className="mt-6 rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand/90"
        >
          Explore Events
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100svh-104px)] bg-brand-surface pb-20">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-brand px-5 pt-8 pb-12 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-20 size-96 rounded-full bg-brand-accent/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/3 size-80 rounded-full bg-brand-soft/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1180px]">
          <Link
            href="/upcomingEvent"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-brand-light"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Events
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full border border-brand-light/30 bg-brand-light/10 px-4 py-2 text-sm font-medium text-brand-light">
                {event.category}
              </span>

              <h1 className="mt-6 text-4xl leading-tight font-bold md:text-5xl">
                {event.title}
              </h1>

              <p className="mt-5 max-w-xl leading-8 text-white/70">
                {event.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/10 p-3">
                    <CalendarDays
                      className="text-brand-light"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Event Date</p>
                    <p className="mt-1 font-semibold">
                      {formatDate(event.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/10 p-3">
                    <MapPin className="text-brand-light" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Event Location</p>
                    <p className="mt-1 font-semibold">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border-4 border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-[300px] w-full object-cover md:h-[400px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-[1180px] gap-8 px-5 py-14 lg:grid-cols-3">
        {/* Left Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* About Event */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_22px_50px_-46px_rgba(10,61,43,0.5)] md:p-9">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-brand-soft p-3">
                <HandHeart className="text-brand-ink" size={23} aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-brand-ink">
                About This Event
              </h2>
            </div>

            <p className="leading-8 text-brand-muted">{event.description}</p>

            <p className="mt-5 leading-8 text-brand-muted">
              Every small contribution can create a meaningful change. Join
              this community initiative, connect with other volunteers, and
              help make a positive impact in society.
            </p>
          </div>

          {/* Event Information */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_22px_50px_-46px_rgba(10,61,43,0.5)] md:p-9">
            <h2 className="mb-7 text-2xl font-bold text-brand-ink">
              Event Information
            </h2>

            <div className="grid gap-7 sm:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-brand-soft p-3">
                  <CalendarDays className="text-brand-ink" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-brand-muted/70">Date</p>
                  <p className="mt-1 font-semibold text-brand-ink">
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-brand-soft p-3">
                  <MapPin className="text-brand-ink" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-brand-muted/70">Location</p>
                  <p className="mt-1 font-semibold text-brand-ink">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-brand-soft p-3">
                  <HandHeart className="text-brand-ink" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-brand-muted/70">Category</p>
                  <p className="mt-1 font-semibold text-brand-ink">
                    {event.category}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-brand-soft p-3">
                  <ShieldCheck className="text-brand-ink" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-brand-muted/70">Event Status</p>
                  <p className="mt-1 font-semibold text-brand-accent">
                    Upcoming
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="rounded-3xl bg-brand-soft p-8 md:p-10">
            <h2 className="text-2xl font-bold text-brand-ink">
              Be Part of Something Meaningful!
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-brand-muted">
              Your time, kindness, and support can make a real difference. Take
              the first step toward creating a better community.
            </p>
            <Link
              href="/upcomingEvent"
              className="mt-6 inline-flex items-center gap-2 font-bold text-brand-ink hover:text-brand-accent"
            >
              Explore More Events{" "}
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          {/* Join Card */}
          <div className="sticky top-24 rounded-3xl border border-border bg-card p-7 shadow-[0_22px_50px_-46px_rgba(10,61,43,0.5)]">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-brand-ink">Get Involved</h3>
              <div className="rounded-full bg-brand-soft p-3">
                <Heart className="text-brand-ink" size={20} aria-hidden="true" />
              </div>
            </div>

            <p className="mb-7 text-sm leading-7 text-brand-muted">
              Ready to make a difference? Become part of this event and help
              bring positive change to your community.
            </p>

            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 font-semibold text-white shadow-[0_16px_30px_-18px_rgba(10,61,43,0.7)] transition duration-300 hover:bg-brand/90"
            >
              Join This Event <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <button
              onClick={handleShare}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border py-4 font-semibold text-brand-ink transition hover:bg-brand-soft/60"
            >
              <Share2 size={18} aria-hidden="true" />
              Share Event
            </button>

            <div className="mt-7 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-brand-soft p-3">
                  <Users size={20} className="text-brand-ink" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-brand-ink">Community Driven</p>
                  <p className="text-xs text-brand-muted/70">
                    Together we can do more
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* HelpHive Card */}
          <div className="rounded-3xl bg-brand p-7 text-white">
            <div className="mb-5 inline-flex rounded-xl bg-white/10 p-3">
              <HandHeart
                className="text-brand-light"
                size={24}
                aria-hidden="true"
              />
            </div>

            <h3 className="text-xl font-bold">Small Actions, Big Changes.</h3>

            <p className="mt-3 text-sm leading-7 text-white/60">
              HelpHive connects people who care with opportunities to make a
              difference.
            </p>

            <Link
              href="/upcomingEvent"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-light transition hover:text-white"
            >
              Discover More <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
