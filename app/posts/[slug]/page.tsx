import type { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";

import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
} from "../../../lib/posts";

import {
  DEFAULT_IMAGE,
  SITE_NAME,
} from "../../../lib/site";

/* =========================================
   提取文章目录（TOC）
========================================= */

function extractHeadings(html: string) {
  const regex = /<h2>(.*?)<\/h2>/g;

  const headings: {
    id: string;
    text: string;
  }[] = [];

  let match;

  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, "");

    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({
      id,
      text,
    });
  }

  return headings;
}

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

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  const url = `/posts/${slug}/`;

  return {
    title: post.title,

    description: post.summary,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,

      images: [
        {
          url: post.image || DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.image || DEFAULT_IMAGE],
    },
  };
}

export default async function PostPage({
  params,
}: Props) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  const {
    previous,
    next,
  } = getAdjacentPosts(slug);

  const relatedPosts =
    getRelatedPosts(slug);

  const processedContent =
    await remark()
      .use(gfm)
      .use(html)
      .process(post.content);

  const contentHtml = processedContent
    .toString()
    .replace(/<h1/g, "<h2")
    .replace(/<\/h1>/g, "</h2>")
    .replace(
      /<h2>(.*?)<\/h2>/g,
      (_, title) => {
        const id = title
          .replace(/<[^>]+>/g, "")
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        return `<h2 id="${id}">${title}</h2>`;
      }
    );

  const headings =
    extractHeadings(contentHtml);

  const currentCategory =
    post.category.length > 0
      ? post.category[0]
      : "biotech";

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 text-white">

        <div className="max-w-5xl mx-auto px-6 py-24">

          <p className="uppercase tracking-[0.3em] text-sm text-cyan-200 mb-6">
            Global Medical News
          </p>

          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-cyan-100">

            <span>
              Published: {post.date}
            </span>

            {post.category.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full bg-cyan-700/40 border border-cyan-300/30 capitalize"
              >
                {cat}
              </span>
            ))}

          </div>

        </div>

      </section>

      {/* Cover */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">

        <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">

          <Image
            src={post.image || DEFAULT_IMAGE}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />

        </div>

      </section>

            {/* Article */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-[280px_1fr] gap-12">

          {/* ===========================
              Table of Contents
          =========================== */}
          <aside className="hidden lg:block">

            <div className="sticky top-24 rounded-[2rem] bg-white shadow-xl p-8">

              <h2 className="text-2xl font-black mb-6">

                Contents

              </h2>

              <nav className="space-y-3">

                {headings.map((heading) => (

                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className="block text-gray-600 hover:text-blue-600 transition leading-7"
                  >

                    {heading.text}

                  </a>

                ))}

              </nav>

            </div>

          </aside>

          {/* ===========================
              Article Content
          =========================== */}

          <article className="bg-white rounded-[2rem] shadow-xl p-8 lg:p-16">

            {post.summary && (

              <div className="border-l-4 border-blue-600 pl-6 mb-12">

                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">

                  {post.summary}

                </p>

              </div>

            )}

            <div
              className="
                prose
                prose-xl
                max-w-none
                prose-headings:font-black
                prose-headings:text-slate-900
                prose-p:text-gray-700
                prose-p:leading-relaxed
                prose-li:text-gray-700
                prose-img:rounded-2xl
                prose-img:shadow-lg
                prose-a:text-blue-600
                prose-a:no-underline
                hover:prose-a:underline
              "
              dangerouslySetInnerHTML={{
                __html: contentHtml,
              }}
            />

          </article>

        </div>

      </section>

            {/* Previous / Next */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <div className="grid md:grid-cols-2 gap-6">

          {previous ? (

            <Link
              href={`/posts/${previous.slug}`}
              className="group rounded-3xl bg-white shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >

              <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">

                ← Previous Article

              </p>

              <h3 className="text-2xl font-bold group-hover:text-blue-600 transition">

                {previous.title}

              </h3>

              <p className="mt-4 text-gray-500 line-clamp-2">

                {previous.summary}

              </p>

            </Link>

          ) : (

            <div />

          )}

          {next ? (

            <Link
              href={`/posts/${next.slug}`}
              className="group rounded-3xl bg-white shadow-lg p-8 text-right hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >

              <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">

                Next Article →

              </p>

              <h3 className="text-2xl font-bold group-hover:text-blue-600 transition">

                {next.title}

              </h3>

              <p className="mt-4 text-gray-500 line-clamp-2">

                {next.summary}

              </p>

            </Link>

          ) : (

            <div />

          )}

        </div>

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

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {relatedPosts.map((item) => (

              <Link
                key={item.slug}
                href={`/posts/${item.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >

                <div className="relative h-56 overflow-hidden">

                  <Image
                    src={item.image || DEFAULT_IMAGE}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                <div className="p-6">

                  <div className="flex flex-wrap gap-2 mb-4">

                    {item.category.map((cat) => (

                      <span
                        key={cat}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700"
                      >

                        {cat}

                      </span>

                    ))}

                  </div>

                  <h3 className="text-2xl font-bold leading-snug group-hover:text-blue-600 transition-colors">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-4 line-clamp-3 leading-7">

                    {item.summary}

                  </p>

                </div>

              </Link>

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-3xl shadow p-12 text-center">

            <h3 className="text-2xl font-bold mb-4">

              More Articles Coming Soon

            </h3>

            <p className="text-gray-500">

              We are continuously publishing global pharmaceutical,
              biotechnology, oncology, rare disease and healthcare policy
              news. Please check back soon.

            </p>

          </div>

        )}

      </section>

            {/* CTA */}
      <section className="bg-slate-900 text-white">

        <div className="max-w-6xl mx-auto px-6 py-20 text-center">

          <h2 className="text-4xl lg:text-5xl font-black mb-6">

            Stay Updated on Global Pharmaceutical Innovation

          </h2>

          <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed mb-10">

            DengYueMed continuously tracks innovative drugs,
            biotechnology, oncology, rare diseases,
            healthcare policy, and global pharmaceutical
            industry developments to help healthcare
            professionals, researchers, and industry
            partners stay informed about the latest
            medical innovations worldwide.

          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <Link
              href="/"
              className="rounded-full bg-cyan-500 px-8 py-4 font-semibold text-white transition hover:bg-cyan-400"
            >
              Browse Latest Articles
            </Link>

            <Link
              href="/innovative-drugs"
              className="rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Innovative Drugs
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
