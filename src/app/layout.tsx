import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { sharedContent } from "@/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sherife AbdelMessih - Bestselling Author & Entrepreneur",
  description:
    "Join bestselling author Sherife AbdelMessih for transformative masterclass series including The Happiness Code and The S8 Method. Unlock your potential with science-backed frameworks.",
  keywords:
    "Sherife AbdelMessih, happiness, success, personal development, psychology, masterclass, life transformation, bestselling author",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon-180x180.svg",
  },
  openGraph: {
    title: "Sherife AbdelMessih - Bestselling Author & Entrepreneur",
    description:
      "Join bestselling author Sherife AbdelMessih for transformative masterclass series including The Happiness Code and The S8 Method. Unlock your potential with science-backed frameworks.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sherife AbdelMessih - Bestselling Author & Entrepreneur",
    description:
      "Join bestselling author Sherife AbdelMessih for transformative masterclass series including The Happiness Code and The S8 Method. Unlock your potential with science-backed frameworks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J48XZBKJ0R"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J48XZBKJ0R');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
