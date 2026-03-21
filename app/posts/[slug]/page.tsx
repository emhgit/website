import Navbar from "@/components/Navbar";
import { TOC } from "@/components/TOC";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/utils";
import "katex/dist/katex.min.css";

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
            <TOC toc={post.tableOfContents} />
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

              <div className="prose-headings:scroll-mt-24">{post.content}</div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
