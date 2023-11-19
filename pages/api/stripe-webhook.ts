import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import { buffer } from "micro"

export const config = {
	api: {
		bodyParser: false,
	},
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2023-10-16",
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const buff = await buffer(req)
	const sig = req.headers["stripe-signature"]

	if (!sig) {
		return res.status(400).send("Missing the stripe signature")
	}
	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(
			buff,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET as string
		)
	} catch (error) {
		return res.status(400).send("Webhook error" + error)
	}

	switch (event.type) {
		case "charge.succeeded":
			const charge: any = event.data.object as Stripe.Charge
			if (typeof charge.payment_intent === "string") {
				await prisma?.order.update({
					where: { paymentIntentId: charge.payment_intent },
					data: { status: "complete", address: charge.shipping?.address },
				})
			}
			break
		default:
			console.log("Unhandled event type: " + event.type)
	}

	res.json({ received: true })
}