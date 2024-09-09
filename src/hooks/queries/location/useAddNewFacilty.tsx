import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
export const useAddNewLocation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => apiV1.post("/location/createEmptyLocation"),
		onSuccess: () => {
			toast.success("Succes", { description: "Location succesfully created" })
			queryClient.invalidateQueries({ queryKey: ["all-locations"] })
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
