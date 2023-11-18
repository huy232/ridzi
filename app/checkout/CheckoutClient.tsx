"use client"
import { useCart } from "@/hooks/useCart"
import { Elements } from "@stripe/react-stripe-js"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import CheckoutForm from "./CheckoutForm"
import Link from "next/link"
import { Button } from "../components"

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const CheckoutClient = () => {
	const router = useRouter()
	const {
		loadingProducts,
		cartProducts,
		paymentIntent,
		handleSetPaymentIntent,
	} = useCart()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [clientSecret, setClientSecret] = useState("")
	const [paymentSuccess, setPaymentSuccess] = useState(false)
	useEffect(() => {
		// Create a payment intent as soon as the page loads
		if (!loadingProducts && cartProducts.length > 0) {
			fetch("/api/create-payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					items: cartProducts,
					payment_intent_id: paymentIntent,
				}),
			})
				.then((response) => {
					if (response.status === 401) {
						return router.push("/login")
					}

					return response.json()
				})
				.then((data) => {
					setClientSecret(data.paymentIntent.client_secret)
					handleSetPaymentIntent(data.paymentIntent.id)
				})
				.finally(() => {
					setLoading(false)
				})
				.catch((err) => {
					setError(true)
					toast.error("Something went wrong")
				})
		}
	}, [
		cartProducts,
		handleSetPaymentIntent,
		loadingProducts,
		paymentIntent,
		router,
	])

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: "stripe",
			labels: "floating",
		},
	}

	const handleSetPaymentSuccess = useCallback((value: boolean) => {
		setPaymentSuccess(value)
	}, [])

	return (
		<div className="w-full">
			{clientSecret && cartProducts.length > 0 && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm
						clientSecret={clientSecret}
						handleSetPaymentSuccess={handleSetPaymentSuccess}
					/>
				</Elements>
			)}
			{loading && <div className="text-center">Loading checkout...</div>}
			{error && (
				<div className="text-center text-rose-500">Something went wrong...</div>
			)}
			{paymentSuccess && (
				<div className="flex items-center flex-col gap-4">
					<div className="text-teal-500 text-center">Payment success</div>
					<div className="max-w-[220px] w-full">
						<Link href={"/order"}>
							<Button label="View your order" />
						</Link>
					</div>
				</div>
			)}
		</div>
	)
}

export default CheckoutClient
