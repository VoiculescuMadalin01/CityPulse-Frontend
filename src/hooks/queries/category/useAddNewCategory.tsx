import { ICategorySchemaZod } from "@/interfaces/category/category.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
export const useAddNewCategory = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (categoryData: z.infer<typeof ICategorySchemaZod>) =>
			apiV1.post("/category/create", { ...categoryData }),
		onSuccess: () => {
			toast.success("Succes", { description: "Category succesfully add" })
			queryClient.invalidateQueries({ queryKey: ["all-categories"] })
			navigate("/admin/internal/category")
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
