import { FC } from "react"
import {
	CartProductType,
	SelectedImgType,
} from "@/app/product/[productId]/ProductDetails"
import clsx from "clsx"

interface SetColorProps {
	images: SelectedImgType[]
	cartProduct: CartProductType
	handleColorSelect: (value: SelectedImgType) => void
}

const SetColor: FC<SetColorProps> = ({
	images,
	cartProduct,
	handleColorSelect,
}) => {
	const imageClassBase =
		"h-7 w-7 rounded-full border-teal-300 flex items-center justify-center"
	const imageClass = (color: string) =>
		clsx(
			imageClassBase,
			cartProduct.selectedImg.color === color ? "border-[1.5px]" : "border-none"
		)
	return (
		<div>
			<div className="flex gap-4 items-center">
				<span className="uppercase font-semibold">Color</span>
				<div className="flex gap-1">
					{images.map((image) => {
						return (
							<div
								onClick={() => handleColorSelect(image)}
								key={image.color}
								className={imageClass(image.color)}
							>
								<div
									style={{ background: image.colorCode }}
									className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
								></div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default SetColor
