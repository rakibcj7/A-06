"use client";

import { useMemo, useState } from "react";
import type { Workout } from "@/lib/types";
import { sortWorkouts, type SortKey } from "@/lib/utils";
import { SortDropdown } from "@/components/SortDropdown";
import { WorkoutCard } from "@/components/WorkoutCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function LibrarySection({ initialWorkouts }: { initialWorkouts: Workout[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("Duration");

  const displayed = useMemo(
    () => sortWorkouts(initialWorkouts, sortKey),
    [initialWorkouts, sortKey]
  );

  const isLoading = !initialWorkouts || initialWorkouts.length === 0;

  return (
    <section id="library" className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase text-[#ededed]">The Library</h2>
          <p className="text-sm text-[#888]">Twelve lifts covering every major muscle group.</p>
        </div>
        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <LoadingSpinner size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayed.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}

export function LibraryLoading() {
  return (
    <section id="library" className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase text-[#ededed]">The Library</h2>
          <p className="text-sm text-[#888]">Twelve lifts covering every major muscle group.</p>
        </div>
        <div />
      </div>
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size={48} />
        <span className="ml-3 text-sm text-[#888]">Loading workouts…</span>
      </div>
    </section>
  );
}
