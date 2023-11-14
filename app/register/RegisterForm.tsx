"use client"

import Link from "next/link"
import { Button, Heading, Input } from "../components"
import { useState, FC, useEffect } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import { AiOutlineGoogle } from "react-icons/ai"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SafeUser } from "@/types"

interface RegisterFormProps {
	currentUser: SafeUser | null
}

const RegisterForm: FC<RegisterFormProps> = ({ currentUser }) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
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
		setIsLoading(true)
		axios
			.post("/api/register", data)
			.then(() => {
				toast.success("Account created")
				signIn("credentials", {
					email: data.email,
					password: data.password,
					redirect: false,
				}).then((callback) => {
					if (callback?.ok) {
						router.push("/cart")
						router.refresh()
						toast.success("Logged in")
					}
					if (callback?.error) {
						toast.error(callback.error)
					}
				})
			})
			.catch(() => toast.error("Something went wrong"))
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		if (currentUser) {
			router.push("/")
			router.refresh()
		}
	}, [currentUser, router])

	if (currentUser) {
		return <p className="text-center">Logged in. Redirecting...</p>
	}

	return (
		<>
			<Heading title="Sign up" />
			<Button
				outline
				label="Sign up with Google"
				icon={AiOutlineGoogle}
				onClick={() => {
					signIn("google")
				}}
			/>
			<hr className="bg-slate-300 w-full h-px" />
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				disabled={isLoading}
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
