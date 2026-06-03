import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://med-news.pages.dev"),

  title: {
    default: "Global Medical News",
    template: "%s | Global Medical News",
  },

  description:
    "Independent coverage of biotechnology, oncology, innovative drugs, medical tourism, precision medicine, and global healthcare trends.",

  keywords: [
    "medical news",
    "biotech",
    "oncology",
    "cancer treatment",
    "innovative drugs",
    "medical tourism",
    "precision medicine",
    "CAR-T",
    "ADC",
    "GLP-1",
    "healthcare",
  ],

  openGraph: {
    title: "Global Medical News",
    description:
      "Independent coverage of biotechnology, oncology, innovative drugs, medical tourism, and global healthcare trends.",
    url: "https://med-news.pages.dev",
    siteName: "Global Medical News",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/default.jpg",
        width: 1200,
        height: 630,
        alt: "Global Medical News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Global Medical News",
    description:
      "Independent coverage of biotechnology, oncology, innovative drugs, medical tourism, precision medicine, and global healthcare trends.",
    images: ["/images/default.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f5f7fb] text-black">
        {/* Navbar */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black">
              Global Medical News
            </Link>

            <nav className="flex gap-8 text-gray-700 font-medium">
              <Link href="/" className="hover:text-blue-600 transition">
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

        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="bg-black text-gray-400 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-white text-3xl font-bold mb-4">
              Global Medical News
            </h3>

            <p className="max-w-2xl leading-relaxed">
              Independent coverage of innovative drugs, oncology
              breakthroughs, biotechnology trends, medical tourism,
              precision medicine, and global healthcare developments.
            </p>

            <div className="mt-8 text-sm text-gray-500">
              © 2026 Global Medical News. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}