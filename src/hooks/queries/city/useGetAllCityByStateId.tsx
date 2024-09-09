import { ICity } from "@/interfaces/city/city.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCityByStateId = (id: string | undefined) =>
	useQuery({
		queryKey: [`all-city-by-state-id`],
		queryFn: async (): Promise<ICity[]> => {
			if (!id) {
				return []
			}
			const response = await apiV1.get(`/city/getCityByStateId/${id}`)
			return response.data
		},
		staleTime: Infinity,
		enabled: !!id,
		meta: {
			errorMessage: "Failed to fetch city data",
		},
	})
