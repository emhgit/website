// Helper function to generate heading IDs
const generateId = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h1
        id={id}
        className="text-4xl font-bold text-foreground mb-6 scroll-mt-24"
      >
        {children}
      </h1>
    );
  },
  h2: ({ children }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h2
        id={id}
        className="text-3xl font-semibold text-foreground mb-4 mt-8 scroll-mt-24"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h3
        id={id}
        className="text-2xl font-semibold text-foreground mb-3 mt-6 scroll-mt-24"
      >
        {children}
      </h3>
    );
  },
  h4: ({ children }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h4
        id={id}
        className="text-xl font-semibold text-foreground mb-2 mt-4 scroll-mt-24"
      >
        {children}
      </h4>
    );
  },
  h5: ({ children }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h5
        id={id}
        className="text-lg font-semibold text-foreground mb-2 mt-4 scroll-mt-24"
      >
        {children}
      </h5>
    );
  },
  h6: ({ children }: { children: React.ReactNode }) => {
    const id = generateId(children?.toString() || "");
    return (
      <h6
        id={id}
        className="text-base font-semibold text-foreground mb-2 mt-4 scroll-mt-24"
      >
        {children}
      </h6>
    );
  },
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-foreground mb-4 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside text-foreground mb-4 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside text-foreground mb-4 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-foreground">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground mb-4">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-muted text-foreground px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm">
      {children}
    </pre>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic text-foreground">{children}</em>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-border">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-muted">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-border">{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-border px-4 py-2 text-foreground">
      {children}
    </td>
  ),
};
