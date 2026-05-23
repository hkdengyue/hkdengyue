import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function HomePage() {
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <p className="uppercase tracking-[0.3em] text-cyan-200 text-sm mb-6">
            DengYueMed Global Medical News
          </p>

          <h1 className="text-6xl font-black leading-tight max-w-5xl mb-8">
            China Biotech & Global Healthcare Intelligence
          </h1>

          <p className="text-2xl text-cyan-100 max-w-3xl leading-relaxed">
            Covering innovative drugs, oncology, biotech investment,
            medical tourism, and pharmaceutical industry trends.
          </p>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl font-black">
            Latest Coverage
          </h2>

          <div className="flex gap-4">
            <Link
              href="/biotech"
              className="px-5 py-3 rounded-full bg-white shadow hover:shadow-lg transition"
            >
              Biotech
            </Link>

            <Link
              href="/cancer"
              className="px-5 py-3 rounded-full bg-white shadow hover:shadow-lg transition"
            >
              Cancer
            </Link>

            <Link
              href="/medical-tourism"
              className="px-5 py-3 rounded-full bg-white shadow hover:shadow-lg transition"
            >
              Medical Tourism
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <div className="h-72 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700"></div>

              <div className="p-10">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-600 mb-4">
                  {post.date}
                </p>

                <h3 className="text-4xl font-black leading-tight mb-6 group-hover:text-blue-700 transition">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}