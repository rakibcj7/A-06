"use client";
import Image from 'next/image'
import { Play, ShoppingCart, Clock, Zap, BarChart } from "lucide-react";
import { usePlan } from "@/contexts/PlanContext";
import { useToast } from "@/components/Toast";
import type { Workout } from "@/lib/types";
import { SpecRow, StatPill } from "@/components/WorkoutDetailUi";

interface WorkoutDetailProps {
  workout: Workout;
}

export function WorkoutDetail({ workout }: WorkoutDetailProps) {
  const { addToPlan, saveForLater, plan, saved } = usePlan();
  const { addToast } = useToast();
    
  const handleAddToPlan = () => {
    addToPlan(workout);
              addToast("Added to today's plan", "success");
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
    addToast("Saved for later", "success");
  };

  const isInPlan = plan.some((w) => w.id === workout.id);
  const isSaved = saved.some((w) => w.id === workout.id);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        <Image
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover"
        >
          </Image>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-[#ededed]">{workout.name}</h1>
          <p className="mt-1 text-sm text-[#888]">{workout.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#1a1a1a] px-3 py-1 text-xs font-medium uppercase text-[#ededed]"
            >
              {group}
            </span>
          ))}
        </div>

           <div className="space-y-1">
          <SpecRow label="Equipment" value={workout.equipment} />
          <SpecRow label="Difficulty" value={workout.difficulty} />
          <SpecRow label="Sets" value={workout.sets} />
          <SpecRow label="Reps" value={workout.reps} />
          <SpecRow label="Duration" value={`${workout.duration} min`} />
          <SpecRow label="Calories" value={`${workout.caloriesBurned} kcal`} />
                 <SpecRow label="Rating" value={workout.rating} />
        </div>

        <div className="flex items-center gap-3">
          <StatPill
            icon={<Clock className="h-4 w-4 text-[#888]" />}
            label="Duration"
            value={`${workout.duration} min`}
          />
                  <StatPill
            icon={<Zap className="h-4 w-4 text-[#888]" />}
            label="Calories"
            value={`${workout.caloriesBurned} kcal`}
          />
          <StatPill
            icon={<BarChart className="h-4 w-4 text-yellow-400" />}
            label="Rating"
            value={String(workout.rating)}
          />
        </div>

        <div>
          <h3 className="mb-2 font-display text-sm font-bold uppercase text-[#ededed]">Instructions</h3>
          <ol className="space-y-2">
            {workout.instructions.map((step, i) => (
                      <li key={i} className="flex gap-3">
                <span className="font-display text-sm font-bold text-[#ccff00]">{i + 1}.</span>
                <span className="text-sm text-[#ededed]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
 
               <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            onClick={handleAddToPlan}
            disabled={isInPlan}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ccff00] px-5 py-2.5 font-medium text-black transition-colors hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <Play className="h-4 w-4" />
            {isInPlan ? "In Today's Plan" : "Add to today's plan"}
          </button>
          <button
            onClick={handleSaveForLater}
            disabled={isSaved}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#1a1a1a] px-5 py-2.5 font-medium text-[#ededed] transition-colors hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <ShoppingCart className="h-4 w-4" />
            {isSaved ? "Saved" : "Save for later"}
                  </button>
        </div>
      </div>
    </div>
  );
}
