import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">

          <p className="uppercase tracking-widest mb-4 text-sm">
            International Healthcare & Biotech Media
          </p>

          <h2 className="text-6xl font-bold max-w-4xl leading-tight mb-6">
            Covering Global Medical Innovation,
            Cancer Therapy, and Cross-Border Healthcare
          </h2>

          <p className="text-xl text-blue-100 max-w-2xl">
            Insights into China innovative drugs,
            oncology breakthroughs, and international patient care.
          </p>

        </div>
      </section>

      {/* Articles */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="flex items-center justify-between mb-10">
          <h3 className="text-3xl font-bold">
            Latest Articles
          </h3>

          <p className="text-gray-500">
            {posts.length} Articles
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition duration-300"
            >

              <img
  src={post.image}
  alt={post.title}
  className="h-56 w-full object-cover"
/>

              <div className="p-8">

                <p className="text-sm text-gray-500 mb-3">
                  {post.date}
                </p>

                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-3xl font-bold mb-4 hover:text-blue-600 transition cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {post.summary}
                </p>

                <Link href={`/posts/${post.slug}`}>
                  <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition">
                    Read Article
                  </button>
                </Link>

              </div>
            </article>
          ))}

        </div>

      </section>

    </main>
  );
}