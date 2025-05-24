import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Pawan Awasthi | Engineering Student",
  description:
    "Welcome to the portfolio of Pawan Awasthi, an aspiring engineer with a passion for technology and innovation.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Pawan Awasthi | Engineering Student",
    description:
      "Explore the portfolio of Pawan Awasthi, showcasing, skills, projects and achievements in engineering.",
    type: "website",
    images: [
      {
        url: "/meta/ogg.jpeg",
        width: 1200,
        height: 630,
        alt: "Pawan Awasthi's Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Awasthi - Engineering Student",
    description:
      "Discover the work and accomplishments of Pawan Awasthi in the field of engineering.",
    images: [
      {
        url: "https://pbs.twimg.com/profile_images/1798757747619725312/FZAw-qXO_400x400.jpg",
        alt: "Pawan Awasthi's Portfolio"
      }
    ]
  },
  icons: {
    icon: "/meta/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
      </body>
    </html>
  );
}
