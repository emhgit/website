import Navbar from "@/components/Navbar";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface PostData {
  title: string;
  date: string;
  description: string;
  content: string;
  tableOfContents: TableOfContentsItem[];
}

// Custom MDX components
const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold text-foreground mb-6 scroll-mt-24">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-semibold text-foreground mb-4 mt-8 scroll-mt-24">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-semibold text-foreground mb-3 mt-6 scroll-mt-24">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-xl font-semibold text-foreground mb-2 mt-4 scroll-mt-24">
      {children}
    </h4>
  ),
  h5: ({ children }: { children: React.ReactNode }) => (
    <h5 className="text-lg font-semibold text-foreground mb-2 mt-4 scroll-mt-24">
      {children}
    </h5>
  ),
  h6: ({ children }: { children: React.ReactNode }) => (
    <h6 className="text-base font-semibold text-foreground mb-2 mt-4 scroll-mt-24">
      {children}
    </h6>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-foreground mb-4 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
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
  // LaTeX components
  InlineMath: ({ math }: { math: string }) => <InlineMath math={math} />,
  BlockMath: ({ math }: { math: string }) => <BlockMath math={math} />,
};

async function getPost(slug: string): Promise<PostData | null> {
  try {
    const postsDirectory = path.join(process.cwd(), "posts");
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Generate table of contents
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const tableOfContents: TableOfContentsItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      tableOfContents.push({
        id,
        title,
        level,
      });
    }

    return {
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      content,
      tableOfContents,
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Table of Contents
              </h2>
              {post.tableOfContents.length > 0 ? (
                <nav className="space-y-2">
                  {post.tableOfContents.map((item) => (
                    <Link
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                        item.level > 2 ? "ml-4" : item.level > 1 ? "ml-2" : ""
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No headings found
                </p>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <article className="max-w-none">
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {post.title}
                </h1>
                {post.date && (
                  <p className="text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                )}
              </header>

              <div className="prose-headings:scroll-mt-24">
                <MDXRemote source={post.content} components={mdxComponents} />
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
