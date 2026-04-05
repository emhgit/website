import Navbar from "@/components/Navbar";
import { createMetadata } from "@/lib/seo";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { projects } from "./projects";

export const metadata = createMetadata({
  title: "Projects",
  description: "Projects by Elliott M. Harper",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold text-foreground mb-8">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow"
            >
              {project.imageUrl && (
                <div className="mb-4 aspect-video relative overflow-hidden rounded-md bg-muted">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {project.name}
              </h3>

              {project.tags && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">Tags:</span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>

              <div className="flex space-x-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
