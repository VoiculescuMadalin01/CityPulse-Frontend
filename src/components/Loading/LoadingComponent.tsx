import { useSpring, animated } from "@react-spring/web"
import React, { useState, useEffect } from "react"
import { Triangle } from "react-loader-spinner"

interface ILoadingComponent {
	firstMessage?: string
	secondMessage?: string
	thirdMessage?: string
}

const LoadingComponent: React.FC = ({
	firstMessage = "Loading ...",
	secondMessage = "Working on it!",
	thirdMessage = "Something is wrong :(",
}: ILoadingComponent) => {
	const [message, setMessage] = useState<string>(firstMessage)

	const [styles, api] = useSpring(() => ({
		opacity: 1,
		config: { duration: 500 },
	}))

	useEffect(() => {
		const firstTimeout = setTimeout(() => {
			setMessage(secondMessage)
			api.start({ opacity: 0 })
			setTimeout(() => api.start({ opacity: 1 }), 500)
		}, 3000)

		const secondTimeout = setTimeout(() => {
			setMessage(thirdMessage)
			api.start({ opacity: 0 })
			setTimeout(() => api.start({ opacity: 1 }), 500)
		}, 8000)

		return () => {
			clearTimeout(firstTimeout)
			clearTimeout(secondTimeout)
		}
	}, [api])

	return (
		<div className='flex items-center justify-center flex-col gap-2'>
			<Triangle visible={true} height='128' width='128' color='hsl(221.2 83.2% 53.3%)' />
			<animated.p className='font-bold animate-pulse' style={styles}>
				{message}
			</animated.p>
		</div>
	)
}

export default LoadingComponent
