import { toast } from "sonner"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useDeleteCategory = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (categoryData: string | string[]) => apiV1.delete(`/category/delete`, { data: categoryData }),
		onSuccess: () => {
			toast.success("Success", { description: "Categories successfully deleted" })
			queryClient.invalidateQueries({ queryKey: ["all-categories"] })
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
