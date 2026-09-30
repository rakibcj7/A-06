import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { LibrarySection, LibraryLoading } from "@/components/LibrarySection";
import { fetchWorkouts } from "@/lib/api";
import { Suspense } from "react";
import type { Workout } from "@/lib/types";

export default async function Home() {
  let workouts: Workout[] = [];
  let hasError = false;

  try {
    workouts = await fetchWorkouts();
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-sm text-[#888]">Could not load workouts. Please try again later.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<LibraryLoading />}>
          <LibrarySection initialWorkouts={workouts} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
