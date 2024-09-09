import { apiV1 } from "@/services/axiosConfig"
import { blobToBase64 } from "@/utils/utils"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
export const useAddLocationProfilePhoto = (
	uuid: string | undefined,
	file: Blob | undefined,
	// eslint-disable-next-line no-unused-vars
	onImageSuccess: (data: string) => void,
) => {
	return useMutation({
		mutationFn: async () => {
			const formData: FormData = new FormData()
			formData.append("file", file as Blob)
			const base64 = await blobToBase64(file as Blob)
			const name = (file as File).name

			const response = await apiV1.post(`/location/edit/${uuid}/locationProfile`, { base64, name })
			return response.data
		},
		onSuccess: (data) => {
			onImageSuccess(data)
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
