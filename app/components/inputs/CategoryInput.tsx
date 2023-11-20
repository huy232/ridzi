"use client"

import clsx from "clsx"
import { FC } from "react"
import { IconType } from "react-icons/lib"

interface CategoryInputProps {
	selected?: boolean
	label: string
	icon: IconType
	onClick?: (valie: string) => void
}

const CategoryInput: FC<CategoryInputProps> = ({
	selected,
	label,
	icon: Icon,
	onClick,
}) => {
	const categoryClass = clsx(
		`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer`,
		selected ? "border-slate-500" : "border-slate-200"
	)

	const handleClick = () => {
		if (onClick) {
			onClick(label)
		}
	}

	return (
		<div onClick={handleClick} className={categoryClass}>
			<Icon size={30} />
			<p className="font-medium">{label}</p>
		</div>
	)
}

export default CategoryInput
