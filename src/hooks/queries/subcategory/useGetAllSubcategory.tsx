import { ISubCategory } from "@/interfaces/subcategory/subcategory.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"

export const useGetAllSubCategories = () =>
	useQuery({
		queryKey: ["all-subCategories"],
		queryFn: async (): Promise<ISubCategory[]> => apiV1.get("/subcategory/getAll").then((res) => res.data),
		staleTime: Infinity,
		meta: {
			errorMessage: "Failed to fetch subCategory data",
		},
	})
