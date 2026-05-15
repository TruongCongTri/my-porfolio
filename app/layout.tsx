// Root Layout: Header, Footer, Font, Providers
import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ['italic'],
  weight: ['500', '600'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

// config-6 -  Base Metadata & OpenGraph
export const metadata: Metadata = {
  title: {
    default: "Truong Cong Tri | Full-Stack Developer", // Trang chủ sẽ có title này
    template: "%s | Full-Stack Developer", // Khi trang con cài title "Khóa React", nó sẽ ra "Khóa React | Boilerplate Next.js 13"
  },
  description:
    "Portfolio of Truong Cong Tri, an AI-fluent Full-Stack Engineer specializing in Node.js, React, and strict layer-based architectures.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable}`}>
      <body className={`antialiased`}>
        <div className="noise"></div>
        {children}
      </body>
    </html>
  );
}
