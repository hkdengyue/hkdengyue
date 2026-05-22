import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
      category?: string;
      image?: string;
    };

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      summary: data.summary || "",
      category: data.category || "biotech",
      image:
        data.image &&
        data.image.startsWith("/")
          ? data.image
          : "/images/default.jpg",
    };
  });

  return posts;
}

export function getPostsByCategory(
  category: string
) {
  const posts = getAllPosts();

  return posts.filter(
    (post) => post.category === category
  );
}