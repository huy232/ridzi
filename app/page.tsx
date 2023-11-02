import { Container, HomeBanner, ProductCard } from "@/app/components"
import { products } from "@/utils/products"
import { truncateText } from "@/utils/"

export default function Home() {
	return (
		<div className="p-8">
			<Container>
				<div>
					<HomeBanner />
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{products.map((product: any, index) => {
						return <ProductCard data={product} key={index} />
					})}
				</div>
			</Container>
		</div>
	)
}
