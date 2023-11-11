"use client"

import { formatPrice, productRating } from "@/utils/"
import { Rating } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface ProductCardProps {
	data: any
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
	const reviewsLength = data.reviews.length
	return (
		<Link
			href={`/product/${data.id}`}
			className="col-span-1 cursor-pointer border-[1px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
		>
			<div className="flex flex-col items-center w-full gap-1">
				<div className="aspect-square overflow-hidden relative w-full">
					<Image
						src={data.images[0].image}
						alt={data.name}
						fill
						className="w-full h-full object-contain"
					/>
				</div>
				<div className="mt-4 h-[50px] line-clamp-2">{data.name}</div>
				<div>
					<Rating value={productRating(data)} readOnly />
				</div>
				<div>{reviewsLength} reviews</div>
				<div className="font-semibold">{formatPrice(data.price)}</div>
			</div>
		</Link>
	)
}

export default ProductCard
