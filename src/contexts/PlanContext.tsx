"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Workout } from "@/lib/types";

interface PlanState {
  plan: Workout[];
  saved: Workout[];
  completed: number[];
}

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

const PlanContext = createContext<PlanContextType | null>(null);

const STORAGE_KEY = "fitlog-plan";
const EMPTY_STATE: PlanState = { plan: [], saved: [], completed: [] };

let store: PlanState = EMPTY_STATE;
let storeRead = false;
const listeners = new Set<() => void>();

function readStoredState(): PlanState {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return EMPTY_STATE;
    const parsed = JSON.parse(stored) as Partial<PlanState>;
    return {
      plan: parsed.plan ?? [],
      saved: parsed.saved ?? [],
      completed: parsed.completed ?? [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function getSnapshot(): PlanState {
  if (!storeRead) {
    store = readStoredState();
    storeRead = true;
  }
  return store;
}

function getServerSnapshot(): PlanState {
  return EMPTY_STATE;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function update(updater: (prev: PlanState) => PlanState) {
  const next = updater(store);
  if (next === store) return;
  store = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((listener) => listener());
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const completed = useMemo(() => new Set(state.completed), [state.completed]);

  const addToPlan = useCallback((workout: Workout) => {
    update((prev) =>
      prev.plan.some((w) => w.id === workout.id)
        ? prev
        : { ...prev, plan: [...prev.plan, workout] }
    );
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    update((prev) => ({
      ...prev,
      plan: prev.plan.filter((w) => w.id !== id),
    }));
  }, []);

  const markAsDone = useCallback((id: number) => {
    update((prev) => {
      const nextCompleted = prev.completed.includes(id)
        ? prev.completed.filter((c) => c !== id)
        : [...prev.completed, id];
      return { ...prev, completed: nextCompleted };
    });
  }, []);

  const saveForLater = useCallback((workout: Workout) => {
    update((prev) =>
      prev.saved.some((w) => w.id === workout.id)
        ? prev
        : { ...prev, saved: [...prev.saved, workout] }
    );
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    update((prev) => ({
      ...prev,
      saved: prev.saved.filter((w) => w.id !== id),
    }));
  }, []);

  const clearCompleted = useCallback(() => {
    update((prev) => ({ ...prev, completed: [] }));
  }, []);

  const value = useMemo<PlanContextType>(
    () => ({
      plan: state.plan,
      saved: state.saved,
      completed,
      addToPlan,
      removeFromPlan,
      markAsDone,
      saveForLater,
      removeFromSaved,
      clearCompleted,
    }),
    [
      state.plan,
      state.saved,
      completed,
      addToPlan,
      removeFromPlan,
      markAsDone,
      saveForLater,
      removeFromSaved,
      clearCompleted,
    ]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
