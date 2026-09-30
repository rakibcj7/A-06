"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Workout } from "@/lib/types";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  completed: Set<number>;
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  markAsDone: (id: number) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  clearCompleted: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const STORAGE_KEY = "fitlog-plan";

function getInitialState(): {
  plan: Workout[];
  saved: Workout[];
  completed: Set<number>;
} {
           if (typeof window === "undefined") {
    return { plan: [], saved: [], completed: new Set() };
  }
  try {
               const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        plan: parsed.plan || [],
        saved: parsed.saved || [],
                   completed: new Set(parsed.completed || []),
      };
    }
  } catch {}
  return { plan: [], saved: [], completed: new Set() };
}

export function PlanProvider({ children }: { children: ReactNode }) {
            const [plan, setPlan] = useState<Workout[]>(() => getInitialState().plan);
  const [saved, setSaved] = useState<Workout[]>(() => getInitialState().saved);
  const [completed, setCompleted] = useState<Set<number>>(() => getInitialState().completed);

               const persist = (p: Workout[], s: Workout[], c: Set<number>) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      STORAGE_KEY,
               JSON.stringify({ plan: p, saved: s, completed: Array.from(c) })
    );
  };

  const addToPlan = (workout: Workout) => {
    setPlan((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      const next = [...prev, workout];
                persist(next, saved, completed);
      return next;
    });
  };

               const removeFromPlan = (id: number) => {
    setPlan((prev) => {
      const next = prev.filter((w) => w.id !== id);
      persist(next, saved, completed);
      return next;
    });
  };

             const markAsDone = (id: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      persist(plan, saved, next);
      return next;
    });
  };

  const saveForLater = (workout: Workout) => {
                 setSaved((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      const next = [...prev, workout];
      persist(plan, next, completed);
      return next;
    });
  };

  const removeFromSaved = (id: number) => {
         setSaved((prev) => {
      const next = prev.filter((w) => w.id !== id);
      persist(plan, next, completed);
      return next;
    });
  };

  const clearCompleted = () => {
    setCompleted(new Set());
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
                   const parsed = JSON.parse(stored);
        persist(parsed.plan || [], parsed.saved || [], new Set());
      }
    }
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        completed,
        addToPlan,
        removeFromPlan,
        markAsDone,
        saveForLater,
           removeFromSaved,
        clearCompleted,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
          if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
