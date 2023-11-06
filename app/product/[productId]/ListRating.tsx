"use client"

import { Heading, Avatar } from "@/app/components"
import { Rating } from "@mui/material"
import moment from "moment"
import { FC } from "react"

interface ListRatingProps {
	product: any
}

const ListRating: FC<ListRatingProps> = ({ product }) => {
	return (
		<div>
			<Heading title="Product review" />
			<div className="text-sm mt-2">
				{!!product.reviews &&
					product.reviews.map((review: any) => {
						return (
							<div key={review.id} className="max-w-[320px]">
								<div className="flex gap-2 items-center">
									<Avatar src={review?.user.image} />
									<div className="font-semibold">{review?.user.name}</div>
									<div className="font-light">
										{moment(review.createdDate).fromNow()}
									</div>
								</div>
								<div className="mt-2">
									<Rating value={review.rating} readOnly />
									<div className="ml-2">{review.comment}</div>
									<hr className="my-4" />
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default ListRating
