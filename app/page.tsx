import Navbar from "@/components/Navbar";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home",
  description: "Portfolio and blog of Elliott M. Harper",
  path: "/",
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Elliott M. Harper
          </h1>
          <div className="space-y-2 text-lg text-muted-foreground mb-8">
            <p>Computer science and electronics enthusiast</p>
            <p>Junior in high school from Texas (Class of 2027)</p>
          </div>
          <p className="text-foreground mb-8">
            Checkout my{" "}
            <a
              href="https://github.com/emhgit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline"
            >
              GitHub
            </a>{" "}
            to see projects I am working on, and contact me at my{" "}
            <a
              href="mailto:eharper0815@gmail.com"
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline"
            >
              email.
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
