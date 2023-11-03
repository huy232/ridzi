import { FC } from "react"
import {
	CartProductType,
	SelectedImgType,
} from "@/app/product/[productId]/ProductDetails"

interface SetColorProps {
	images: SelectedImgType
	cartProduct: CartProductType
	handColorSelect: (value: SelectedImgType) => void
}

const SetColor: FC<SetColorProps> = <T extends SetColorProps>(props: T) => {
	return <div>SetColor</div>
}

export default SetColor
