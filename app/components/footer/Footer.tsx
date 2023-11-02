import Link from "next/link"
import { Container, FooterList } from "@/app/components"
import { CATEGORIES, FOLLOWUS, SERVICES } from "@/app/constants"
const Footer = () => {
	return (
		<footer className="bg-slate-700 text-slate-200 text-sm mt-16">
			<Container>
				<div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
					<FooterList>
						<h3 className="text-base font-bold mb-2 uppercase">
							{CATEGORIES.title}
						</h3>
						{CATEGORIES.items.map((item, index) => {
							return (
								<Link href={item.href} key={index}>
									{item.item}
								</Link>
							)
						})}
					</FooterList>
					<FooterList>
						<h3 className="text-base font-bold mb-2 uppercase">
							{SERVICES.title}
						</h3>
						{SERVICES.items.map((item, index) => {
							return (
								<Link href={item.href} key={index}>
									{item.item}
								</Link>
							)
						})}
					</FooterList>
					<div className="w-full md:w-1/3 mb-6 md:mb-0">
						<h3 className="text-base font-bold mb-2 uppercase">About us</h3>
						<p className="mb-2">
							At our store, we are trying our best to provide you the best gear
							that the customers needed.
						</p>
						<p>&copy; {new Date().getFullYear()} Ridzi. All rights reserved.</p>
					</div>
					<FooterList>
						<h3 className="text-base font-bold mb-2 uppercase">
							{FOLLOWUS.title}
						</h3>
						<div className="flex gap-2">
							{FOLLOWUS.items.map((item, index) => {
								return (
									<Link href={item.href} key={index}>
										{item.icon}
									</Link>
								)
							})}
						</div>
					</FooterList>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
