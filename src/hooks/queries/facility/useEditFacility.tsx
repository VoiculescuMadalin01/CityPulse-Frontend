import { IFacilitySchemaZod } from "@/interfaces/facility/facility.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

export const useEditFacility = (uuid: string | undefined) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (facilityData: z.infer<typeof IFacilitySchemaZod>) =>
			apiV1.patch(`/facility/edit/${uuid}`, { ...facilityData }),
		onSuccess: () => {
			toast.success("Succes", { description: "Facility succesfully updated" })
			queryClient.invalidateQueries({ queryKey: ["all-facility"] })
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
