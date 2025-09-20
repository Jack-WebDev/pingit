import type { Metadata } from "next";
import { Libertinus_Mono, Libertinus_Sans } from "next/font/google";
import Header from "@/components/header";
import Providers from "@/components/providers";
import "../index.css";

const libertinusSans = Libertinus_Sans({
	variable: "--font-libertinus-sans",
	weight: ["400", "700"],
	subsets: ["latin"],
});

const libertinusMono = Libertinus_Mono({
	variable: "--font-libertinus-mono",
	weight: ["400"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PingIt",
	description:
		"PingIt is a fast, fun, and modern way to share your thoughts — where every ping sparks a connection.",

	icons: {
		icon: "pingit_logo.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${libertinusSans.variable} ${libertinusMono.variable} antialiased`}
			>
				<Providers>
					<div className="grid h-svh grid-rows-[auto_1fr]">
						<Header />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
