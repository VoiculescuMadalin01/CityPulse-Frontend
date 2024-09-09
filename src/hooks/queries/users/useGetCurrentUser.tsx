import { apiV1 } from "@/services/axiosConfig"
import { useQuery } from "@tanstack/react-query"

export const useGetCurrentUser = (isAuth: boolean) =>
	useQuery({
		queryKey: ["user"],
		queryFn: async () => apiV1.get(`/users/getCurrent`).then((res) => res.data),
		staleTime: Infinity,
		enabled: isAuth,
		meta: {
			errorMessage: "Failed to fetch user data",
		},
	})
