import { DefaultError } from "@tanstack/react-query"
import React from "react"

type IErrorComponent = {
	error: DefaultError
}
export const ErrorComponent = ({ error }: IErrorComponent) => {
	return (
		<div className='flex items-center justify-center flex-col gap-2'>
			<p className='font-bold'>WIP: {error.message}</p>
		</div>
	)
}
