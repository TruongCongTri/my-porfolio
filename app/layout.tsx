// Root Layout: Header, Footer, Font, Providers
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layouts/Header";
import {Footer} from "@/components/layouts/Footer";
import NextTopLoader from "nextjs-toploader";
import { env } from "@/lib/env";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

// config-6 -  Base Metadata & OpenGraph
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  title: {
    default: "Truong Cong Tri | Full-Stack Developer", // Trang chủ sẽ có title này
    template: "%s | Full-Stack Developer", // Khi trang con cài title "Khóa React", nó sẽ ra "Khóa React | Boilerplate Next.js 13"
  },
  description:
    "Portfolio of Truong Cong Tri, an AI-fluent Full-Stack Engineer specializing in Node.js, React, and strict layer-based architectures.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: env.NEXT_PUBLIC_URL,
    siteName: "Truong Cong Tri | Full-Stack Developer",
    images: [{ url: "/images/default-og-cover.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-zinc-950 text-zinc-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}>
        <NextTopLoader
          color="#00d3f2"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        /> 
        {/* Sẽ bọc ReactQueryProvider ở đây trong thực tế */}
        <Header />
        <main className="flex min-h-screen flex-col items-center w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
