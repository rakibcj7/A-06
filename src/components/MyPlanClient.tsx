"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Zap, BarChart, Check, X, ExternalLink } from "lucide-react";
import { usePlan } from "@/contexts/PlanContext";
import { useToast } from "@/components/Toast";
import { useIsClient } from "@/lib/useIsClient";
import { StatsRow, EmptyState } from "@/components/StatsCard";
import type { Workout } from "@/lib/types";

export default function MyPlanClient() {
  const { plan, saved, completed, removeFromPlan, removeFromSaved, markAsDone } = usePlan();
  const { addToast } = useToast();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const isClient = useIsClient();

  const currentItems = activeTab === "plan" ? plan : saved;

  const handleRemove = (workout: Workout) => {
    if (activeTab === "plan") {
      removeFromPlan(workout.id);
      addToast("Removed from today's plan", "success");
    } else {
      removeFromSaved(workout.id);
      addToast("Removed from saved", "success");
    }
  };

  const handleMarkDone = (workout: Workout) => {
    markAsDone(workout.id);
    addToast(
      completed.has(workout.id) ? "Marked as not done" : "Marked as done",
      "success"
    );
  };

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  if (!isClient) {
    return (
      <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <h2 className="font-display text-2xl font-bold uppercase text-[#ededed]">
          My Plan
        </h2>
        <p className="mt-1 text-sm text-[#888]">Loading workouts…</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold uppercase text-[#ededed]">
          My Plan
        </h2>
        <p className="mt-1 text-sm text-[#888]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="mb-8 flex gap-2">
        <StatsRow label="Exercises" value={plan.length} />
        <StatsRow label="Minutes" value={totalMinutes} />
        <StatsRow label="Calories" value={totalCalories} />
      </div>

      <div className="mb-6 flex gap-4 border-b border-[#1a1a1a]">
        <button
          onClick={() => setActiveTab("plan")}
          className={`pb-2 font-medium ${
            activeTab === "plan"
              ? "border-b-2 border-[#ccff00] text-[#ccff00]"
              : "text-[#888] hover:text-[#ededed]"
          }`}
        >
          Today&apos;s Plan
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-2 font-medium ${
            activeTab === "saved"
              ? "border-b-2 border-[#ccff00] text-[#ccff00]"
              : "text-[#888] hover:text-[#ededed]"
          }`}
        >
          Saved
        </button>
      </div>

      {currentItems.length === 0 ? (
        <EmptyState onBrowse={() => router.push("/")} />
      ) : (
        <div className="space-y-4">
          {currentItems.map((workout) => {
            const isDone = completed.has(workout.id);
            return (
              <div
                key={workout.id}
                className={`flex items-center gap-4 rounded-xl border border-[#1a1a1a] bg-[#121212] p-4 ${
                  isDone ? "opacity-60" : ""
                }`}
              >
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3
                    className={`font-display text-lg font-bold ${isDone ? "line-through" : ""}`}
                  >
                    {workout.name}
                  </h3>
                  <p className="text-sm text-[#888]">{workout.equipment}</p>
                  <div className="mt-1 flex items-center gap-4 text-xs text-[#888]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart className="h-3 w-3 text-yellow-400" />
                      {workout.rating}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={`/workout/${workout.id}`}
                    title="View details"
                    aria-label={`View details for ${workout.name}`}
                    className="rounded-lg border border-[#1a1a1a] bg-[#121212] p-2 text-[#ededed] transition-colors hover:bg-[#1a1a1a]"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  {activeTab === "plan" && (
                    <button
                      type="button"
                      onClick={() => handleMarkDone(workout)}
                      title={isDone ? "Mark as not done" : "Mark as done"}
                      aria-label={
                        isDone
                          ? `Mark ${workout.name} as not done`
                          : `Mark ${workout.name} as done`
                      }
                      aria-pressed={isDone}
                      className={`rounded-lg border p-2 transition-colors ${
                        isDone
                          ? "border-[#ccff00] bg-[#ccff00]/15 text-[#ccff00]"
                          : "border-[#1a1a1a] bg-[#121212] text-[#ededed] hover:border-[#ccff00]/50 hover:text-[#ccff00]"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(workout)}
                    title="Remove"
                    aria-label={`Remove ${workout.name}`}
                    className="rounded-lg border border-[#1a1a1a] bg-[#121212] p-2 text-[#ededed] transition-colors hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
