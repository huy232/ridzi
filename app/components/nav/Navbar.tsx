import { CartCount, Container, UserMenu } from "@/app/components"
import Link from "next/link"
import { getCurrentUser } from "@/actions/getCurrentUser"

const Navbar = () => {
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
							<UserMenu />
						</div>
					</div>
				</Container>
			</div>
		</div>
	)
}

export default Navbar
