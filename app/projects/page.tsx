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
    name: "Portfolio Website",
    description: "A minimalistic portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
    githubUrl: "https://github.com/emhgit/portfolio",
    liveUrl: "https://emh.dev",
    imageUrl: "/projects/portfolio.png",
  },
  {
    id: "2", 
    name: "CLI Tool",
    description: "A command-line tool for automating common development tasks.",
    githubUrl: "https://github.com/emhgit/cli-tool",
  },
  {
    id: "3",
    name: "React Component Library",
    description: "A reusable component library built with React and TypeScript.",
    githubUrl: "https://github.com/emhgit/component-library",
    liveUrl: "https://components.emh.dev",
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
