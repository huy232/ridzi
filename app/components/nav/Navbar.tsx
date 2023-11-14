import { CartCount, Container, UserMenu } from "@/app/components"
import { SafeUser } from "@/types"
import Link from "next/link"
import { FC } from "react"

interface NavbarProps {
	currentUser: SafeUser | null
}

const Navbar: FC<NavbarProps> = async ({ currentUser }) => {
	return (
		<div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex items-center justify-between gap-3 md:gap-0">
						<Link href={"/"} className="font-bold text-2xl">
							Ridzi
						</Link>
						<div className="hidden md:block">Search</div>
						<div className="flex items-center gap-8 md:gap-12">
							<CartCount />
							<UserMenu currentUser={currentUser} />
						</div>
					</div>
				</Container>
			</div>
		</div>
	)
}

export default Navbar
