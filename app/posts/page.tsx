import Navbar from "@/components/Navbar";
import { getPosts } from "@/lib/utils";
import PostsClient from "@/components/PostsClient";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold text-foreground mb-8">Posts</h1>

        <PostsClient allPosts={posts} />
      </main>
    </div>
  );
}
