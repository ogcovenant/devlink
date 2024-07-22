import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const inter = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devlink",
  description: "NextLevel link or previewing sharing website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
