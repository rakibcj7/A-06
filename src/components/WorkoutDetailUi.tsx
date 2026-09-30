interface SpecRowProps {
  label: string;
  value: string | number;
}

export function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="flex justify-between py-2 border-b border-[#1a1a1a] last:border-0">
      <span className="text-sm text-[#888] uppercase">{label}</span>
      <span className="text-sm font-medium text-[#ededed]">{value}</span>
    </div>
  );
}

interface StatPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function StatPill({ icon, label, value }: StatPillProps) {
  return (
                   <div className="flex items-center gap-2 rounded-lg border border-[#1a1a1a] bg-[#121212] px-3 py-2">
      {icon}
      <span className="text-xs text-[#888]">{label}:</span>
      <span className="text-sm font-medium text-[#ededed]">{value}</span>
    </div>
  );
}
