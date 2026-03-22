"use client";

import { TableOfContentsItem } from "@/lib/utils";
import { InlineMath } from "react-katex";

interface TOCProps {
  toc: TableOfContentsItem[];
}

export function TOC({ toc }: TOCProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.log(
        "TOC: Available heading IDs:",
        Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
          .map((h) => h.id)
          .filter((id) => id),
      );
    }
  };

  // Parse and render text with LaTeX
  const renderTextWithMath = (text: string) => {
    const parts = text.split(/(\$[^$]+\$)/g);

    return parts.map((part, index) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        const mathContent = part.slice(1, -1);
        return <InlineMath key={index} math={mathContent} />;
      }
      return <span key={index}>{part}</span>;
    });
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
                  item.level > 4
                    ? "ml-8"
                    : item.level > 3
                      ? "ml-6"
                      : item.level > 2
                        ? "ml-4"
                        : item.level > 1
                          ? "ml-2"
                          : ""
                }`}
              >
                {renderTextWithMath(item.title)}
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
