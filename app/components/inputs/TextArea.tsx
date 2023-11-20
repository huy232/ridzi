"use client"

import clsx from "clsx"
import { FC } from "react"
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"

interface TextAreaProps {
	id: string
	label: string
	disabled?: boolean
	required?: boolean
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
}

const TextArea: FC<TextAreaProps> = ({
	id,
	label,
	disabled,
	required,
	register,
	errors,
}) => {
	const inputClass = clsx(
		`peer w-full p-4 pt-6 max-h-[150px] min-h-[150px] outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed`,
		errors[id] ? "border-rose-400" : "border-slate-300",
		errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"
	)

	const labelClass = clsx(
		`absolute cursor-text text-md duration-200 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`,
		errors[id] ? "text-rose-500" : "text-slate-400"
	)

	return (
		<div className="w-full relative">
			<textarea
				className={inputClass}
				id={id}
				disabled={disabled}
				placeholder=""
				{...register(id, { required })}
			/>
			<label htmlFor={id} className={labelClass}>
				{label}
			</label>
		</div>
	)
}

export default TextArea
