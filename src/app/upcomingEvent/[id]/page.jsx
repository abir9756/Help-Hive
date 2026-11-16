


import Link from "next/link";
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
import JointEventCard from "@/components/jointEvent/jointEventCard";



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

export  default async function EventDetailsPage ({params}) {

const {id} = await params;
const res = await fetch(`http://localhost:5000/upcomingEvent/${id}`)
const Data = await res.json()



  const formatDate = (date) =>
    new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });




  if (!Data) {
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
                {Data.category}
              </span>

              <h1 className="mt-6 text-4xl leading-tight font-bold md:text-5xl">
                {Data.title}
              </h1>

              <p className="mt-5 max-w-xl leading-8 text-white/70">
                {Data.description}
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
                      {formatDate(Data.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/10 p-3">
                    <MapPin className="text-brand-light" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Event Location</p>
                    <p className="mt-1 font-semibold">{Data.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border-4 border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={Data.thumbnail}
                alt={Data.title}
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

            <p className="leading-8 text-brand-muted">{Data.description}</p>

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
                    {formatDate(Data.date)}
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
                    {Data.location}
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
                    {Data.category}
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
       <JointEventCard Data={Data}></JointEventCard>
      </section>
    </main>
  );
}
