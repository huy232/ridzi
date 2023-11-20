import { Container, FormWrap, NullData } from "@/app/components"
import AddProductForm from "./AddProductForm"
import { getCurrentUser } from "@/actions/getCurrentUser"

const AddProducts = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser || currentUser.role !== "ADMIN") {
		return <NullData title="Oops! Access denied" />
	}

	return (
		<div className="p-8">
			<Container>
				<FormWrap>
					<AddProductForm />
				</FormWrap>
			</Container>
		</div>
	)
}

export default AddProducts
