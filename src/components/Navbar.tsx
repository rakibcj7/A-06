"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePlan } from "@/contexts/PlanContext";
import { useIsClient } from "@/lib/useIsClient";

const navLinks = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const isClient = useIsClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const planCount = isClient ? plan.length : 0;
  const savedCount = isClient ? saved.length : 0;

  return (
    <nav className="relative flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
        <Image src="/logo.png" alt="FitLog" width={32} height={32} priority />
        <span className="font-display text-xl font-bold">FitLog</span>
      </Link>

      <div className="hidden items-center gap-6 md:flex">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={
                isActive
                  ? "text-[#ccff00] font-medium"
                  : "text-[#ededed] hover:text-[#ccff00]"
              }
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <Link href="/my-plan">
          <span className="flex h-6 min-w-[60px] items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
            Plan: {planCount}
          </span>
        </Link>
        <Link href="/my-plan">
          <span className="flex h-6 min-w-[60px] items-center justify-center rounded-full border border-[#333] text-xs font-bold text-[#ededed]">
            Saved: {savedCount}
          </span>
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="rounded-lg border border-[#1a1a1a] bg-[#121212] p-2 text-[#ededed] transition-colors hover:border-[#ccff00]/50 hover:text-[#ccff00] md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-30 border-b border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 font-medium ${
                    isActive
                      ? "bg-[#ccff00]/10 text-[#ccff00]"
                      : "text-[#ededed] hover:bg-[#121212]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-3 border-t border-[#1a1a1a] pt-3">
            <Link href="/my-plan" onClick={() => setOpen(false)}>
              <span className="flex h-7 items-center justify-center rounded-full bg-[#ccff00] px-3 text-xs font-bold text-black">
                Plan: {planCount}
              </span>
            </Link>
            <Link href="/my-plan" onClick={() => setOpen(false)}>
              <span className="flex h-7 items-center justify-center rounded-full border border-[#333] px-3 text-xs font-bold text-[#ededed]">
                Saved: {savedCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
