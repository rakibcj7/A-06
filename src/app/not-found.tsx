import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-6xl font-bold text-[#ccff00]">404</h1>
          <h2 className="mt-4 text-2xl font-bold text-[#ededed]">Page Not Found</h2>
          <p className="mt-2 text-sm text-[#888]">
            The page you are looking for does not exist.
          </p>
          <Link href="/">
            <button className="mt-6 rounded-lg bg-[#ccff00] px-5 py-2 font-medium text-black transition-colors hover:bg-[#b8e600]">
              Back to Home
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
