import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "../../../lib/posts";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: Props) {
  const { slug } = await params;

  const fullPath = path.join(
    process.cwd(),
    "content/posts",
    `${slug}.md`
  );

  const fileContents = fs.readFileSync(
    fullPath,
    "utf8"
  );

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(matterResult.content);

  const contentHtml =
    processedContent.toString();

  const image =
    matterResult.data.image &&
    matterResult.data.image.startsWith("/")
      ? matterResult.data.image
      : "/images/default.jpg";

  // Current Category
  const currentCategory =
    matterResult.data.category;

  // Related Posts
  const relatedPosts = getAllPosts()
    .filter(
      (post) =>
        post.slug !== slug &&
        post.category === currentCategory
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 text-white">

        <div className="max-w-5xl mx-auto px-6 py-24">

          <p className="uppercase tracking-[0.3em] text-sm text-cyan-200 mb-6">
            Global Medical News
          </p>

          <h1 className="text-6xl font-black leading-tight mb-8">
            {matterResult.data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-cyan-100 text-lg">

            <span>
              Published:{" "}
              {matterResult.data.date}
            </span>

            <span>
              {matterResult.data.category}
            </span>

          </div>

        </div>

      </section>

      {/* Cover Image */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">

        <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">

          <Image
            src={image}
            alt={matterResult.data.title}
            fill
            className="object-cover"
            priority
          />

        </div>

      </section>

      {/* Article */}
      <section className="max-w-4xl mx-auto px-6 py-20">

        <article className="bg-white rounded-[2rem] shadow-xl p-10 lg:p-16">

          {/* Summary */}
          <div className="border-l-4 border-blue-600 pl-6 mb-12">

            <p className="text-2xl text-gray-700 leading-relaxed">
              {matterResult.data.summary}
            </p>

          </div>

          {/* Content */}
          <div
            className="prose prose-xl max-w-none prose-headings:font-black prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700"
            dangerouslySetInnerHTML={{
              __html: contentHtml,
            }}
          />

        </article>

      </section>

      {/* Related Coverage */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-black">
            Related Coverage
          </h2>

          <Link
            href={`/${currentCategory}`}
            className="text-blue-600 font-semibold hover:underline"
          >
            View All Articles →
          </Link>

        </div>

        {relatedPosts.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-8">

            {relatedPosts.map((post) => (

              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition block group"
              >

                <div className="relative h-56 overflow-hidden">

                  <Image
                    src={
                      post.image &&
                      post.image.startsWith("/")
                        ? post.image
                        : "/images/default.jpg"
                    }
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>

                <div className="p-6">

                  <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider">

                    {post.category}

                  </p>

                  <h3 className="text-2xl font-bold leading-snug group-hover:text-blue-600 transition">

                    {post.title}

                  </h3>

                  <p className="text-gray-500 mt-4 line-clamp-3">

                    {post.summary}

                  </p>

                </div>

              </Link>

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-3xl p-12 text-center shadow">

            <p className="text-2xl text-gray-500">
              No related articles found.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}