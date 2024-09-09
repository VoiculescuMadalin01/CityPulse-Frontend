import { Outlet } from "react-router-dom"
import { useSession } from "@/store/contexts/AuthContext"
import { useSetAtom } from "jotai"
import { connectedUserAtom } from "@/store/atoms/user/useUserAtom"
import { useEffect } from "react"
import LoadingComponent from "@/components/Loading/LoadingComponent"
import { ErrorComponent } from "@/components/Error/ErrorComponent"
import { useGetCurrentUser } from "@/hooks/queries/users/useGetCurrentUser"
import useGeolocation from "@/hooks/useGeolocation"
import { toast } from "sonner"
import { useLocalGeolocation } from "@/hooks/useLocalGeolocation"

export default function GlobalLayout() {
	const { isAuth } = useSession()
	const setUserAtom = useSetAtom(connectedUserAtom)

	const { saveGeolocation } = useLocalGeolocation()

	const {
		data: currentUser,
		isLoading: isCurrentUserLoading,
		isError: isCurrentUserError,
		error: currentUserError,
	} = useGetCurrentUser(isAuth)

	const { data: geoData, isError: isGeoError, error: geoError } = useGeolocation()

	useEffect(() => {
		if (geoData) {
			saveGeolocation(geoData)
			// toast.success("Location retrieved successfully!")
		}
	}, [geoData])

	useEffect(() => {
		if (currentUser) {
			setUserAtom(currentUser)
		}
	}, [currentUser])

	if (isCurrentUserError) {
		return (
			<div className='container flex items-center justify-center h-screen'>
				<ErrorComponent error={currentUserError} />
			</div>
		)
	}

	if (isCurrentUserLoading) {
		return (
			<div className='container flex items-center justify-center h-screen'>
				<LoadingComponent />
			</div>
		)
	}

	if (isGeoError) {
		toast.error(geoError)
	}

	return <Outlet />
}
