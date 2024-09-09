import { apiV1 } from "@/services/axiosConfig"
import { blobToBase64 } from "@/utils/utils"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
export const useAddLocationPresentationPhotos = (
	uuid: string | undefined,
	file: Blob[],
	// eslint-disable-next-line no-unused-vars
	onImageSuccess: (data: string[]) => void,
) => {
	return useMutation({
		mutationFn: async () => {
			const formData = []

			// Append each image to the FormData object
			for (const img of file) {
				const base64 = await blobToBase64(img as Blob)
				const name = (img as File).name
				formData.push({ name: name, base64: base64 })
			}
			const response = await apiV1.post(`/location/edit/${uuid}/locationsImages`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})

			return response.data
		},
		onSuccess: (data: string[]) => {
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
