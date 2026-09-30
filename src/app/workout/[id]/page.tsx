import { notFound } from "next/navigation";
import { fetchWorkoutById, fetchWorkouts } from "@/lib/api";
import { WorkoutDetail } from "@/components/WorkoutDetail";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Workout } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const workout = await fetchWorkoutById(id).catch(() => null);
  if (!workout) {
    return { title: "Workout Not Found — FitLog" };
  }
  return {
    title: `${workout.name} — FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutPage({ params }: PageProps) {
  const { id } = await params;

  let workout: Workout | null = null;
  try {
    workout = await fetchWorkoutById(id);
  } catch {
    // workout stays null
  }

  if (!workout) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <WorkoutDetail workout={workout} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const workouts = await fetchWorkouts();
    return workouts.map((w) => ({ id: String(w.id) }));
  } catch {
    return [];
  }
}
