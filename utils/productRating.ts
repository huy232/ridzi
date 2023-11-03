interface productRatingProps {
	reviews: [
		{
			rating: number
		}
	]
}

export const productRating = (data: productRatingProps) => {
	return (
		data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
		data.reviews.length
	)
}
