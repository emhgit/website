import Navbar from "@/components/Navbar";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "USACO Guide (Next.js Migration)",
    description:
      "Migrated the USACO Guide website from Gatsby to Next.js to improve performance and developer experience.",
    githubUrl:
      "https://github.com/cpinitiative/usaco-guide/blob/master/docs/MIGRATION.md",
    liveUrl: "https://usaco.guide",
    imageUrl: "/usaco-guide-banner-image-big.jpg",
  },
  {
    id: "Economic Data Visualizer",
    name: "Economic Data Visualizer",
    description:
      "Fetches real-time economic indicators from the World Bank API and allows users to generate visual dashboards using Chart.js.",
    githubUrl: "https://github.com/emhgit/economic-data-visualizer",
    liveUrl: "https://economic-data-visualizer.net/",
    imageUrl: "/economic-data-visualizer-thumb.png",
  },
  {
    id: "cp",
    name: "Competitive Programming",
    description:
      "A collection of competitive programming problems and solutions in C++ and Java.",
    githubUrl: "https://github.com/emhgit/competitive-programming",
  },
  {
    id: "java-lsp",
    name: "(Coming Soon) USACO IDE Java LSP (Language Server Protocol)",
    description: "A Language Server Protocol implementation for Java.",
    githubUrl: "https://github.com/cpinitiative/ide-lsp-modal",
    liveUrl: "https://ide.usaco.guide",
    imageUrl: "/java-lsp-ss.png",
  },
];

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
                    className="object-cover"
                  />
                </div>
              )}

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {project.name}
              </h3>

              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>

              <div className="flex space-x-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                    className="flex items-center space-x-2 text-sm text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
