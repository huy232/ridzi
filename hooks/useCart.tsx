import { CartProductType } from "@/app/product/[productId]/ProductDetails"
import {
	createContext,
	useState,
	useContext,
	useCallback,
	useEffect,
} from "react"
import { toast } from "react-hot-toast"

type CartContextType = {
	cartTotalQuantity: number
	cartTotalAmount: number
	cartProducts: CartProductType[] | null
	handleAddProductToCart: (product: CartProductType) => void
	loadingProducts: boolean
	handleRemoveProductFromCart: (product: CartProductType) => void
	handleCartQuantityIncrease: (product: CartProductType) => void
	handleCartQuantityDecrease: (product: CartProductType) => void
	handleClearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
	[propName: string]: any
}

export const CartContextProvider = (props: Props) => {
	const [cartTotalQuantity, setCartTotalQuantity] = useState(0)
	const [cartProducts, setCartProducts] = useState<CartProductType[]>([])
	const [cartTotalAmount, setCartTotalAmount] = useState(0)
	const [loadingProducts, setLoadingProducts] = useState(true)

	useEffect(() => {
		const cartItems: any = localStorage.getItem("cartItems")
		const cProducts: CartProductType[] | [] = JSON.parse(cartItems)
		setCartProducts(cProducts || [])
		setLoadingProducts(false)
	}, [])

	useEffect(() => {
		const getTotals = () => {
			if (cartProducts) {
				const { total, quantity } = cartProducts.reduce(
					(accum, item) => {
						const itemTotal = item.price * item.quantity

						accum.total += itemTotal
						accum.quantity += item.quantity

						return accum
					},
					{ total: 0, quantity: 0 }
				)
				setCartTotalQuantity(quantity)
				setCartTotalAmount(total)
			}
		}
		getTotals()
	}, [cartProducts])

	const handleAddProductToCart = useCallback((product: CartProductType) => {
		setCartProducts((prev) => {
			let updatedCart
			if (prev) {
				updatedCart = [...prev, product]
			} else {
				updatedCart = [product]
			}
			localStorage.setItem("cartItems", JSON.stringify(updatedCart))
			toast.success("Product added to cart")
			return updatedCart
		})
	}, [])

	const handleRemoveProductFromCart = useCallback(
		(product: CartProductType) => {
			if (cartProducts) {
				const filteredProducts = cartProducts.filter((item) => {
					return item.id !== product.id
				})

				setCartProducts(filteredProducts)

				localStorage.setItem("cartItems", JSON.stringify(filteredProducts))
				toast.success("Product removed")
			}
		},
		[cartProducts]
	)

	const handleCartQuantityIncrease = useCallback(
		(product: CartProductType) => {
			let updatedCart
			if (product.quantity === 99) {
				return toast.error("Oops! Maximum reached")
			}

			if (cartProducts) {
				updatedCart = [...cartProducts]
				const existingIndex = cartProducts.findIndex(
					(item) => item.id === product.id
				)
				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity =
						updatedCart[existingIndex].quantity + 1
				}

				setCartProducts(updatedCart)
				localStorage.setItem("cartItems", JSON.stringify(updatedCart))
			}
		},
		[cartProducts]
	)

	const handleCartQuantityDecrease = useCallback(
		(product: CartProductType) => {
			let updatedCart
			if (product.quantity === 1) {
				return toast.error("Oops! Minimum reached")
			}

			if (cartProducts) {
				updatedCart = [...cartProducts]
				const existingIndex = cartProducts.findIndex(
					(item) => item.id === product.id
				)
				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity =
						updatedCart[existingIndex].quantity - 1
				}

				setCartProducts(updatedCart)
				localStorage.setItem("cartItems", JSON.stringify(updatedCart))
			}
		},
		[cartProducts]
	)

	const handleClearCart = useCallback(() => {
		setCartProducts([])
		setCartTotalQuantity(0)
		localStorage.setItem("cartItems", JSON.stringify(null))
	}, [])

	const value = {
		cartTotalQuantity,
		cartTotalAmount,
		cartProducts,
		handleAddProductToCart,
		loadingProducts,
		handleRemoveProductFromCart,
		handleCartQuantityIncrease,
		handleCartQuantityDecrease,
		handleClearCart,
	}

	return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (context === null) {
		throw new Error("useCart must be use within a CartContextProvider")
	}
	return context
}
