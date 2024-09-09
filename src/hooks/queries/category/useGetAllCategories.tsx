import { ICategory } from "@/interfaces/category/category.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCategories = () =>
	useQuery({
		queryKey: ["all-categories"],
		queryFn: async (): Promise<ICategory[]> => apiV1.get("/category/getAll").then((res) => res.data),
		staleTime: Infinity,
		meta: {
			errorMessage: "Failed to fetch category data",
		},
	})
