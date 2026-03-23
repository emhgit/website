"use client";

import { useState } from "react";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { Post } from "@/lib/utils";

interface PostsClientProps {
  allPosts: Post[];
}

export default function PostsClient({ allPosts }: PostsClientProps) {
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 5;
  const displayPosts = isSearching ? searchResults : allPosts;
  const totalPages = Math.ceil(displayPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = displayPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  const handleSearch = (results: Post[]) => {
    setSearchResults(results);
    setIsSearching(true);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClear = () => {
    setIsSearching(false);
    setCurrentPage(1); // Reset to first page when clearing search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="mb-8">
        <SearchInput
          onResults={handleSearch}
          loading={loading}
          setLoading={setLoading}
          onClear={handleClear}
        />
        {isSearching && searchResults.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Found {searchResults.length}{" "}
            {searchResults.length === 1 ? "post" : "posts"} matching your
            search.
          </p>
        )}
        {!isSearching && allPosts.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Showing {Math.min(startIndex + 1, allPosts.length)}-
            {Math.min(startIndex + POSTS_PER_PAGE, allPosts.length)} of{" "}
            {allPosts.length} posts
          </p>
        )}
      </div>

      {paginatedPosts.length === 0 ? (
        <p className="text-muted-foreground">
          {isSearching
            ? "No posts found matching your search."
            : "No posts yet."}
        </p>
      ) : (
        <>
          <div className="space-y-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="border-b border-border pb-8 last:border-b-0"
              >
                <Link href={`/posts/${post.id}`} className="block group">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {post.date && new Date(post.date).toLocaleDateString()}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-muted-foreground">{post.description}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-muted-foreground bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === page
                          ? "bg-red-600 text-white"
                          : "text-muted-foreground bg-background border border-border hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-muted-foreground bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
