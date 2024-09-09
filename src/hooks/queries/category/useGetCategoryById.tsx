import { ICategorySchemaZod } from "@/interfaces/category/category.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

export const useGetCategoryById = (uuid: string | undefined) =>
	useQuery({
		queryKey: ["edit-categoy"],
		queryFn: async (): Promise<z.infer<typeof ICategorySchemaZod>> =>
			apiV1.get(`/category/getById/${uuid}`).then((res) => res.data),
		staleTime: 0,
		gcTime: 0,
		meta: {
			errorMessage: "Failed to fetch user data",
		},
	})
