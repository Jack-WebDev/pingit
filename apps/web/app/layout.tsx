import type { Metadata } from "next";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Explore - PingIt",
  description: "PingIt is a modern, fast, and scalable microblogging platform inspired by Twitter. Built with cutting-edge technologies, PingIt allows users to share their thoughts, interact with others, and stay updated in real time.",
  icons: [{ rel: "icon", url: "/favicon.webp" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
