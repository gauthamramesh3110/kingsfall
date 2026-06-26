import type { Metadata } from "next";
import "./globals.css";
import "./lib/socket";

export const metadata: Metadata = {
  title: "Kingsfall",
  description: "Kingsfall",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface-page text-text-muted">{children}</body>
    </html>
  );
}
