'use client'
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
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
import Link from 'next/link';

const DeleteBookingEvent = ({booking}) => {

     const handleCancelBooking = async()=>{
    const res = await fetch(`http://localhost:5000/userBookings/${booking._id}`,
      {method:'DELETE'}
    )

     if (!res.ok) {
      throw new Error("Failed to cancel booking");
    }

    const data = await res.json()
    console.log(data)
  }
    return (
        <div>
             <Card
                
                className="group gap-0 overflow-hidden rounded-3xl border-0 bg-card py-0 ring-1 ring-border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-brand-soft">
                  <img
                    src={booking.thumbnail}
                    alt={booking.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-brand/55 via-transparent to-transparent" />

                  <Badge className="absolute top-3 left-3 border-0 bg-brand-soft/95 px-3 text-[11px] font-bold text-brand-ink">
                    {booking.category}
                  </Badge>

                  <Badge className="absolute bottom-3 left-3 border-0 bg-brand/90 px-3 text-[11px] font-semibold text-white">
                    <CalendarDays size={13} />
                    {booking.date}
                  </Badge>
                </div>

                {/* Card Header */}
                <CardHeader className="gap-2 px-5 pt-5">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="line-clamp-1 text-lg font-bold text-brand-ink">
                      {booking.title}
                    </CardTitle>
                  </div>

                  <CardDescription className="flex items-center gap-1.5 text-sm text-brand-muted">
                    <MapPin size={15} className="shrink-0 text-brand-accent" />
                    {booking.location}
                  </CardDescription>
                </CardHeader>

                {/* Card Content */}
                <CardContent className="px-5">
                  <p className="line-clamp-2 min-h-10 text-sm leading-6 text-brand-muted">
                    {booking.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <div className="flex items-center gap-2 text-xs text-brand-muted">
                      <UserRound size={14} className="text-brand-accent" />
                      {booking.userName}
                    </div>

                    <span className="text-xs text-brand-muted">
                      Booked {booking.bookingDate}
                    </span>
                  </div>

                  {/* Booking Status */}
                  <div className="mt-4">
                    <Badge
                      className={
                        booking.status === "Confirmed"
                          ? "border-0 bg-emerald-50 text-emerald-700"
                          : "border-0 bg-amber-50 text-amber-700"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="mt-1 grid grid-cols-3 gap-2 border-t border-border bg-transparent px-5 py-4">
                  <Link
                    href={`/upcomingEvent/${booking._id}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className:
                        "h-9 rounded-full border-border bg-background px-2 text-xs font-semibold text-brand-ink hover:bg-brand-soft",
                    })}
                  >
                    <Eye size={15} />
                    View
                  </Link>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-9 rounded-full bg-brand-soft/70 px-2 text-xs font-semibold text-brand-ink hover:bg-brand-soft"
                  >
                    <PencilLine size={15} />
                    Edit
                  </Button>

                  <Button
                   onClick={handleCancelBooking}
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-9 rounded-full px-2 text-xs font-semibold"
                    
                  >
                    <X size={15} />
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
        </div>
    );
};

export default DeleteBookingEvent;