import type { Workout } from "./types";

export function formatDuration(mins: number): string {
  return `${mins} min`;
}

export function formatCalories(cal: number): string {
  return `${cal} kcal`;
}

export const SORT_OPTIONS = ["Duration", "Calories", "Rating"] as const;
export type SortKey = (typeof SORT_OPTIONS)[number];

export function sortWorkouts(workouts: Workout[], key: SortKey): Workout[] {
  const sorted = [...workouts];
  switch (key) {
    case "Duration":
      sorted.sort((a, b) => a.duration - b.duration);
      break;
    case "Calories":
      sorted.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
      break;
    case "Rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }
  return sorted;
}
