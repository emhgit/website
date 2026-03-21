"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Github } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted] = useState(true);

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-semibold text-foreground hover:text-foreground/80 transition-colors"
            >
              Elliott Harper
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/projects"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                /projects
              </Link>
              <Link
                href="/posts"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                /posts
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            <a
              href="https://github.com/emhgit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
