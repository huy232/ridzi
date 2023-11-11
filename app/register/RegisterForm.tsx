"use client"

import Link from "next/link"
import { Button, Heading, Input } from "../components"
import { useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import { AiOutlineGoogle } from "react-icons/ai"

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(true)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(false)
	}

	return (
		<>
			<Heading title="Sign up" />
			<Button
				outline
				label="Sign up with Google"
				icon={AiOutlineGoogle}
				onClick={() => {}}
			/>
			<hr className="bg-slate-300 w-full h-px" />
			<Input
				id="name"
				label="Name"
				disabled={!isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="email"
				label="Email"
				disabled={!isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				disabled={!isLoading}
				register={register}
				errors={errors}
				required
				type="password"
			/>
			<Button
				label={"Sign up"}
				onClick={handleSubmit(onSubmit)}
				loading={isLoading}
				disabled={isLoading}
			/>
			<p className="text-sm">
				Already have an account?{" "}
				<Link
					href={"/login"}
					className="font-semibold hover:opacity-70 duration-200 ease-in-out"
				>
					Log in
				</Link>
			</p>
		</>
	)
}

export default RegisterForm
