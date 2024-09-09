import { ISubCategorySchemaZod } from "@/interfaces/subcategory/subcategory.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

export const useGetSubCategoryById = (uuid: string | undefined) =>
	useQuery({
		queryKey: ["edit-subCategoy"],
		queryFn: async (): Promise<z.infer<typeof ISubCategorySchemaZod>> =>
			apiV1.get(`/subcategory/getById/${uuid}`).then((res) => res.data),
		staleTime: 0,
		gcTime: 0,
		meta: {
			errorMessage: "Failed to fetch subcategory data",
		},
	})
