import { toast } from "sonner"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useDeleteFacility = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (facilityData: string | string[]) => apiV1.delete(`/facility/delete`, { data: facilityData }),
		onSuccess: () => {
			toast.success("Success", { description: "Facility successfully deleted" })
			queryClient.invalidateQueries({ queryKey: ["all-facility"] })
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
