"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarPlus,
  CalendarRange,
  ChevronDown,
  Heart,
  LogIn,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

const itemClass =
  "cursor-pointer gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground focus:bg-brand-soft focus:text-brand-ink";

function getInitials(name, email) {
  const source = (name || email || "U").trim();
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div
        aria-hidden="true"
        className="size-11 shrink-0 animate-pulse rounded-full bg-brand-soft"
      />
    );
  }

  if (!user) {
    return (
      <Link href="/login" aria-label="Login">
        <Button
          type="button"
          className="h-11 shrink-0 gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(10,61,43,0.65)] hover:bg-brand/90 sm:px-5"
        >
          <LogIn className="size-[18px]" strokeWidth={2} aria-hidden="true" />
          <span className="hidden sm:inline">Login</span>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-border bg-card/80 py-1.5 pr-2 pl-1.5 transition hover:border-brand-accent/50 hover:bg-brand-soft/50 data-[popup-open]:border-brand-accent/60"
      >
        <Avatar size="lg" className="size-9">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name || "User avatar"} />
          ) : null}
          <AvatarFallback className="bg-brand text-xs font-bold text-white">
            {getInitials(user.name, user.email)}
          </AvatarFallback>
          <AvatarBadge className="size-2.5 bg-[#35c75a] ring-card" />
        </Avatar>
        <span className="hidden max-w-32 flex-col text-left leading-tight xl:flex">
          <span className="truncate text-sm font-semibold text-brand-ink">
            {user.name || "Member"}
          </span>
          <span className="truncate text-[10px] font-medium text-brand-muted">
            {user.email}
          </span>
        </span>
        <ChevronDown
          className="size-4 shrink-0 text-brand-muted transition-transform duration-200 group-data-[popup-open]:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="min-w-64 rounded-2xl border border-border bg-popover p-2 shadow-[0_24px_50px_-24px_rgba(10,61,43,0.45)]"
      >
        <DropdownMenuItem
          className={itemClass}
          onClick={() => router.push("/createEvent")}
        >
          <CalendarPlus className="size-4 text-brand-accent" aria-hidden="true" />
          Create Event
        </DropdownMenuItem>

        <DropdownMenuItem
          className={itemClass}
          onClick={() => router.push("/manage-events")}
        >
          <CalendarRange className="size-4 text-brand-accent" aria-hidden="true" />
          Manage Events
        </DropdownMenuItem>

        <DropdownMenuItem
          className={itemClass}
          onClick={() => router.push("/joined-events")}
        >
          <Heart className="size-4 text-brand-accent" aria-hidden="true" />
          Joined Events
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5 bg-border" />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold"
          onClick={handleSignOut}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
