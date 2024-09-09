import { IGeolocation } from "@/interfaces/geolocation/geolocation.interface"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useGetUserCloseCity = () => {
	return useMutation({
		mutationFn: async (coords: IGeolocation | null) =>
			apiV1.post(`/geolocalization/findUserCloseCountry`, { ...coords }),
		onSuccess: () => {
			toast.success("Succes", { description: "Category succesfully updated" })
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
