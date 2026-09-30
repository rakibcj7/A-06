import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <div className="flex h-64 items-center justify-center">
            <div className="border-2 border-t-yellow-400 border-r-transparent rounded-full h-12 w-12 animate-spin" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
