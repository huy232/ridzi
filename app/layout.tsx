import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Navbar, Footer } from "@/app/components"
import clsx from "clsx"
import CartProvider from "@/providers/CartProvider"
import { Toaster } from "react-hot-toast"
import { getCurrentUser } from "@/actions/getCurrentUser"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
	title: "Ridzi shop",
	description: "Ridzi's homepage",
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const bodyClass = clsx(poppins.className, "text-slate-700")
	const currentUser = await getCurrentUser()
	return (
		<html lang="en">
			<body className={bodyClass}>
				<Toaster
					toastOptions={{
						style: {
							background: "rgb(51 65 85)",
							color: "#fff",
						},
					}}
				/>
				<CartProvider>
					<div className="flex flex-col min-h-screen">
						<Navbar currentUser={currentUser} />
						<main className="flex-grow">{children}</main>
						<Footer />
					</div>
				</CartProvider>
			</body>
		</html>
	)
}
