import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import Link from "next/link";
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

              <div className="prose-headings:scroll-mt-24">{post.content}</div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
