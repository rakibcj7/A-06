import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#121212] px-4 py-6 md:px-6 lg:px-8 mt-auto">
      <div className="flex flex-col items-center justify-between gap-2 text-sm md:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={24} height={24} />
          <span className="font-display font-bold">FITLOG</span>
        </div>
        <p className="text-xs text-[#888]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
