import FlexSearch from 'flexsearch';
import { getPosts } from './utils';

export interface SearchResult {
    id: string;
    title: string;
    date: string;
    description: string;
}

export async function createSearchIndex() {
    const posts = await getPosts();
    const index = new FlexSearch.Index({ tokenize: 'forward' });

    posts.forEach((post, i) => {
        // Index title, description, and tags
        const searchableText = `${post.title} ${post.description} ${post.tags.join(' ')}`;
        index.add(i, searchableText);
    });

    return { index, posts };
}

export async function searchPosts(query: string): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    const { index, posts } = await createSearchIndex();
    const results = index.search(query);

    return results.map(id => posts[id as number]);
}
