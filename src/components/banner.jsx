"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  HandHeart,
  Users,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-brand-surface px-4 py-6 sm:px-6 md:py-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="relative flex min-h-[560px] items-center overflow-hidden rounded-[32px] bg-brand shadow-[0_30px_70px_-45px_rgba(10,61,43,0.55)]">
          {/* Background decorations */}
          <div className="pointer-events-none absolute -top-32 -right-20 size-96 rounded-full bg-brand-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 size-80 rounded-full bg-brand-soft/10 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 grid w-full items-center gap-12 px-7 py-12 md:px-12 lg:grid-cols-2 lg:px-16 lg:py-16 xl:px-20">
            {/* Left Content */}
            <div className="text-white">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Sparkles
                  size={16}
                  className="text-brand-light"
                  aria-hidden="true"
                />
                <span className="text-sm text-white/80">
                  Together, We Make a Difference
                </span>
              </div>

              <h1 className="text-4xl leading-[1.12] font-bold sm:text-5xl lg:text-6xl">
                Make Your <span className="text-brand-light">Community</span> a
                Better Place.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-white/70 md:text-lg">
                Discover meaningful events, connect with passionate people, and
                take action to create positive changes in your community.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/upcomingEvent"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-light px-7 py-3.5 font-bold text-brand-deep transition-colors duration-300 hover:bg-brand-light/85"
                >
                  Explore Events
                  <ArrowRight size={19} aria-hidden="true" />
                </Link>

                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                >
                  Join Community
                </Link>
              </div>

              {/* Statistics */}
              <div className="mt-12 flex flex-wrap gap-8 border-t border-white/20 pt-8">
                <div>
                  <div className="flex items-center gap-2">
                    <Users
                      className="text-brand-light"
                      size={20}
                      aria-hidden="true"
                    />
                    <h3 className="text-2xl font-bold">Community</h3>
                  </div>
                  <p className="mt-1 text-sm text-white/60">
                    Connect with people
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      className="text-brand-light"
                      size={20}
                      aria-hidden="true"
                    />
                    <h3 className="text-2xl font-bold">Events</h3>
                  </div>
                  <p className="mt-1 text-sm text-white/60">
                    Discover activities
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop"
                  alt="People working together in a community volunteer event"
                  className="h-[320px] w-full object-cover sm:h-[380px] lg:h-[430px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand/50 to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-4 flex max-w-[240px] items-center gap-3 rounded-2xl bg-card p-4 shadow-xl md:-left-8">
                <div className="rounded-xl bg-brand-soft p-3 text-brand-ink">
                  <HandHeart size={25} aria-hidden="true" />
                </div>

                <div>
                  <h4 className="font-bold text-brand-ink">Make an Impact</h4>
                  <p className="mt-1 text-xs text-brand-muted">
                    Every action matters.
                  </p>
                </div>
              </div>

              {/* Location Tag */}
              <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-card/95 px-4 py-2 shadow-lg backdrop-blur-md">
                <MapPin
                  size={15}
                  className="text-brand-accent"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold text-brand-ink">
                  Your Community
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
