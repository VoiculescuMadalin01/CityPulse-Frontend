import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"

export const useGetAllUsers = () =>
	useQuery({
		queryKey: ["all-users"],
		queryFn: async () => apiV1.get(`/users/getAll`).then((res) => res.data),
		staleTime: Infinity,
		meta: {
			errorMessage: "Failed to fetch users data",
		},
	})
