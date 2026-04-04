// Helper function to generate heading IDs
const generateId = (text: string): string => {
  const cleanText = text.toString().replace(/object-object/g, "");
  return cleanText
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
};

import { CodeBlock } from "./CodeBlock";
import { InlineCode } from "./InlineCode";

export const mdxComponents = {
  h1: ({ children, ...props }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h1
        id={id}
        className="text-4xl font-bold text-foreground mb-6 scroll-mt-24"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h2
        id={id}
        className="text-3xl font-semibold text-foreground mb-4 mt-8 scroll-mt-24"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h3
        id={id}
        className="text-2xl font-semibold text-foreground mb-3 mt-6 scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h4
        id={id}
        className="text-xl font-semibold text-foreground mb-2 mt-4 scroll-mt-24"
        {...props}
      >
        {children}
      </h4>
    );
  },
  h5: ({ children, ...props }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h5
        id={id}
        className="text-lg font-semibold text-foreground mb-2 mt-4 scroll-mt-24"
        {...props}
      >
        {children}
      </h5>
    );
  },
  h6: ({ children, ...props }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h6
        id={id}
        className="text-base font-semibold text-foreground mb-2 mt-4 scroll-mt-24"
        {...props}
      >
        {children}
      </h6>
    );
  },
  p: ({ children, ...props }: { children: React.ReactNode }) => (
    <p className="text-foreground mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  a: ({
    href,
    children,
    ...props
  }: {
    href?: string;
    children: React.ReactNode;
  }) => (
    <a
      href={href}
      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: { children: React.ReactNode }) => (
    <ul
      className="list-disc list-inside text-foreground mb-4 space-y-2"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: { children: React.ReactNode }) => (
    <ol
      className="list-decimal list-inside text-foreground mb-4 space-y-2"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: { children: React.ReactNode }) => (
    <li className="text-foreground" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: { children: React.ReactNode }) => (
    <blockquote
      className="border-l-4 border-border pl-4 italic text-muted-foreground mb-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: { children: React.ReactNode }) => (
    <InlineCode
      className="bg-muted text-foreground px-2 py-1 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </InlineCode>
  ),
  pre: ({ children, ...props }: { children: React.ReactNode }) => (
    <CodeBlock
      className="bg-muted text-foreground p-6 rounded-lg overflow-x-auto mb-4 font-mono text-sm"
      {...props}
    >
      {children}
    </CodeBlock>
  ),
  strong: ({ children, ...props }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: { children: React.ReactNode }) => (
    <em className="italic text-foreground" {...props}>
      {children}
    </em>
  ),
  table: ({ children, ...props }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto mb-4" {...props}>
      <table className="min-w-full border-collapse border border-border">
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: { children: React.ReactNode }) => (
    <thead className="bg-muted" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: { children: React.ReactNode }) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ children, ...props }: { children: React.ReactNode }) => (
    <tr className="border-b border-border" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: { children: React.ReactNode }) => (
    <th
      className="border border-border px-4 py-2 text-left font-semibold text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: { children: React.ReactNode }) => (
    <td className="border border-border px-4 py-2 text-foreground" {...props}>
      {children}
    </td>
  ),
};
