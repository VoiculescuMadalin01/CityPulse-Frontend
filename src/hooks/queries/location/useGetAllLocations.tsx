import { ILocation } from "@/interfaces/location/location.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"

export const useGetAllLocations = () =>
	useQuery({
		queryKey: ["all-locations"],
		queryFn: async (): Promise<ILocation[]> => apiV1.get("/location/getAll").then((res) => res.data),
		staleTime: Infinity,
		meta: {
			errorMessage: "Failed to fetch locations data",
		},
	})
