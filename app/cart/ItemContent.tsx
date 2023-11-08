"use client"

import { FC } from "react"
import { CartProductType } from "../product/[productId]/ProductDetails"
import { formatPrice } from "@/utils"
import Link from "next/link"
import Image from "next/image"
import { SetQuantity } from "../components"
import { useCart } from "@/hooks/useCart"

interface ItemContentProps {
	item: CartProductType
}

const ItemContent: FC<ItemContentProps> = ({ item }) => {
	const {
		handleRemoveProductFromCart,
		handleCartQuantityIncrease,
		handleCartQuantityDecrease,
	} = useCart()
	return (
		<div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1px] border-slate-200 py-4 items-center">
			<div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
				<Link href={`/product/${item.id}`}>
					<div className="relative w-[70px] aspect-square">
						<Image
							src={item.selectedImg.image}
							alt={item.name}
							fill
							className="object-contain"
						/>
					</div>
				</Link>
				<div className="flex flex-col justify-between">
					<Link href={`/product/${item.id}`} className="line-clamp-2">
						{item.name}
					</Link>
					<div>{item.selectedImg.color}</div>
					<div className="w-[70px]">
						<button
							className="text-slate-500"
							onClick={() => {
								handleRemoveProductFromCart(item)
							}}
						>
							Remove
						</button>
					</div>
				</div>
			</div>
			<div className="justify-self-center">{formatPrice(item.price)}</div>
			<div className="justify-self-center">
				<SetQuantity
					cartProduct={item}
					handleQuantityIncrease={() => {
						handleCartQuantityIncrease(item)
					}}
					handleQuantityDecrease={() => {
						handleCartQuantityDecrease(item)
					}}
				/>
			</div>
			<div className="justify-self-end font-semibold">
				{formatPrice(item.price * item.quantity)}
			</div>
		</div>
	)
}

export default ItemContent
