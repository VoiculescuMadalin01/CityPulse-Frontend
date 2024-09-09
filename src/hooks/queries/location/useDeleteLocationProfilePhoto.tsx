import { apiV1 } from "@/services/axiosConfig"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
// eslint-disable-next-line no-unused-vars
export const useDeleteLocationProfilePhoto = (uuid: string | undefined, onDeleteSuccess: (data: string) => void) => {
	return useMutation({
		mutationFn: async () => apiV1.post(`/location/delete/${uuid}/locationProfile`),
		onSuccess: (data) => {
			onDeleteSuccess(data)
			toast.success("Success", { description: "Location profile photo successfully updated" })
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
