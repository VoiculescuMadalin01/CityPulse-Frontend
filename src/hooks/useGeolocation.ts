import { IGeolocation } from "@/interfaces/geolocation/geolocation.interface"
import { useState, useEffect } from "react"

type UseGeolocationResult = {
	data: IGeolocation | null
	isLoading: boolean
	isError: boolean
	error: string | null
}

const useGeolocation = (): UseGeolocationResult => {
	const [data, setData] = useState<IGeolocation | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser")
			setIsError(true)
			setIsLoading(false)
			return
		}

		const success = (position: GeolocationPosition) => {
			setData({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			})
			setIsLoading(false)
		}

		const error = () => {
			setError("Unable to retrieve user location")
			setIsError(true)
			setIsLoading(false)
		}

		navigator.geolocation.getCurrentPosition(success, error)
	}, [])

	return { data, isLoading, isError, error }
}

export default useGeolocation
