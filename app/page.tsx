import Navbar from "@/components/Navbar";

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
            <p>Computer science enthusiast and developer</p>
            <p>Junior in high school from Texas (Class of 2027)</p>
          </div>
          <p className="text-foreground mb-8">
            Checkout my{" "}
            <a
              href="https://github.com/emhgit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              GitHub
            </a>{" "}
            to see projects I am working on.
          </p>
        </div>
      </main>
    </div>
  );
}
