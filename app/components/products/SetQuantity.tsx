"use client"

import { CartProductType } from "@/app/product/[productId]/ProductDetails"
import clsx from "clsx"
import { FC } from "react"

interface SetQuantityProps {
	cartCounter?: boolean
	cartProduct: CartProductType
	handleQuantityIncrease: () => void
	handleQuantityDecrease: () => void
}

const SetQuantity: FC<SetQuantityProps> = ({
	cartProduct,
	cartCounter,
	handleQuantityIncrease,
	handleQuantityDecrease,
}) => {
	const btnStyles = clsx("border-[1.2px] border-slate-300 px-2 rounded")

	return (
		<div className="flex gap-8 items-center">
			{cartCounter && <div className="font-semibold uppercase">Quantity</div>}
			<div className="flex gap-4 items-center text-base">
				<button onClick={handleQuantityDecrease} className={btnStyles}>
					-
				</button>
				<div>{cartProduct.quantity}</div>
				<button onClick={handleQuantityIncrease} className={btnStyles}>
					+
				</button>
			</div>
		</div>
	)
}

export default SetQuantity
