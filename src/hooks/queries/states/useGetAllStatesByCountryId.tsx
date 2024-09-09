import { IState } from "@/interfaces/state/state.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"

export const useGetAllStatesByCountryId = (id: string | undefined) => {
	return useQuery({
		queryKey: [`all-states-by-country-id`],
		queryFn: async (): Promise<IState[]> => {
			if (!id) {
				return []
			}
			const response = await apiV1.get(`/state/getStatesByCountryId/${id}`)
			return response.data
		},
		staleTime: Infinity,
		enabled: !!id,
		meta: {
			errorMessage: "Failed to fetch states data",
		},
	})
}
