import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DEFAULT_IMAGE } from "./site";

const postsDirectory = path.join(
  process.cwd(),
  "content/posts"
);

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string[];
  tags: string[];
  image: string;
}

function normalizeDate(date: unknown): string {
  if (!date) return "";

  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }

  return String(date).split("T")[0];
}

function normalizeCategory(category: unknown): string[] {
  if (Array.isArray(category)) {
    return category.map((item) =>
      String(item).trim().toLowerCase()
    );
  }

  if (typeof category === "string") {
    return [category.trim().toLowerCase()];
  }

  return ["biotech"];
}

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.map((item) =>
      String(item).trim().toLowerCase()
    );
  }

  if (typeof tags === "string") {
    return [tags.trim().toLowerCase()];
  }

  return [];
}

function normalizeImage(image: unknown): string {
  if (
    typeof image === "string" &&
    image.startsWith("/")
  ) {
    return image;
  }

  return DEFAULT_IMAGE;
}

function normalizeSummary(
  summary: unknown,
  excerpt: unknown
): string {
  if (
    typeof summary === "string" &&
    summary.trim().length > 0
  ) {
    return summary.trim();
  }

  if (
    typeof excerpt === "string" &&
    excerpt.trim().length > 0
  ) {
    return excerpt.trim();
  }

  return "";
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const posts: Post[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");

    const fullPath = path.join(
      postsDirectory,
      fileName
    );

    const fileContents = fs.readFileSync(
      fullPath,
      "utf8"
    );

    const { data } = matter(fileContents);

    return {
      slug,

      title:
        typeof data.title === "string"
          ? data.title
          : "Untitled",

      date: normalizeDate(data.date),

      summary: normalizeSummary(
        data.summary,
        data.excerpt
      ),

      category: normalizeCategory(
        data.category
      ),

      tags: normalizeTags(
        data.tags
      ),

      image: normalizeImage(
        data.image
      ),
    };
  });

  return posts.sort((a, b) => {
    const timeA = Date.parse(a.date);
    const timeB = Date.parse(b.date);

    return timeB - timeA;
  });
}

export function getPostsByCategory(
  category: string
): Post[] {
  const target = category.toLowerCase();

  return getAllPosts().filter((post) =>
    post.category.includes(target)
  );
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(
    postsDirectory,
    `${slug}.md`
  );

  const fileContents = fs.readFileSync(
    fullPath,
    "utf8"
  );

  const { data, content } =
    matter(fileContents);

  return {
    slug,

    title:
      typeof data.title === "string"
        ? data.title
        : "Untitled",

    date: normalizeDate(data.date),

    summary: normalizeSummary(
      data.summary,
      data.excerpt
    ),

    category: normalizeCategory(
      data.category
    ),

    tags: normalizeTags(
      data.tags
    ),

    image: normalizeImage(
      data.image
    ),

    content,
  };
}

/* ===========================================
   Previous / Next Article
=========================================== */

export function getAdjacentPosts(
  slug: string
) {
  const posts = getAllPosts();

  const index = posts.findIndex(
    (post) => post.slug === slug
  );

  return {
    previous:
      index < posts.length - 1
        ? posts[index + 1]
        : null,

    next:
      index > 0
        ? posts[index - 1]
        : null,
  };
}

/* ===========================================
   Related Articles
   Priority:
   1. Shared Tags
   2. Shared Category
=========================================== */

export function getRelatedPosts(
  slug: string,
  limit = 3
) {
  const current = getPostBySlug(slug);

  const posts = getAllPosts().filter(
    (post) => post.slug !== slug
  );

  const tagMatched = posts.filter((post) =>
    post.tags.some((tag) =>
      current.tags.includes(tag)
    )
  );

  const categoryMatched = posts.filter(
    (post) =>
      !tagMatched.some(
        (item) => item.slug === post.slug
      ) &&
      post.category.some((cat) =>
        current.category.includes(cat)
      )
  );

  return [...tagMatched, ...categoryMatched].slice(
    0,
    limit
  );
}
