import { MdFacebook } from "react-icons/md"
import {
	AiFillTwitterCircle,
	AiFillInstagram,
	AiFillYoutube,
} from "react-icons/ai"

export const CATEGORIES = {
	title: "Categories",
	items: [
		{
			item: "Graphic cards",
			href: "#",
		},
		{
			item: "CPUs",
			href: "#",
		},
		{
			item: "Monitors",
			href: "#",
		},
		{
			item: "RAM",
			href: "#",
		},
		{
			item: "Headphones",
			href: "#",
		},
		{
			item: "Others",
			href: "#",
		},
	],
}

export const SERVICES = {
	title: "Services",
	items: [
		{
			item: "Contact us",
			href: "#",
		},
		{
			item: "Shipping policy",
			href: "#",
		},
		{
			item: "Returns & Exchanges",
			href: "#",
		},
		{
			item: "FAQs",
			href: "#",
		},
	],
}

export const FOLLOWUS = {
	title: "Follow us",
	items: [
		{
			icon: <MdFacebook size={24} />,
			href: "#",
		},
		{
			icon: <AiFillTwitterCircle size={24} />,
			href: "#",
		},
		{
			icon: <AiFillInstagram size={24} />,
			href: "#",
		},
		{
			icon: <AiFillYoutube size={24} />,
			href: "#",
		},
	],
}
