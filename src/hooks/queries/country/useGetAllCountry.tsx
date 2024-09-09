import { ICountry } from "@/interfaces/country/country.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCountry = () =>
	useQuery({
		queryKey: ["all-country"],
		queryFn: async (): Promise<ICountry[]> => apiV1.get(`/country/getAll`).then((res) => res.data),
		staleTime: Infinity,
		meta: {
			errorMessage: "Failed to fetch country data",
		},
	})
