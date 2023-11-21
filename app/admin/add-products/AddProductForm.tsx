"use client"

import {
	CategoryInput,
	Heading,
	Input,
	SelectColor,
	TextArea,
} from "@/app/components"
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox"
import { categories, colors } from "@/utils"
import { useState, useEffect, useCallback } from "react"
import { FieldValues, useForm } from "react-hook-form"

export type ImageType = {
	color: string
	colorCode: string
	image: File | null
}

export type UploadImageType = {
	color: string
	colorCode: string
	image: string
}

const AddProductForm = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [images, setImages] = useState<ImageType[] | null>()
	const [isProductCreated, setIsProductCreated] = useState(false)

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
	const setCustomValue = useCallback(
		(id: string, value: any) => {
			setValue(id, value, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			})
		},
		[setValue]
	)

	const addImageToState = useCallback((value: ImageType) => {
		setImages((prev) => {
			if (!prev) {
				return [value]
			}

			return [...prev, value]
		})
	}, [])
	const removeImageFromState = useCallback((value: ImageType) => {
		setImages((prev) => {
			if (prev) {
				const filteredImages = prev.filter((item) => item.color !== value.color)
				return filteredImages
			}
			return prev
		})
	}, [])

	useEffect(() => {
		setCustomValue("images", images)
	}, [images, setCustomValue])

	useEffect(() => {
		if (isProductCreated) {
			reset()
			setImages(null)
			setIsProductCreated(false)
		}
	}, [isProductCreated, reset])

	const category = watch("category")
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
			<div className="w-full flex flex-col flex-wrap gap-4">
				<div>
					<div className="font-bold">
						Select the available product colors and upload their images.
					</div>
					<div className="text-sm">
						You must upload an image for each of the color selected otherwise
						your color selection will be ignored.
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3">
					{colors.map((item, index) => {
						return (
							<SelectColor
								key={index}
								item={item}
								addImageToState={addImageToState}
								removeImageFromState={removeImageFromState}
								isProductCreated={isProductCreated}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default AddProductForm
