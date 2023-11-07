"use client"

import { Button, ProductImage, SetColor, SetQuantity } from "@/app/components"
import { useCart } from "@/hooks/useCart"
import { productRating } from "@/utils"
import { Rating } from "@mui/material"
import clsx from "clsx"
import Link from "next/link"
import { FC, useState, useCallback, useEffect } from "react"
import { MdCheckCircle } from "react-icons/md"
interface ProductDetailsProps {
	product: any
}

export type CartProductType = {
	id: string
	name: string
	description: string
	category: string
	brand: string
	selectedImg: SelectedImgType
	quantity: number
	price: number
}

export type SelectedImgType = {
	color: string
	colorCode: string
	image: string
}

const Horizontal = () => {
	return <hr className="w-[30%] my-2" />
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
	const { id, name, description, category, brand, images, price, inStock } =
		product
	const { handleAddProductToCart, cartProducts } = useCart()
	const [isProductInCart, setIsProductInCart] = useState(false)
	const [productLoading, setProductLoading] = useState(true)
	const [cartProduct, setCartProduct] = useState<CartProductType>({
		id,
		name,
		description,
		category,
		brand,
		selectedImg: { ...images[0] },
		quantity: 1,
		price,
	})
	const reviewsLength = product.reviews.length | 0
	const inStockStatus = clsx(inStock ? "text-teal-400" : "text-rose-400")

	useEffect(() => {
		if (cartProducts) {
			const existingIndex = cartProducts.findIndex(
				(item) => item.id === product.id
			)
			if (existingIndex > -1) {
				setIsProductInCart(true)
				setProductLoading(false)
			}
		}
	}, [cartProducts, product.id])

	const handleColorSelect = useCallback((value: SelectedImgType) => {
		setCartProduct((prev) => {
			return { ...prev, selectedImg: value }
		})
	}, [])

	const handleQuantityIncrease = useCallback(() => {
		setCartProduct((prev) => {
			return {
				...prev,
				quantity: prev.quantity + 1,
			}
		})
	}, [])

	const handleQuantityDecrease = useCallback(() => {
		if (cartProduct.quantity === 1) {
			return
		}
		setCartProduct((prev) => {
			return {
				...prev,
				quantity: prev.quantity - 1,
			}
		})
	}, [cartProduct.quantity])
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
			<ProductImage
				cartProduct={cartProduct}
				product={product}
				handleColorSelect={handleColorSelect}
			/>
			<div className="flex flex-col gap-1 text-slate-500 text-sm">
				<h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
				<div className="flex items-center">
					<Rating value={productRating(product)} readOnly />
					<div>{reviewsLength} reviews</div>
				</div>
				<Horizontal />
				<div>{description}</div>
				<Horizontal />
				<div>
					<span className="font-semibold uppercase">Category</span>
					{category}
				</div>
				<div>
					<span className="font-semibold uppercase">Brand</span>
					{brand}
				</div>
				<div className={inStockStatus}>
					{inStock ? "In stock" : "Out of stock"}
				</div>
				<Horizontal />

				{!productLoading &&
					(isProductInCart ? (
						<>
							<p className="mb-2 text-slate-500 flex items-center gap-1">
								<MdCheckCircle className="text-teal-400" size={20} />
								<span>Product added to cart</span>
							</p>
							<Link href={"/cart"} className="max-w-[300px]">
								<Button label="View cart" outline />
							</Link>
						</>
					) : (
						<>
							<SetColor
								cartProduct={cartProduct}
								images={images}
								handleColorSelect={handleColorSelect}
							/>
							<Horizontal />
							<SetQuantity
								cartProduct={cartProduct}
								handleQuantityIncrease={handleQuantityIncrease}
								handleQuantityDecrease={handleQuantityDecrease}
							/>
							<Horizontal />
							<div className="max-w-[300px]">
								<Button
									label="Add to cart"
									onClick={() => handleAddProductToCart(cartProduct)}
								/>
							</div>
						</>
					))}
			</div>
		</div>
	)
}

export default ProductDetails
