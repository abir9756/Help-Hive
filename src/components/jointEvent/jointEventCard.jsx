'use client'
import { authClient } from '@/lib/auth-client';
import { ArrowRight, HandHeart, Heart, Share2, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';


const JointEventCard = ({Data}) => {

   
    const { data: session } = authClient.useSession();
    const user = session?.user;

     const handleBooking = async(e)=>{
      e.preventDefault()
    
       const data={
        userName: user?.name,
        email:user?.email,
        image:user?.image,
       ...Data,
        bookingDate:new Date()
      }
       const res = await fetch('http://localhost:5000/eventBookings',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
      })
      const resdata = await res.json();
      console.log(resdata)
    }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Event link copied!");
    } catch {
      alert("Unable to copy event link.");
    }
  };


    return (
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

            <form onSubmit={handleBooking}> 

            <Button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 font-semibold text-white shadow-[0_16px_30px_-18px_rgba(10,61,43,0.7)] transition duration-300 hover:bg-brand/90"
            >
              Join This Event <ArrowRight size={18} aria-hidden="true" />
            </Button>
        </form>
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
    );
};

export default JointEventCard;