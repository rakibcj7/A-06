"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/contexts/PlanContext";
import { useIsClient } from "@/lib/useIsClient";

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const isClient = useIsClient();

  const navLinks = [
    { href: "/", label: "Workout" },
    { href: "/my-plan", label: "My Plan" },
  ];

  return (
                  <nav className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="FitLog" width={32} height={32} priority />
        <span className="font-display text-xl font-bold">FITLOG</span>
      </Link>

      <div className="flex items-center gap-6">
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

      <div className="flex items-center gap-3">
        <Link href="/my-plan">
          <span className="flex h-6 min-w-[60px] items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
            Plan: {isClient ? plan.length : 0}
          </span>
        </Link>
        <Link href="/my-plan">
          <span className="flex h-6 min-w-[60px] items-center justify-center rounded-full border border-[#333] text-xs font-bold text-[#ededed]">
            Saved: {isClient ? saved.length : 0}
          </span>
        </Link>
      </div>
    </nav>
  );
}
