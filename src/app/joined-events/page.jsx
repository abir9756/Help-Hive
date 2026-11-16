import Link from "next/link";
import {
  CalendarDays,
  CalendarHeart,
  Eye,
  Heart,
  MapPin,
  PencilLine,
  Plus,
  UserRound,
  X,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DeleteBookingEvent from "@/components/jointEvent/deleteBookingEvent";



export default async function JoinedEventsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const res = await fetch(`http://localhost:5000/userBookings/${user?.email}`);
   const data = await res.json();

  return (
    <main className="min-h-[calc(100svh-104px)] bg-brand-surface px-4 py-10 sm:px-6 md:py-14">
      <div className="mx-auto max-w-[1180px]">
        {/* Page Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge
              variant="secondary"
              className="h-7 rounded-full bg-brand-soft px-3 text-brand-ink"
            >
              <CalendarHeart size={14} />
              Your Impact
            </Badge>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-ink sm:text-4xl">
              Joined Events
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">
              Every event you join is collected here so you can revisit the
              causes you have supported.
            </p>
          </div>

          <Link
            href="/upcomingEvent"
            className={buttonVariants({
              size: "lg",
              className:
                "h-12 shrink-0 self-start rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand/90 md:self-auto",
            })}
          >
            <Plus size={18} />
            Browse Events
          </Link>
        </div>

        {/* Events Section */}
        <section>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-brand-ink">
                Your Registered Events
              </h2>
              <p className="mt-2 text-sm text-brand-muted">
                Manage and track your event registrations.
              </p>
            </div>

            <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-brand-muted">
              3 Events
            </span>
          </div>

          {/* Booking Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((booking) => (
             <DeleteBookingEvent booking={booking} key={booking._id}></DeleteBookingEvent>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
