import { IGeolocation } from "@/interfaces/geolocation/geolocation.interface"
import { useState } from "react"

export const useLocalGeolocation = () => {
	const storedGeolocation = localStorage.getItem("geolocation")
	const initialGeolocation = storedGeolocation ? JSON.parse(storedGeolocation) : null
	const [geolocation, setGeolocation] = useState<IGeolocation | null>(initialGeolocation)

	const saveGeolocation = (newGeolocation: IGeolocation) => {
		localStorage.setItem("geolocation", JSON.stringify(newGeolocation))
		setGeolocation(newGeolocation)
	}

	const removeGeolocation = () => {
		localStorage.removeItem("geolocation")
		setGeolocation(null)
	}

	return {
		geolocation,
		saveGeolocation,
		removeGeolocation,
	}
}
