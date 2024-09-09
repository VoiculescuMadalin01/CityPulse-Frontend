import { IFacilitySchemaZod } from "@/interfaces/facility/facility.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
export const useAddNewFacility = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (facility: z.infer<typeof IFacilitySchemaZod>) =>
			apiV1.post("/facility/create", { ...facility }),
		onSuccess: () => {
			toast.success("Succes", { description: "Facility succesfully add" })
			queryClient.invalidateQueries({ queryKey: ["all-categories"] })
			navigate("/admin/internal/facility")
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
