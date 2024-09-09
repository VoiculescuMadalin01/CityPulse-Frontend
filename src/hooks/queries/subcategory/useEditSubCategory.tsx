import { ISubCategorySchemaZod } from "@/interfaces/subcategory/subcategory.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

export const useEditSubCategory = (uuid: string | undefined) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (subCategoryData: z.infer<typeof ISubCategorySchemaZod>) =>
			apiV1.patch(`/subcategory/edit/${uuid}`, { ...subCategoryData }),
		onSuccess: () => {
			toast.success("Succes", { description: "SubCategory succesfully updated" })
			queryClient.invalidateQueries({ queryKey: ["all-subCategories"] })
			navigate("/admin/internal/subCategory")
		},
		onError: (err: AxiosError) => {
			const { error, message, statusCode } = err.response?.data as {
				error: string
				message: string
				statusCode: number
			}
			toast.error(`${statusCode} ${error}`, { description: message })
		},
	})
}
