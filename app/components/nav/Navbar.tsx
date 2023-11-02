import { Container } from "@/app/components"
import Link from "next/link"
import clsx from "clsx"

const Navbar = () => {
	const logoClass = clsx("font-bold text-2xl")
	return (
		<div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex items-center justify-between gap-3 md:gap-0">
						<Link href={"/"} className={logoClass}>
							Ridzi
						</Link>
						<div className="hidden md:block">Search</div>
						<div className="flex items-center gap-8 md:gap-12">
							<div>CartCount</div>
							<div>UserMenu</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	)
}

export default Navbar
