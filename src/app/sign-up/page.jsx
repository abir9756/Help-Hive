"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays,
  Users,
  HandHeart,
  ArrowRight,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);


  const handleSignUp = async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const Data = Object.fromEntries(formData.entries());
    const {data,error} = await authClient.signUp.email({
        ...Data,

    })
    if(data){
        redirect('/')
    }
    if(error){
        console.log(error)
    }
  }

  return (
    <section className="flex min-h-[calc(100svh-104px)] items-center justify-center bg-brand-surface px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid w-full max-w-xl overflow-hidden rounded-[32px] border border-[#e4ead9] bg-white shadow-[0_30px_70px_-45px_rgba(10,61,43,0.5)] lg:max-w-6xl lg:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-brand p-10 text-white lg:flex xl:p-12">
          <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-brand-soft/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
                <HandHeart
                  className="size-7"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl leading-none font-extrabold tracking-[-0.04em]">
                  Help<span className="text-brand-soft">Hive</span>
                </h2>
                <p className="mt-1 text-[11px] font-medium text-brand-soft/70">
                  Together for a better tomorrow.
                </p>
              </div>
            </div>

            <div className="mt-24">
              <span className="text-sm font-semibold tracking-widest text-brand-soft uppercase">
                Make a Difference
              </span>

              <h1 className="mt-5 text-5xl leading-tight font-bold">
                Small Actions.
                <br />
                Big Changes.
              </h1>

              <p className="mt-6 max-w-sm leading-7 text-white/70">
                Connect with your community, join meaningful events, and make
                the world a better place together.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <Users
                className="mb-3 text-brand-soft"
                size={26}
                aria-hidden="true"
              />
              <h3 className="text-2xl font-bold">Community</h3>
              <p className="mt-1 text-sm text-white/60">
                Meet people who care.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <CalendarDays
                className="mb-3 text-brand-soft"
                size={26}
                aria-hidden="true"
              />
              <h3 className="text-2xl font-bold">Events</h3>
              <p className="mt-1 text-sm text-white/60">
                Join meaningful activities.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <div className="mb-9">
            <p className="mb-3 text-sm font-semibold tracking-wider text-brand-accent">
              GET STARTED TODAY
            </p>

            <h1 className="text-3xl font-bold text-brand sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-brand-muted">
              Join our community and start making a difference.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand/80">
                Full Name
              </label>

              <div className="relative">
                <User
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-brand-muted/70"
                  size={19}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[#dfe7d4] bg-[#fcfdf9] py-3.5 pr-4 pl-12 text-brand outline-none transition placeholder:text-brand-muted/50 focus:border-brand-accent focus:ring-2 focus:ring-brand-soft"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand/80">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-brand-muted/70"
                  size={19}
                  aria-hidden="true"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-[#dfe7d4] bg-[#fcfdf9] py-3.5 pr-4 pl-12 text-brand outline-none transition placeholder:text-brand-muted/50 focus:border-brand-accent focus:ring-2 focus:ring-brand-soft"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand/80">
                Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-brand-muted/70"
                  size={19}
                  aria-hidden="true"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-[#dfe7d4] bg-[#fcfdf9] py-3.5 pr-12 pl-12 text-brand outline-none transition placeholder:text-brand-muted/50 focus:border-brand-accent focus:ring-2 focus:ring-brand-soft"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-brand-muted/70 transition-colors hover:text-brand"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-3 text-sm text-brand-muted">
              <input
                type="checkbox"
                required
                className="mt-1 accent-brand"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-brand-accent hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-brand-accent hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 font-semibold text-white shadow-[0_16px_30px_-18px_rgba(10,61,43,0.7)] transition duration-300 hover:bg-[#0d5239]"
            >
              Create Account
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-brand-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-brand hover:text-brand-accent hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-10 text-center text-xs text-brand-muted/70">
            © 2026 HelpHive. Together for a better tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}
