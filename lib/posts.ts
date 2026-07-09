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

function normalizeCategory(
  category: unknown
): string[] {
  if (Array.isArray(category)) {
    return category.map((c) => String(c).toLowerCase());
  }

  if (typeof category === "string") {
    return [category.toLowerCase()];
  }

  return ["biotech"];
}

function normalizeDate(
  date: unknown
): string {
  if (!date) return "";

  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }

  return String(date);
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(".md", "");

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

        summary:
          typeof data.summary === "string"
            ? data.summary
            : typeof data.excerpt === "string"
            ? data.excerpt
            : "",

        category: normalizeCategory(
          data.category
        ),

        image:
          typeof data.image === "string" &&
          data.image.startsWith("/")
            ? data.image
            : DEFAULT_IMAGE,
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
) {
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

    summary:
      typeof data.summary === "string"
        ? data.summary
        : typeof data.excerpt === "string"
        ? data.excerpt
        : "",

    category: normalizeCategory(
      data.category
    ),

    image:
      typeof data.image === "string" &&
      data.image.startsWith("/")
        ? data.image
        : DEFAULT_IMAGE,

    content,
  };
}
