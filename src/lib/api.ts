import type { Workout } from "./types";

const API_BASE = "https://api.api-store.workers.dev/api/fitlog";

export async function fetchWorkouts(): Promise<Workout[]> {
           const res = await fetch(API_BASE, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function fetchWorkoutById(id: number | string): Promise<Workout> {
  const res = await fetch(`${API_BASE}/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch workout");
  return res.json();
}
