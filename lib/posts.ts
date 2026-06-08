import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DEFAULT_IMAGE } from "./site";

const postsDirectory = path.join(
  process.cwd(),
  "content/posts"
);

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const fullPath = path.join(
      postsDirectory,
      fileName
    );

    const fileContents = fs.readFileSync(
      fullPath,
      "utf8"
    );

    const matterResult = matter(fileContents);

    const data = matterResult.data as {
      title?: string;
      date?: string;
      summary?: string;
      excerpt?: string;
      category?: string;
      image?: string;
    };

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      summary: data.summary || data.excerpt || "",
      category: data.category || "biotech",
      image:
        data.image &&
        data.image.startsWith("/")
          ? data.image
          : DEFAULT_IMAGE,
    };
  });

  return posts.sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

export function getPostsByCategory(
  category: string
) {
  const posts = getAllPosts();

  return posts.filter(
    (post) => post.category === category
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

  const matterResult = matter(fileContents);
  const data = matterResult.data as {
    title?: string;
    date?: string;
    summary?: string;
    excerpt?: string;
    category?: string;
    image?: string;
  };

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "",
    summary: data.summary || data.excerpt || "",
    category: data.category || "biotech",
    image:
      data.image &&
      data.image.startsWith("/")
        ? data.image
        : DEFAULT_IMAGE,
    content: matterResult.content,
  };
}
