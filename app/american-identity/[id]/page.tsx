import Navbar from "@/components/Navbar";
import { TOC } from "@/components/TOC";
import { notFound } from "next/navigation";
import { getAmericanIdentityPost } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getAmericanIdentityPost(id);

  if (!post) {
    return {
      title: "Section Not Found",
      robots: { index: false, follow: false },
    };
  }

  return createMetadata({
    title: `${post.title} - American Identity`,
    description:
      post.description ||
      "An exploration of American constitutional principles and their historical development",
    path: `/american-identity/${id}`,
    type: "article",
    keywords: post.tags || [
      "American Identity",
      "Constitutional Law",
      "Democracy",
      "Civil Rights",
    ],
  });
}

export default async function AmericanIdentitySectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getAmericanIdentityPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-6">
          <Link
            href="/american-identity"
            className="inline-flex items-center text-blue-900 hover:text-red-800 transition-colors duration-200"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to American Identity
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <aside className="lg:col-span-1">
            <TOC toc={post.tableOfContents} />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <article className="max-w-none">
              <div className="prose-headings:scroll-mt-24 prose-headings:text-blue-900 prose-p:text-gray-700 prose-strong:text-blue-900 prose-a:text-blue-900 hover:prose-a:text-muted-red">
                {post.content}
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
