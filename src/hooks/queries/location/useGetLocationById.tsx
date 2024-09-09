import { IEditLocationSchemaZod } from "@/interfaces/location/location.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

export const useGetLocationById = (uuid: string | undefined) =>
	useQuery({
		queryKey: ["edit-location"],
		queryFn: async (): Promise<z.infer<typeof IEditLocationSchemaZod>> =>
			apiV1.get(`/location/getById/${uuid}`).then((res) => res.data),
		staleTime: 0,
		gcTime: 0,
		meta: {
			errorMessage: "Failed to fetch location data",
		},
	})
