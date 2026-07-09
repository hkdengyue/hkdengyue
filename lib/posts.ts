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
  image: string;
}

function normalizeDate(date: unknown): string {
  if (!date) return "";

  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }

  return String(date);
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

  const posts = fileNames.map((fileName) => {
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

      image: normalizeImage(data.image),
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );
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

    image: normalizeImage(data.image),

    content,
  };
}
