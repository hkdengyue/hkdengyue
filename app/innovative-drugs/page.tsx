import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Innovative Drugs, ADC, CAR-T and GLP-1 News",
  description:
    "Coverage of innovative drugs, ADCs, CAR-T therapies, GLP-1 medicines, peptide APIs, clinical research, and global drug development.",
  alternates: {
    canonical: "/innovative-drugs/",
  },
  openGraph: {
    title: "Innovative Drugs, ADC, CAR-T and GLP-1 News",
    description:
      "Coverage of innovative drugs, ADCs, CAR-T therapies, GLP-1 medicines, peptide APIs, clinical research, and global drug development.",
    url: "/innovative-drugs/",
  },
};

export default function InnovativeDrugsPage() {
  const posts = getPostsByCategory("innovative-drugs");

  const featuredPost = posts[0];
  const sidePosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      <section className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <p className="uppercase tracking-[0.3em] text-sm text-blue-200 mb-6">
            Global Innovative Drug Coverage
          </p>

          <h1 className="text-7xl font-black leading-tight max-w-5xl">
            Innovative Drugs,
            ADC,
            CAR-T & GLP-1
          </h1>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-3 gap-10">

          {featuredPost && (
            <div className="lg:col-span-2 bg-white rounded-[2rem] overflow-hidden shadow-xl">

              <div className="relative h-[450px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-10">

                <p className="uppercase tracking-widest text-sm text-indigo-600 mb-4">
                  Featured Drug Story
                </p>

                <Link href={`/posts/${featuredPost.slug}`}>
                  <h2 className="text-5xl font-black leading-tight mb-6 hover:text-indigo-600 transition">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {featuredPost.summary}
                </p>

                <Link href={`/posts/${featuredPost.slug}`}>
                  <button className="bg-black hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl">
                    Read Full Coverage
                  </button>
                </Link>

              </div>

            </div>
          )}

          <div className="space-y-8">
            {sidePosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl p-6 shadow"
              >
                <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">
                  {post.date}
                </p>

                <Link href={`/posts/${post.slug}`}>
                  <h3 className="text-2xl font-bold hover:text-indigo-600 mb-4">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-600">
                  {post.summary}
                </p>

              </article>
            ))}
          </div>

        </div>

      </section>
    </main>
  );
}
