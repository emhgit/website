import type { Metadata } from "next";

const BASE_URL = "https://elliottmharper.dev";

export type SEOProps = {
    title: string;
    description: string;
    path: string;
    image?: string;
    keywords?: string[];
    type?: "website" | "article";
    publishedTime?: string;
};

export function createMetadata({
    title,
    description,
    path,
    image,
    keywords,
    type = "website",
    publishedTime,
}: SEOProps): Metadata {
    const url = `${BASE_URL}${path}`;
    const ogImage = image || "/default-image.png";

    return {
        title,
        description,

        alternates: {
            canonical: url,
        },

        keywords,

        openGraph: {
            title,
            description,
            url,
            type,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                },
            ],
            ...(type === "article" &&
                publishedTime && {
                publishedTime,
            }),
        },

        twitter: {
            title,
            description,
            images: [ogImage],
        },
    };
}