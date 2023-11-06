import clsx from "clsx"
import { FC } from "react"

interface HeadingProps {
	title: string
	center?: boolean
}

const Heading: FC<HeadingProps> = ({ title, center }) => {
	const headingClass = clsx(center ? "text-center" : "text-start")

	return (
		<div className={headingClass}>
			<h1 className="font-bold text-2xl">{title}</h1>
		</div>
	)
}

export default Heading
