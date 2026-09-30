import { Dumbbell } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number | string;
  unit?: string;
}

export function StatsCard({ label, value, unit }: StatsCardProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-[#1a1a1a] bg-[#121212] px-4 py-4">
      <div className="text-2xl font-bold text-[#ccff00]">{value}</div>
      <div className="text-sm text-[#888]">
        {label}
        {unit && <> {unit}</>}
      </div>
    </div>
  );
}

export function StatsRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-[#1a1a1a] bg-[#121212] py-3">
      <span className="text-2xl font-bold text-[#ccff00]">{value}</span>
      <span className="text-xs uppercase tracking-wider text-[#888]">{label}</span>
    </div>
  );
}

export function EmptyState({
  onBrowse,
}: {
  onBrowse?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Dumbbell className="mb-4 h-12 w-12 text-[#444]" />
      <h3 className="text-xl font-bold">NOTHING HERE YET</h3>
      <p className="mt-2 max-w-sm text-sm text-[#888]">
        Browse the library and add a lift to get today moving.
      </p>
      {onBrowse && (
        <button
          onClick={onBrowse}
          className="mt-4 rounded-lg bg-[#ccff00] px-5 py-2 font-medium text-black transition-colors hover:bg-[#b8e600]"
        >
          Go to workouts
        </button>
      )}
    </div>
  );
}
