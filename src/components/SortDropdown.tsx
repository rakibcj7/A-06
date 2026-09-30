"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/utils";
import type { SortKey } from "@/lib/utils";

interface SortDropdownProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export function SortDropdown({ value = "Duration", onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-[#1a1a1a] bg-[#121212] px-3 py-2 text-sm font-medium text-[#ededed] hover:border-[#ccff00]/50"
      >
        Sort By: {value}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-20 mt-1 w-40 rounded-lg border border-[#1a1a1a] bg-[#121212] py-1 shadow-lg">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left text-sm ${
                value === opt
                  ? "bg-[#ccff00]/10 text-[#ccff00]"
                  : "text-[#ededed] hover:bg-[#1a1a1a]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
