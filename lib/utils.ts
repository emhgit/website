import { mdxComponents } from "@/components/MDXComponents";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import fs from "fs";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export interface TableOfContentsItem {
    id: string;
    title: string;
    level: number;
}

export const getTOC = (content: string) => {
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

    return tableOfContents;
};

export interface PostData {
    title: string;
    date: string;
    description: string;
    content: React.ReactNode;
    tableOfContents: TableOfContentsItem[];
}

export async function getPost(id: string): Promise<PostData | null> {
    try {
        const postsDirectory = path.join(process.cwd(), "posts");
        const fullPath = path.join(postsDirectory, `${id}.mdx`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Generate table of contents
        const tableOfContents = getTOC(content);

        // Compile MDX content with math plugins
        const { content: compiledContent } = await compileMDX({
            source: content,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
            },
            components: mdxComponents,
        });

        return {
            title: data.title || id,
            date: data.date || "",
            description: data.description || "",
            content: compiledContent,
            tableOfContents,
        };
    } catch (error) {
        console.error("Error getting post:", error);
        return null;
    }
}

export interface Post {
    id: string;
    title: string;
    date: string;
    description: string;
}

export async function getPosts(): Promise<Post[]> {
    try {
        const postsDirectory = path.join(process.cwd(), "posts");
        const fileNames = fs.readdirSync(postsDirectory);

        const posts = fileNames
            .filter((fileName) => fileName.endsWith(".mdx"))
            .map((fileName) => {
                const id = fileName.replace(/\.mdx$/, "");
                const fullPath = path.join(postsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, "utf8");
                const { data } = matter(fileContents);

                return {
                    id,
                    title: data.title || id,
                    date: data.date || "",
                    description: data.description || "",
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return posts;
    } catch (error) {
        console.error("Error getting posts:", error);
        return [];
    }
}