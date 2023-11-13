"use client"

import { useCallback, useEffect, useRef, useState, FC } from "react"
import { Avatar, MenuItem } from "@/app/components"
import { AiFillCaretDown } from "react-icons/ai"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/types"

const UserMenu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement | null>(null)

	const toggleOpen = useCallback(() => {
		setIsOpen((prev) => !prev)
	}, [])

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		},
		[menuRef]
	)

	useEffect(() => {
		document.addEventListener("click", handleClickOutside)

		return () => {
			document.removeEventListener("click", handleClickOutside)
		}
	}, [handleClickOutside])

	return (
		<div className="relative z-30" ref={menuRef}>
			<div
				onClick={toggleOpen}
				className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
			>
				<Avatar />
				<AiFillCaretDown />
			</div>
			{isOpen && (
				<div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
					<div>
						<Link href={"/orders"}>
							<MenuItem onClick={toggleOpen}>Your orders</MenuItem>
						</Link>
						<Link href={"/admin"}>
							<MenuItem onClick={toggleOpen}>Admin dashboard</MenuItem>
						</Link>
						<hr />
						<MenuItem
							onClick={() => {
								toggleOpen()
								signOut()
							}}
						>
							Logout
						</MenuItem>
					</div>

					<div>
						<Link href={"/login"}>
							<MenuItem onClick={toggleOpen}>Login</MenuItem>
						</Link>
						<Link href={"/register"}>
							<MenuItem onClick={toggleOpen}>Sign up</MenuItem>
						</Link>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
