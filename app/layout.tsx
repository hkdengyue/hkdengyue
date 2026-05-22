import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Global Medical News",
  description: "International healthcare and biotech media platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f5f7fb] text-black">

        {/* Global Navbar */}
        <header className="bg-white border-b sticky top-0 z-50">

          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <Link href="/" className="text-2xl font-black">
              Global Medical News
            </Link>

            <nav className="flex gap-8 text-gray-700 font-medium">

              <Link
                href="/"
                className="hover:text-blue-600 transition"
              >
                Home
              </Link>

              <Link
                href="/cancer"
                className="hover:text-red-600 transition"
              >
                Cancer
              </Link>

              <Link
                href="/biotech"
                className="hover:text-blue-600 transition"
              >
                Biotech
              </Link>

              <Link
                href="/medical-tourism"
                className="hover:text-emerald-600 transition"
              >
                Medical Tourism
              </Link>

            </nav>

          </div>

        </header>

        {/* Page Content */}
        {children}

        {/* Global Footer */}
        <footer className="bg-black text-gray-400 py-12 mt-20">

          <div className="max-w-7xl mx-auto px-6">

            <h3 className="text-white text-3xl font-bold mb-4">
              Global Medical News
            </h3>

            <p className="max-w-2xl leading-relaxed">
              Covering innovative drugs,
              oncology breakthroughs,
              biotechnology trends,
              and international healthcare.
            </p>

          </div>

        </footer>

      </body>
    </html>
  );
}