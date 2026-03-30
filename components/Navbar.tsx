"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Github, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-semibold text-foreground hover:text-foreground/80 transition-colors"
            >
              Elliott M. Harper
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
              <Link
                href="/american-identity"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                /american-identity
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md hover:bg-accent transition-colors"
                aria-label="Toggle theme"
                suppressHydrationWarning
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

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/projects"
              className="block text-foreground/70 hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              /projects
            </Link>
            <Link
              href="/posts"
              className="block text-foreground/70 hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              /posts
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
