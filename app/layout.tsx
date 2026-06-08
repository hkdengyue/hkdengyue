import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | Oncology, Biotech & Cross-Border Healthcare`,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },

  keywords: [
    "medical news",
    "oncology",
    "cancer treatment",
    "innovative drugs",
    "biotech",
    "medical tourism",
    "rare disease",
    "healthcare policy",
    "precision medicine",
    "CAR-T",
    "ADC",
    "GLP-1",
    "healthcare",
  ],

  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",

    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE],
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
          <div className="max-w-7xl mx-auto px-6 py-4">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              {/* Logo */}
              <Link
                href="/"
                className="text-2xl font-black whitespace-nowrap"
              >
                Global Medical News
              </Link>

              {/* Navigation */}
              <nav className="flex flex-wrap gap-6 text-gray-700 font-medium">

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
                  href="/innovative-drugs"
                  className="hover:text-indigo-600 transition"
                >
                  Innovative Drugs
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

                <Link
                  href="/rare-disease"
                  className="hover:text-orange-600 transition"
                >
                  Rare Disease
                </Link>

                <Link
                  href="/healthcare-policy"
                  className="hover:text-purple-600 transition"
                >
                  Healthcare Policy
                </Link>

              </nav>

            </div>

          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="bg-black text-gray-400 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6">

            <h3 className="text-white text-3xl font-bold mb-4">
              Global Medical News
            </h3>

            <p className="max-w-3xl leading-relaxed">
              Independent coverage of innovative drugs,
              oncology breakthroughs, biotechnology trends,
              medical tourism, rare diseases,
              healthcare policy, precision medicine,
              and global healthcare developments.
            </p>

            {/* Footer Navigation */}
            <div className="flex flex-wrap gap-6 mt-8 text-sm">

              <Link
                href="/cancer"
                className="hover:text-white transition"
              >
                Cancer
              </Link>

              <Link
                href="/innovative-drugs"
                className="hover:text-white transition"
              >
                Innovative Drugs
              </Link>

              <Link
                href="/biotech"
                className="hover:text-white transition"
              >
                Biotech
              </Link>

              <Link
                href="/medical-tourism"
                className="hover:text-white transition"
              >
                Medical Tourism
              </Link>

              <Link
                href="/rare-disease"
                className="hover:text-white transition"
              >
                Rare Disease
              </Link>

              <Link
                href="/healthcare-policy"
                className="hover:text-white transition"
              >
                Healthcare Policy
              </Link>

            </div>

            <div className="mt-8 text-sm text-gray-500">
              © 2026 Global Medical News. All rights reserved.
            </div>

          </div>
        </footer>

      </body>
    </html>
  );
}
