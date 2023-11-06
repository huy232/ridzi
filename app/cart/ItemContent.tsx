"use client"

import { FC } from "react"
import { CartProductType } from "../product/[productId]/ProductDetails"

interface ItemContentProps {
	item: CartProductType
}

const ItemContent: FC<ItemContentProps> = ({ item }) => {
	return (
		<div className="grid grid-col-5 text-xs md:text-sm gap-4 border-t-[1px] border-slate-200 py-4 items-center">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default ItemContent
