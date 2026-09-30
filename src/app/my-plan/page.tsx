import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MyPlanClient from "@/components/MyPlanClient";
import { Suspense } from "react";

export const metadata = {
  title: "My Plan — FitLog",
  description: "View and manage your daily workout plan.",
};

export default function MyPlanPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<MyPlanLoading />}>
          <MyPlanClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function MyPlanLoading() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <h2 className="font-display text-2xl font-bold uppercase text-[#ededed]">My Plan</h2>
      <p className="mt-1 text-sm text-[#888]">Loading workouts…</p>
    </section>
  );
}
