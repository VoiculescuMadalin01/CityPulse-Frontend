import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useDeleteUsers = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (userData: string | string[]) => apiV1.delete("/users/delete", { data: userData }),
		onSuccess: () => {
			toast.success("Succes", { description: "Users succesfully deleted" })
			queryClient.invalidateQueries({ queryKey: ["all-users"] })
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
