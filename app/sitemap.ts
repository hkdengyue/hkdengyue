import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/posts";
import { SITE_URL } from "../lib/site";

export const dynamic = "force-static";

const categories = [
  "cancer",
  "innovative-drugs",
  "biotech",
  "medical-tourism",
  "rare-disease",
  "healthcare-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...categories.map((category) => ({
      url: `${SITE_URL}/${category}/`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}/`,
      lastModified: post.date
        ? new Date(post.date)
        : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
