import Link from "next/link";
import {
  HandHeart,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-brand text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1180px] px-6 pt-16 pb-12 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-brand-soft text-brand-ink">
                <HandHeart size={24} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Help<span className="text-brand-light">Hive</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-white/70">
              Together, we can create meaningful change. Discover community
              events, connect with volunteers, and make a difference where
              it matters most.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {[
                { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
                { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                { icon: FaXTwitter, href: "https://x.com", label: "X" },
                { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 transition hover:border-brand-light hover:bg-brand-light hover:text-brand-deep"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Quick Links</h3>

            <ul className="space-y-4 text-sm text-white/70">
              <li><Link href="/" className="transition hover:text-brand-light">Home</Link></li>
              <li><Link href="/upcomingEvent" className="transition hover:text-brand-light">Upcoming Events</Link></li>
              <li><Link href="/login" className="transition hover:text-brand-light">Login</Link></li>
              <li><Link href="/sign-up" className="transition hover:text-brand-light">Create Account</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Explore</h3>

            <ul className="space-y-4 text-sm text-white/70">
              <li><Link href="/upcomingEvent" className="transition hover:text-brand-light">Community Events</Link></li>
              <li><Link href="/createEvent" className="transition hover:text-brand-light">Create an Event</Link></li>
              <li><Link href="/joined-events" className="transition hover:text-brand-light">Joined Events</Link></li>
              <li><Link href="/manage-events" className="transition hover:text-brand-light">Manage Events</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Get in Touch</h3>

            <ul className="space-y-5 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={19} className="mt-1 shrink-0 text-brand-light" aria-hidden="true" />
                <span>
                  Connecting communities
                  <br />
                  Across Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={19} className="shrink-0 text-brand-light" aria-hidden="true" />
                <a href="mailto:support@helphive.com" className="transition hover:text-brand-light">
                  support@helphive.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={19} className="shrink-0 text-brand-light" aria-hidden="true" />
                <span>Contact us anytime</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.06] p-7 sm:flex-row sm:p-10">
          <div>
            <h3 className="text-2xl font-bold">
              Small actions. <span className="text-brand-light">Big impact.</span>
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Be part of something meaningful. Start making a difference today.
            </p>
          </div>

          <Link
            href="/upcomingEvent"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-light px-6 py-3 font-bold text-brand-deep transition hover:bg-brand-light/85"
          >
            Explore Events
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-6 py-6 text-center text-sm text-white/50 sm:flex-row lg:px-10">
          <p>
            © {currentYear} HelpHive. All rights reserved.
          </p>

          <p>
            Made with <span className="text-brand-light">♥</span> for a better
            community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
