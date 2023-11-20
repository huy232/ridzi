"use client"
import { IconType } from "react-icons/lib"
import { FC } from "react"
import clsx from "clsx"

interface AdminNavItemProps {
	selected?: boolean
	icon: IconType
	label: string
}

const AdminNavItem: FC<AdminNavItemProps> = ({
	selected,
	icon: Icon,
	label,
}) => {
	const navClass = clsx(
		"flex items-center justify-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer",
		selected
			? "border-b-slate-800 text-slate-800"
			: "border-transparent text-slate-500"
	)

	return (
		<div className={navClass}>
			<Icon size={20} />
			<p className="font-medium text-sm text-center break-normal">{label}</p>
		</div>
	)
}

export default AdminNavItem
