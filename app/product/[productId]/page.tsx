interface IParams {
	productId?: string
}

const Product = ({ params }: { params: IParams }) => {
	return <div>Product page</div>
}

export default Product
