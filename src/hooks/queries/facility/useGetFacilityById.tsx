import { IFacilitySchemaZod } from "@/interfaces/facility/facility.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

export const useGetFacilityById = (uuid: string | undefined) =>
	useQuery({
		queryKey: ["edit-categoy"],
		queryFn: async (): Promise<z.infer<typeof IFacilitySchemaZod>> =>
			apiV1.get(`/facility/getById/${uuid}`).then((res) => res.data),
		staleTime: 0,
		gcTime: 0,
		meta: {
			errorMessage: "Failed to fetch facility data",
		},
	})
