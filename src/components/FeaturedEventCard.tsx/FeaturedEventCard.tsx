import React from "react"

function FeaturedEventCard({ imageUrl, label }: { imageUrl: string; label: string }) {
	return (
		<>
			<img src={imageUrl} className='w-full h-full rounded-lg' />
			<div className='absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full font-bold'>
				{label}
			</div>
		</>
	)
}

export default FeaturedEventCard
