import { IFacility } from "@/interfaces/facility/facility.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"

export const useGetAllFacility = () =>
	useQuery({
		queryKey: ["all-facility"],
		queryFn: async (): Promise<IFacility[]> => apiV1.get("/facility/getAll").then((res) => res.data),
		staleTime: Infinity,
		meta: {
			errorMessage: "Failed to fetch facility data",
		},
	})
