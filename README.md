# FitLog
 live link : a06-b-14-ph-fitlog.vercel.app
 <br>
 <br>
A dark, no-nonsense workout library for planning your training week. Browse a catalog of lifts, lock the ones you want into today's plan, mark them off as you finish, and watch your minutes and calories add up.

## Description

FitLog is a single-page fitness companion built with the Next.js App Router. It pulls twelve strength workouts from a REST API, renders them in a responsive card grid, and lets you sort the catalog by duration, calories, or rating. Every workout can be added to a five-lift daily plan, saved for later, or opened as a statically generated detail page. Plan state lives in React context and is mirrored to `localStorage`, so your week survives a refresh without an account or a backend of your own.

## Technologies Used

| Technology | Version | Role |
| --- | --- | --- |
| Next.js | 16.3.7 | App Router, SSG, image optimization, ISR |
| React | 19.2.8 | UI runtime and hooks |
| TypeScript | 5.x | Strict typing across data, props, and context |
| Tailwind CSS | 4.x | Utility-first styling, custom dark palette |
| lucide-react | 1.49.0 | Icon set |
| React Context | — | `PlanProvider` / `ToastProvider` state sharing |
| ESLint | 9.x | Flat config with `eslint-config-next` |

Fonts are loaded through `next/font` (Inter for body, Oswald for display headings), and remote images are proxied through the Next.js image optimizer with a `remotePatterns` allowlist.

## Features

1. **Sortable workout library** — a "Sort By" dropdown re-orders the live grid by Duration, Calories, or Rating, defaulting to Duration, with an animated chevron and keyboard-accessible listbox semantics.
2. **Daily plan builder** — add up to five lifts to today's plan, with running totals for exercise count, total minutes, and estimated calories burned.
3. **Mark as done and remove** — each planned card has a check button that toggles completion (strikethrough, dimmed state, accent highlight) and an X button that removes the workout; both fire a toast confirming the action.
4. **Save for later** — park any workout in a Saved tab on the My Plan page and pull it back into the plan later.
5. **Static workout detail pages** — every workout has its own pre-rendered route (`/workout/[id]`) served through `generateStaticParams` with a one-hour revalidation window.
6. **Persistent plan** — the full plan state, including completed sets, is serialized to `localStorage` and rehydrated on mount with no hydration mismatch.
7. **Toast notifications** — a small context-driven toast system confirms adds, saves, completions, and removals, and auto-dismisses after three seconds.
8. **Responsive dark UI** — a custom near-black palette with a high-visibility accent, mobile-first layouts, and loading skeletons and spinners for every async surface.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev     # start the dev server (webpack)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## Project Structure

```
src/
  app/            routes, layouts, and metadata
  components/     UI components (cards, dropdown, toasts, stats)
  contexts/       PlanProvider for plan/saved/completed state
  lib/            API client, types, and sorting helpers
  styles/         global Tailwind entry
```

## Data Source

Workout data is fetched from a public REST endpoint at build/request time and cached with `next: { revalidate: 3600 }`, so pages stay fast while remaining fresh.


