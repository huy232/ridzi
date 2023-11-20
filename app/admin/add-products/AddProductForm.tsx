"use client"

import { CategoryInput, Heading, Input, TextArea } from "@/app/components"
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox"
import { categories } from "@/utils/Categories"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

const AddProductForm = () => {
	const [isLoading, setIsLoading] = useState(true)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			description: "",
			brand: "",
			category: "",
			inStock: false,
			images: [],
			price: "",
		},
	})

	const category = watch("category")
	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		})
	}
	return (
		<div>
			<Heading title="Add a product" center />
			<Input
				id="name"
				label="Name"
				disabled={!isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="price"
				label="Price"
				disabled={!isLoading}
				register={register}
				errors={errors}
				required
				type="number"
			/>
			<Input
				id="brand"
				label="Brand"
				disabled={!isLoading}
				register={register}
				errors={errors}
				required
			/>
			<TextArea
				id="description"
				label="Description"
				disabled={!isLoading}
				register={register}
				errors={errors}
				required
			/>
			<CustomCheckbox
				id="inStock"
				register={register}
				label="This product is in stock"
			/>
			<div className="w-full font-medium">
				<div className="mb-2 font-semibold">Select a category</div>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
					{categories.map((item) => {
						if (item.label === "All") {
							return null
						}
						return (
							<div key={item.label} className="col-span">
								<CategoryInput
									onClick={(category) => setCustomValue("category", category)}
									selected={category === item.label}
									label={item.label}
									icon={item.icon}
								/>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default AddProductForm
