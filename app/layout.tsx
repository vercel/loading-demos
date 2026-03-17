import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Prefetch Behavior",
  description: "Interactive demos showing how prefetch={null}, prefetch={false}, and prefetch={true} affect loading.js behavior in Next.js App Router.",
  openGraph: {
    siteName: "Next.js Prefetch Behavior",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
