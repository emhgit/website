import Navbar from "@/components/Navbar";
import { getAmericanIdentityPost } from "@/lib/utils";
import AmericanIdentityGrid from "@/components/AmericanIdentityGrid";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "American Identity",
  description:
    "An exploration of American identity through the lens of democracy, equal protection, freedom of expression, and privacy",
  path: "/american-identity",
});

export default async function AmericanIdentityPage() {
  const indexPost = await getAmericanIdentityPost("index");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          American Identity
        </h1>

        {indexPost && (
          <div className="prose prose-lg max-w-none mb-12">
            <div className="prose-headings-text-center prose-headings-text-red-950">
              {indexPost.content}
            </div>
          </div>
        )}

        <div className="border-t-2 border-blue-900 pt-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Explore Sections
          </h2>
          <AmericanIdentityGrid />
        </div>
      </main>
    </div>
  );
}
