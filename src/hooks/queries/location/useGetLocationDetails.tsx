import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchLocationDetails = async (lat: number, lng: number) => {
	const response = await axios.get(
		`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
	)
	return response.data
}

export const useGetLocationDetails = (lat: number, lng: number) =>
	useQuery({
		queryKey: ["location-details", lat, lng],
		queryFn: () => fetchLocationDetails(lat, lng),
		staleTime: 0,
		gcTime: 0,
		meta: {
			errorMessage: "Failed to fetch location details",
		},
	})
