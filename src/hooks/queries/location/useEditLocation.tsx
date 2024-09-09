import { IEditLocationSchemaZod } from "@/interfaces/location/location.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

export const useEditLocation = (uuid: string | undefined) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (userData: z.infer<typeof IEditLocationSchemaZod>) =>
			apiV1.patch(`/location/edit/${uuid}`, { ...userData }),
		onSuccess: () => {
			toast.success("Succes", { description: "Location succesfully updated" })
			queryClient.invalidateQueries({ queryKey: ["all-locations"] })
			navigate("/admin/management/locations")
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
