"use client";

import Image from "next/image";

export function Hero() {
  const scrollToLibrary = () => {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex flex-col items-center gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:py-16 md:px-6 lg:px-8">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#888]">WORKOUT LIBRARY</p>
        <h1 className="font-display text-4xl font-bold uppercase leading-tight text-[#ededed] sm:text-5xl">
          TRAIN WITH INTENT.
        </h1>
        <h1 className="font-display text-4xl font-bold uppercase leading-tight text-[#ededed] sm:text-5xl">
          LOG EVERY SET.
        </h1>
        <p className="mt-4 text-sm text-[#888]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <button
          onClick={scrollToLibrary}
          className="mt-6 flex items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-2.5 font-medium text-black transition-colors hover:bg-[#b8e600]"
        >
          Browse Workouts
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="mt-8 flex w-full items-center justify-center md:mt-0">
        <Image
          src="/banner.png"
          alt="Banner"
          width={620}
          height={620}
          className="h-auto w-full max-w-[520px] rounded-xl object-contain"
          priority
        />
      </div>
    </section>
  );
}
