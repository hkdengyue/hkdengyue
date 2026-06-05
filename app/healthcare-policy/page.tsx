import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory } from "../../lib/posts";

export default function HealthcarePolicyPage() {
  const posts = getPostsByCategory("healthcare-policy");

  const featuredPost = posts[0];
  const sidePosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      <section className="bg-gradient-to-r from-purple-900 via-violet-800 to-fuchsia-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <p className="uppercase tracking-[0.3em] text-sm text-purple-200 mb-6">
            Global Healthcare Policy
          </p>

          <h1 className="text-7xl font-black leading-tight max-w-5xl">
            Healthcare Policy,
            Drug Regulation,
            Market Access
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

                <p className="uppercase tracking-widest text-sm text-purple-600 mb-4">
                  Featured Policy Story
                </p>

                <Link href={`/posts/${featuredPost.slug}`}>
                  <h2 className="text-5xl font-black leading-tight mb-6 hover:text-purple-600 transition">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-xl text-gray-600 mb-8">
                  {featuredPost.summary}
                </p>

              </div>

            </div>
          )}

          <div className="space-y-8">
            {sidePosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl p-6 shadow"
              >
                <p className="text-sm text-gray-400 mb-3">
                  {post.date}
                </p>

                <Link href={`/posts/${post.slug}`}>
                  <h3 className="text-2xl font-bold hover:text-purple-600 mb-4">
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