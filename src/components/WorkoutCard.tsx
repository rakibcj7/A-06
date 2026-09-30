
import Image from 'next/image'
import Link from "next/link";
import { type Workout } from "@/lib/types";

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workout/${workout.id}`} className="group block">
      <div className="flex h-full flex-col rounded-xl border border-[#1a1a1a] bg-[#121212] overflow-hidden transition-transform group-hover:scale-[1.02]">
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 p-4">
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="text-xs uppercase tracking-wider text-[#888]"
              >
                {group}
              </span>
            ))}
          </div>

          <h3 className="font-display text-base font-bold uppercase text-[#ededed]">{workout.name}</h3>

          <p className="text-sm text-[#888]">{workout.equipment}</p>

          <div className="mt-auto flex items-center justify-between">
            <StatItem icon={<ClockIcon />} value={`${workout.duration} min`} />
            <StatItem icon={<FireIcon />} value={`${workout.caloriesBurned} kcal`} />
            <Stars rating={workout.rating} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function StatItem({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1 text-sm text-[#888]">
      {icon}
      <span>{value}</span>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
           <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 1 4.9 1 7.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a6.5 6.5 0 0 0 2.5 5.5Z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
               <div className="flex items-center gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < full || (i === full && hasHalf) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.91 14.14z" />
        </svg>
      ))}
    </div>
  );
}
