"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className = "" }: InlineCodeProps) {
  const [copied, setCopied] = useState(false);

  // Process children to remove leading/trailing whitespace
  const processedChildren =
    typeof children === "string" ? children.trim() : children;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = children?.toString() || "";
    // Clean up any leading/trailing whitespace
    const cleanedText = text.trim();
    try {
      await navigator.clipboard.writeText(cleanedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <span className="relative inline-group">
      <code
        className={`${className} cursor-pointer hover:bg-muted/80 transition-colors duration-200`}
        style={{ textIndent: "0", margin: "0", padding: "0" }}
      >
        {processedChildren}
      </code>
      <button
        onClick={handleCopy}
        className="absolute -top-2 -right-2 p-1 bg-muted border border-border rounded opacity-0 inline-group-hover:opacity-100 transition-opacity duration-200 hover:bg-muted/80 z-10"
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-3 h-3 text-green-600" />
        ) : (
          <Copy className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </span>
  );
}
