import { ArrowRight, Star } from "lucide-react"
import React from "react"

interface ITopRatedEventCard {
	imageUrl: string
	title: string
	location: string
	price: number
	score: number
}

function TopRatedEventCard({ imageUrl, title, location, price, score }: ITopRatedEventCard) {
	const computePriceString = (price: number) => {
		if (price === 0) {
			return "Free"
		}
		return `from ${price}$/ticket`
	}

	return (
		<div className='relative flex-grow w-full overflow-hidden text-center shadow-xl rounded-3xl sm:w-60 md:w-60 hover:cursor-pointer group'>
			<div className='relative m-2'>
				<div className='w-full overflow-hidden rounded-3xl h-52'>
					<img
						src={imageUrl}
						className='w-full transition-transform duration-700 ease-in-out transform rounded-3xl h-52 group-hover:scale-110'
					/>
				</div>

				{/* Overlay */}
				<div className='absolute px-2 py-1 text-sm font-bold text-white bg-black bg-opacity-50 rounded-full top-2 left-2'>
					{score}
				</div>
				<div className='absolute px-2 py-1 text-sm font-bold text-white bg-black bg-opacity-50 rounded-full top-2 right-2'>
					<Star width={16} />
				</div>

				<div className='flex flex-col items-start gap-4 px-2 py-2'>
					<div className='flex flex-col items-start gap-0.5'>
						<p className='float-left text-base font-bold'>{title}</p>
						<p className='float-left text-sm opacity-65'>{location}</p>
					</div>
					<div className='flex items-center justify-between w-full'>
						<p className='float-left font-semibold'>{computePriceString(price)}</p>
						<ArrowRight width={20} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default TopRatedEventCard
