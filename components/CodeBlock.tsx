"use client";

import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  // Process children to remove leading whitespace from each line
  const processedChildren =
    typeof children === "string"
      ? children
          .split("\n")
          .map((line) => line.trimStart())
          .join("\n")
          .trim()
      : children;

  const handleCopy = async () => {
    if (codeRef.current) {
      const text = codeRef.current.textContent || "";
      // Remove leading/trailing whitespace and normalize indentation
      const cleanedText = text
        .split("\n")
        .map((line) => line.trimStart())
        .join("\n")
        .trim();
      try {
        await navigator.clipboard.writeText(cleanedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="relative group">
      <pre
        className={`${className} relative m-0`}
        style={{ textIndent: "0", padding: "0", margin: "0" }}
      >
        <code
          ref={codeRef}
          style={{
            display: "block",
            textIndent: "0",
            padding: "1rem",
            margin: "0",
          }}
        >
          {processedChildren}
        </code>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-muted border border-border rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-muted/80"
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </pre>
    </div>
  );
}
