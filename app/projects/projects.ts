interface Project {
    id: string;
    name: string;
    description: string;
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    tags?: string[];
}

export const projects: Project[] = [
    {
        id: "1",
        name: "USACO Guide (Next.js Migration)",
        tags: [
            "Next.js",
            "Gatsby",
            "Algolia",
            "MDX",
            "TypeScript",
            "Vercel",
            "Firebase",
            "SQLite",
        ],
        description:
            "Migrated the USACO Guide website from Gatsby to Next.js to improve performance and developer experience.",
        githubUrl:
            "https://github.com/cpinitiative/usaco-guide/blob/master/docs/MIGRATION.md",
        liveUrl: "https://usaco.guide",
        imageUrl: "/usaco-guide-banner-image-big.jpg",
    },
    {
        id: "Economic Data Visualizer",
        name: "Economic Data Visualizer",
        tags: ["Vanilla JavaScript", "Chart.js", "World Bank API", "Cloudflare"],
        description:
            "Fetches real-time economic indicators from the World Bank API and allows users to generate visual dashboards using Chart.js.",
        githubUrl: "https://github.com/emhgit/economic-data-visualizer",
        liveUrl: "https://economic-data-visualizer.net/",
        imageUrl: "/economic-data-visualizer-thumb.png",
    },
    {
        id: "cp",
        name: "Competitive Programming",
        tags: ["C++", "Java", "Maven"],
        description:
            "A collection of competitive programming problems and solutions in C++ and Java.",
        githubUrl: "https://github.com/emhgit/competitive-programming",
    },
    {
        id: "java-lsp",
        name: "(Coming Soon) USACO Guide IDE Java LSP",
        tags: ["Python", "FastAPI", "JDTLS", "Modal", "Monaco Editor", "Docker"],
        description: "An LSP (Language Server Protocol) implementation for Java.",
        githubUrl: "https://github.com/cpinitiative/ide-lsp-modal",
        liveUrl: "https://ide.usaco.guide",
        imageUrl: "/java-lsp-ss.png",
    },
    {
        id: "personal-website",
        name: "Personal Website (This)",
        tags: ["Next.js", "Tailwind CSS", "Vercel"],
        description:
            "A personal website built with Next.js and Tailwind CSS, deployed with Vercel.",
        githubUrl: "https://github.com/emhgit/website",
        liveUrl: "https://elliottmharper.dev",
    },
];