"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  CalendarHeart,
  Eye,
  Heart,
  LoaderCircle,
  LogIn,
  MapPin,
  Plus,
  Share2,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { formatEventDate } from "@/lib/events";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function formatBookingDate(date) {
  if (!date) return "Recently";

  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function LoadingCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <Card
          key={item}
          className="gap-0 overflow-hidden rounded-3xl border-0 bg-card py-0 ring-1 ring-border"
        >
          <Skeleton className="h-48 w-full rounded-none" />
          <CardHeader className="gap-3 px-5 pt-5">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="px-5">
            <Skeleton className="h-10 w-full" />
          </CardContent>
          <CardFooter className="mt-2 border-border bg-transparent px-5 py-4">
            <Skeleton className="h-9 w-full rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center shadow-[0_22px_50px_-46px_rgba(10,61,43,0.5)]">
      <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-soft text-brand-ink">
        <Icon size={30} aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-brand-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-brand-muted">{description}</p>
      {action}
    </div>
  );
}

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? null;

  const [result, setResult] = useState({
    email: null,
    status: "loading",
    bookings: [],
    error: "",
  });
  const [reloadKey, setReloadKey] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (!email) return;

    let active = true;

    const loadBookings = async () => {
      try {
        const response = await fetch(
          `${API_URL}/userBookings/${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          throw new Error("Failed to load your bookings.");
        }

        const data = await response.json();

        if (!active) return;

        setResult({
          email,
          status: "ready",
          bookings: Array.isArray(data) ? data : [],
          error: "",
        });
      } catch (error) {
        if (!active) return;

        setResult({
          email,
          status: "error",
          bookings: [],
          error: error.message || "Something went wrong. Please try again.",
        });
      }
    };

    loadBookings();

    return () => {
      active = false;
    };
  }, [email, reloadKey]);

  const currentResult = result.email === email ? result : null;
  const showLoading =
    isPending || (email && (!currentResult || currentResult.status === "loading"));
  const bookings = currentResult?.bookings ?? [];

  const sortedBookings = [...bookings].sort(
    (first, second) => new Date(first.date) - new Date(second.date)
  );

  const handleRetry = () => {
    setResult({ email, status: "loading", bookings: [], error: "" });
    setReloadKey((current) => current + 1);
  };

  const handleShare = async (booking) => {
    const url = `${window.location.origin}/upcomingEvent/${booking._id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: booking.title,
          text: booking.description,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopiedId(booking._id);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Unable to share event:", error);
      }
    }
  };

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
              <CalendarHeart size={14} aria-hidden="true" />
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
                "h-12 shrink-0 self-start rounded-full bg-brand px-6 font-semibold text-white shadow-[0_16px_30px_-18px_rgba(10,61,43,0.7)] hover:bg-brand/90 md:self-auto",
            })}
          >
            <Plus size={18} aria-hidden="true" />
            Browse Events
          </Link>
        </div>

        {/* Content */}
        {showLoading ? (
          <LoadingCards />
        ) : !email ? (
          <EmptyState
            icon={LogIn}
            title="Sign in to see your joined events"
            description="Log in to your HelpHive account to view the events you have joined."
            action={
              <Link
                href="/login"
                className={buttonVariants({
                  className:
                    "mt-7 h-11 rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand/90",
                })}
              >
                Sign In
              </Link>
            }
          />
        ) : currentResult?.status === "error" ? (
          <EmptyState
            icon={AlertCircle}
            title="Could not load your joined events"
            description={currentResult.error}
            action={
              <Button
                type="button"
                onClick={handleRetry}
                className="mt-7 h-11 rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand/90"
              >
                <LoaderCircle size={17} aria-hidden="true" />
                Try Again
              </Button>
            }
          />
        ) : sortedBookings.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="You have not joined an event yet"
            description="Find a cause you care about and take the first step toward making a difference in your community."
            action={
              <Link
                href="/upcomingEvent"
                className={buttonVariants({
                  className:
                    "mt-7 h-11 rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand/90",
                })}
              >
                Explore Upcoming Events
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedBookings.map((booking) => (
              <Card
                key={booking._id}
                className="group gap-0 overflow-hidden rounded-3xl border-0 bg-card py-0 ring-1 ring-border shadow-[0_22px_50px_-42px_rgba(10,61,43,0.55)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_55px_-38px_rgba(10,61,43,0.6)] hover:ring-brand-accent/40"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-brand-soft">
                  {booking.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={booking.thumbnail}
                      alt={booking.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-brand-muted/40">
                      <CalendarDays size={48} aria-hidden="true" />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/55 via-transparent to-transparent" />

                  <Badge className="absolute top-3 left-3 border-0 bg-brand-soft/95 px-2.5 text-[11px] font-bold text-brand-ink shadow-sm backdrop-blur-sm">
                    {booking.category || "Community"}
                  </Badge>

                  <Badge className="absolute bottom-3 left-3 border-0 bg-brand/85 px-2.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <CalendarDays size={13} aria-hidden="true" />
                    {formatEventDate(booking.date)}
                  </Badge>
                </div>

                <CardHeader className="gap-2 px-5 pt-5">
                  <CardTitle className="line-clamp-1 text-lg font-bold text-brand-ink">
                    {booking.title}
                  </CardTitle>

                  <CardDescription className="flex items-center gap-1.5 text-sm text-brand-muted">
                    <MapPin
                      size={15}
                      className="shrink-0 text-brand-accent"
                      aria-hidden="true"
                    />
                    <span className="line-clamp-1">
                      {booking.location || "Location to be announced"}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-5">
                  <p className="line-clamp-2 min-h-10 text-sm leading-6 text-brand-muted">
                    {booking.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <div className="flex min-w-0 items-center gap-2 text-xs text-brand-muted">
                      <UserRound
                        size={14}
                        className="shrink-0 text-brand-accent"
                        aria-hidden="true"
                      />
                      <span className="truncate">
                        {booking.userName || "Volunteer"}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs text-brand-muted/80">
                      Booked {formatBookingDate(booking.bookingDate)}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="mt-1 gap-2 border-border bg-transparent px-5 py-4">
                  <Link
                    href={`/upcomingEvent/${booking._id}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className:
                        "h-9 flex-1 rounded-full border-border bg-background font-semibold text-brand-ink hover:bg-brand-soft/60",
                    })}
                  >
                    <Eye size={16} aria-hidden="true" />
                    View
                  </Link>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleShare(booking)}
                    className="h-9 rounded-full bg-brand-soft/70 px-3 font-semibold text-brand-ink hover:bg-brand-soft"
                  >
                    <Share2 size={16} aria-hidden="true" />
                    {copiedId === booking._id ? "Copied" : "Share"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
