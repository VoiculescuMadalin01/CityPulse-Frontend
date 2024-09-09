import { IEditUserSchemaZod } from "@/interfaces/user/edit-user.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

export const useGetUserById = (uuid: string | undefined) =>
	useQuery({
		queryKey: ["edit-user"],
		queryFn: async (): Promise<z.infer<typeof IEditUserSchemaZod>> =>
			apiV1.get(`/users/getById/${uuid}`).then((res) => res.data),
		staleTime: 0,
		gcTime: 0,
		meta: {
			errorMessage: "Failed to fetch user data",
		},
	})
