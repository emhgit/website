"use client";

import { TableOfContentsItem } from "@/lib/utils";

interface TOCProps {
  toc: TableOfContentsItem[];
}

export function TOC({ toc }: TOCProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Table of Contents
        </h2>
        {toc.length > 0 ? (
          <nav className="space-y-2">
            {toc.map((item: TableOfContentsItem) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, `#${item.id}`)}
                className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                  item.level > 2 ? "ml-4" : item.level > 1 ? "ml-2" : ""
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        ) : (
          <p className="text-sm text-muted-foreground">No headings found</p>
        )}
      </div>
    </div>
  );
}
