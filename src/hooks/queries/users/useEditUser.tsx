import { IEditUserSchemaZod } from "@/interfaces/user/edit-user.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

export const useEditUser = (uuid: string | undefined) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (userData: z.infer<typeof IEditUserSchemaZod>) =>
			apiV1.patch(`/users/edit/${uuid}`, { ...userData }),
		onSuccess: () => {
			toast.success("Succes", { description: "User succesfully updated" })
			queryClient.invalidateQueries({ queryKey: ["all-users"] })
			navigate("/admin/management/users")
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
