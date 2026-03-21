import Navbar from "@/components/Navbar";
import { TOC } from "@/components/TOC";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/utils";
import "katex/dist/katex.min.css";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description || "Blog post by Elliott M. Harper",
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://elliottmharper.dev/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Posts",
            item: "https://elliottmharper.dev/posts",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://elliottmharper.dev/posts/${id}`,
          },
        ],
      }),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

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
            <TOC toc={post.tableOfContents} />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <article className="max-w-none">
              <div className="prose-headings:scroll-mt-24">{post.content}</div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
