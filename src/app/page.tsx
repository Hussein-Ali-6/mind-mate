import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-[500px] dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container h-full absolute flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight ">
          Study smart, study with{" "}
          <span className="text-transparent  bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-600 tracking-tighter">
            MindMate
          </span>
        </h1>
        <p className="font-semibold mt-1 text-center">
          Revolutionize your study experience with AI-powered tools, maximizing
          productivity and empowering your academic journey effortlessly.
        </p>
        {!session?.user ? (
          <Button className="min-w-[200px] mt-6" asChild>
            <Link href="/auth/login">Getting started</Link>
          </Button>
        ) : (
          <Button variant="secondary" className="mt-4" asChild>
            <Link href="/dashboard">Go to the dashboard</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
