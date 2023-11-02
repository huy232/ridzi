import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Navbar, Footer } from "@/app/components"
import clsx from "clsx"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
	title: "Ridzi shop",
	description: "Ridzi's homepage",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const bodyClass = clsx(poppins.className, "text-slate-700")
	return (
		<html lang="en">
			<body className={bodyClass}>
				<div className="flex flex-col min-h-screen">
					<Navbar />
					<main className="flex-grow">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}
