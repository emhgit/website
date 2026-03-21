import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getPosts } from "@/lib/utils";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold text-foreground mb-8">Posts</h1>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-border pb-8 last:border-b-0"
              >
                <Link href={`/posts/${post.slug}`} className="block group">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {post.date && new Date(post.date).toLocaleDateString()}
                    </p>
                    <p className="text-muted-foreground">{post.description}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
