"use client"

import { IconType } from "react-icons/lib"
import { FC, MouseEvent } from "react"
import clsx from "clsx"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface ButtonProps {
	label?: string
	disabled?: boolean
	outline?: boolean
	small?: boolean
	custom?: string
	icon?: IconType
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	loading?: boolean
}

const Button: FC<ButtonProps> = ({
	label,
	disabled,
	outline,
	small,
	custom,
	icon: Icon,
	onClick,
	loading,
}) => {
	const buttonClass = clsx(
		"disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2",
		outline ? "bg-whit text-slate-700" : "bg-slate-700 text-white",
		small
			? "text-sm py-1 px-2 font-light border-[1px]"
			: "text-md py-3 px-4 font-semibold border-2",
		custom
	)
	return (
		<button onClick={onClick} disabled={disabled} className={buttonClass}>
			{loading ? (
				<AiOutlineLoading3Quarters className="animate-spin" size={24} />
			) : (
				<>
					{Icon && <Icon size={24} />} {label}
				</>
			)}
		</button>
	)
}

export default Button
