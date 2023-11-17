"use client"

import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/utils"
import {
	AddressElement,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js"
import { FC, FormEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Button, Heading } from "../components"

interface CheckoutFormProps {
	clientSecret: string
	handleSetPaymentSuccess: (value: boolean) => void
}

const CheckoutForm: FC<CheckoutFormProps> = ({
	clientSecret,
	handleSetPaymentSuccess,
}) => {
	const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart()
	const stripe = useStripe()
	const elements = useElements()
	const [isLoading, setIsLoading] = useState(true)
	const formattedPrice = formatPrice(cartTotalAmount)
	useEffect(() => {
		if (!stripe) {
			return
		}
		if (!clientSecret) {
			return
		}

		handleSetPaymentSuccess(false)
	}, [clientSecret, handleSetPaymentSuccess, stripe])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!stripe || !elements) {
			return
		}
		stripe
			.confirmPayment({ elements, redirect: "if_required" })
			.then((result) => {
				if (!result.error) {
					toast.success("Checkout success")
					handleClearCart()
					handleSetPaymentSuccess(true)
					handleSetPaymentIntent(null)
				}
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<form onSubmit={handleSubmit} id="payment-form">
			<div className="mb-6">
				<Heading title="Enter your details to complete checkout" />
			</div>
			<h2 className="font-semibold mt-4 mb-2">Address information</h2>
			<AddressElement
				options={{ mode: "shipping", allowedCountries: ["US"] }}
			/>
			<h2 className="font-semibold mt-4 mb-2">Payment information</h2>
			<PaymentElement id="payment-element" options={{ layout: "tabs" }} />
			<div className="py-4 text-center text-slate-700 text-4xl font-bold">
				Total: {formattedPrice}
			</div>
			<Button
				label={!isLoading ? "Processing" : "Pay now"}
				disabled={!isLoading || !stripe || !elements}
				loading={!isLoading}
			/>
		</form>
	)
}

export default CheckoutForm
