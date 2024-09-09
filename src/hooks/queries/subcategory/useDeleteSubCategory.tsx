import { toast } from "sonner"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useDeleteSubCategory = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (subCategoryData: string | string[]) =>
			apiV1.delete(`/subcategory/delete`, { data: subCategoryData }),
		onSuccess: () => {
			toast.success("Success", { description: "Subcategories successfully deleted" })
			queryClient.invalidateQueries({ queryKey: ["all-subCategories"] })
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
