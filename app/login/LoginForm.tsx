"use client"

import Link from "next/link"
import { Button, Heading, Input } from "../components"
import { useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import { AiOutlineGoogle } from "react-icons/ai"

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(true)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(false)
	}

	return (
		<>
			<Heading title="Sign in" />
			<Button
				outline
				label="Continue with Google"
				icon={AiOutlineGoogle}
				onClick={() => {}}
			/>
			<hr className="bg-slate-300 w-full h-px" />
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
				label={"Sign in"}
				onClick={handleSubmit(onSubmit)}
				loading={isLoading}
				disabled={isLoading}
			/>
			<p className="text-sm">
				Do not have an account?
				<Link
					href={"/register"}
					className="font-semibold hover:opacity-70 duration-200 ease-in-out"
				>
					Sign up
				</Link>
			</p>
		</>
	)
}

export default LoginForm
