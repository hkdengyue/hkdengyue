import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory } from "../../lib/posts";

export default function BiotechPage() {
  const posts = getPostsByCategory("biotech");

  const featuredPost = posts[0];
  const sidePosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      {/* Top Banner */}
      <section className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-6">
            Global Biotech News
          </p>

          <h1 className="text-7xl font-black leading-tight max-w-5xl">
            Biotech Intelligence &
            Pharmaceutical Innovation
          </h1>

        </div>

      </section>

      {/* Featured Layout */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Featured Main Article */}
          {featuredPost && (
            <div className="lg:col-span-2 bg-white rounded-[2rem] overflow-hidden shadow-xl">

              {/* Featured Image */}
              <div className="relative h-[450px]">

                <Image
                  src={featuredPost?.image || "/images/default.jpg"}
                  alt={featuredPost?.title || "Medical News"}
                  fill
                  className="object-cover"
                />

              </div>

              {/* Featured Content */}
              <div className="p-10">

                <p className="uppercase tracking-widest text-sm text-blue-600 mb-4">
                  Featured Story
                </p>

                <Link href={`/posts/${featuredPost.slug}`}>

                  <h2 className="text-5xl font-black leading-tight mb-6 hover:text-blue-600 transition">
                    {featuredPost.title}
                  </h2>

                </Link>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {featuredPost.summary}
                </p>

                <Link href={`/posts/${featuredPost.slug}`}>

                  <button className="bg-black hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg transition">
                    Read Full Coverage
                  </button>

                </Link>

              </div>

            </div>
          )}

          {/* Side News */}
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

                  <h3 className="text-2xl font-bold leading-snug hover:text-blue-600 transition mb-4">
                    {post.title}
                  </h3>

                </Link>

                <p className="text-gray-600 leading-relaxed">
                  {post.summary}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* News Feed */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-bold">
            Latest Biotech Updates
          </h2>

          <div className="flex gap-3">

            <span className="bg-white px-4 py-2 rounded-full shadow text-sm">
              CAR-T
            </span>

            <span className="bg-white px-4 py-2 rounded-full shadow text-sm">
              ADC
            </span>

            <span className="bg-white px-4 py-2 rounded-full shadow text-sm">
              Immunotherapy
            </span>

          </div>

        </div>

        <div className="space-y-8">

          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl p-8 shadow flex flex-col lg:flex-row gap-8"
            >

              {/* Article Image */}
              <div className="relative lg:w-72 h-52 rounded-2xl overflow-hidden flex-shrink-0">

                <Image
                  src={post.image || "/images/default.jpg"}
                  alt={post.title || "Medical News"}
                  fill
                  className="object-cover"
                />

              </div>

              {/* Article Content */}
              <div>

                <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
                  {post.date}
                </p>

                <Link href={`/posts/${post.slug}`}>

                  <h3 className="text-3xl font-bold mb-5 hover:text-blue-600 transition">
                    {post.title}
                  </h3>

                </Link>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {post.summary}
                </p>

                <Link href={`/posts/${post.slug}`}>

                  <span className="text-blue-600 font-semibold">
                    Continue Reading →
                  </span>

                </Link>

              </div>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}