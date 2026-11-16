"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HandHeart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  CalendarDays,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

 const handleLogin = async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target)
   const user = Object.fromEntries(formData.entries())
    const {data,error} = await authClient.signIn.email({
        ...user,

    })
    if(data){
        redirect('/')
    }
    if(error){
        console.log(error)
    }
 }

 const handleGoogleSignUp = async () => {
    const socialGoogleData = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="flex min-h-[calc(100svh-104px)] items-center justify-center bg-brand-surface px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid w-full max-w-xl overflow-hidden rounded-[32px] border border-border bg-card shadow-[0_30px_70px_-45px_rgba(10,61,43,0.5)] lg:max-w-6xl lg:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-brand p-10 text-white lg:flex xl:p-12">
          <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-brand-soft/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand-ink">
                <HandHeart
                  className="size-7"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl leading-none font-extrabold tracking-[-0.04em]">
                  Help<span className="text-brand-light">Hive</span>
                </h2>
                <p className="mt-1 text-[11px] font-medium text-brand-light/70">
                  Together for a better tomorrow.
                </p>
              </div>
            </div>

            <div className="mt-24">
              <span className="text-sm font-semibold tracking-widest text-brand-light uppercase">
                Welcome Back
              </span>

              <h1 className="mt-5 text-5xl leading-tight font-bold">
                Good Things
                <br />
                Start Together.
              </h1>

              <p className="mt-6 max-w-sm leading-7 text-white/70">
                Your community is waiting. Sign in to discover events, connect
                with people, and continue making a difference.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <Users
                className="mb-3 text-brand-light"
                size={26}
                aria-hidden="true"
              />
              <h3 className="text-xl font-bold">Connect</h3>
              <p className="mt-1 text-sm text-white/60">
                Build meaningful relationships.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <CalendarDays
                className="mb-3 text-brand-light"
                size={26}
                aria-hidden="true"
              />
              <h3 className="text-xl font-bold">Participate</h3>
              <p className="mt-1 text-sm text-white/60">
                Be part of something bigger.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <div className="mb-9">
            <p className="mb-3 text-sm font-semibold tracking-wider text-brand-accent">
              WELCOME BACK
            </p>

            <h1 className="text-3xl font-bold text-brand-ink sm:text-4xl">
              Sign in to your account
            </h1>

            <p className="mt-3 text-brand-muted">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-ink/80">
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
                  className="w-full rounded-xl border border-border bg-background py-3.5 pr-4 pl-12 text-brand-ink outline-none transition placeholder:text-brand-muted/50 focus:border-brand-accent focus:ring-2 focus:ring-brand-soft"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-brand-ink/80">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-brand-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-brand-muted/70"
                  size={19}
                  aria-hidden="true"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-border bg-background py-3.5 pr-12 pl-12 text-brand-ink outline-none transition placeholder:text-brand-muted/50 focus:border-brand-accent focus:ring-2 focus:ring-brand-soft"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-brand-muted/70 transition-colors hover:text-brand-ink"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-3 text-sm text-brand-muted">
              <input type="checkbox" className="size-4 accent-brand" />
              Remember me
            </label>

            {/* Login Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 font-semibold text-white shadow-[0_16px_30px_-18px_rgba(10,61,43,0.7)] transition duration-300 hover:bg-brand/90"
            >
              Sign In
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-brand-muted/70">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full rounded-full border border-border bg-background font-semibold text-brand-ink hover:bg-brand-soft/60"
            variant="tertiary"
          >
            <FcGoogle />
            Sign in with Google
          </Button>

          {/* Signup Link */}
          <p className="mt-8 text-center text-sm text-brand-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-brand-ink hover:text-brand-accent hover:underline"
            >
              Create account
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
