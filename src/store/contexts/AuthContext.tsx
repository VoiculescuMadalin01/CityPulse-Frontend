import { useAccessToken } from "@/hooks/useAuth"
import { useLocalUuid } from "@/hooks/useLocalUuid"
import { apiV1 } from "@/services/axiosConfig"
import { useQueryClient } from "@tanstack/react-query"
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react"

interface IAuthContext {
	children: ReactNode
}

interface IAuthContextProps {
	isAuth: boolean
	token: string | null
	userId: string | null
	// eslint-disable-next-line no-unused-vars
	setUser: (newToken: string, uuid: string) => void
	removeUser: () => void
}

const AuthContext = createContext<IAuthContextProps>({
	isAuth: false,
	token: null,
	userId: null,
	setUser: () => {},
	removeUser: () => {},
})

const AuthProvider = ({ children }: IAuthContext) => {
	const [isAuth, setIsAuth] = useState<boolean>(false)
	const queryClient = useQueryClient()

	const { token, saveToken, removeToken } = useAccessToken()
	const { uuid: userId, saveUuid, removeUuid } = useLocalUuid()
	// Function to set the authentication token
	const setUser = (newToken: string, newUuid: string) => {
		saveToken(newToken)
		saveUuid(newUuid)
		setIsAuth(true)
	}

	const removeUser = async () => {
		setIsAuth(false)
		queryClient.removeQueries({ queryKey: ["user"] })
		removeToken()
		removeUuid()
	}

	useEffect(() => {
		if (token && userId) {
			setIsAuth(true)
		}
	}, [])

	useEffect(() => {
		if (token && userId) {
			apiV1.defaults.headers.common["Authorization"] = "Bearer " + token
		} else {
			delete apiV1.defaults.headers.common["Authorization"]
			removeUser()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, userId])

	const contextValue = useMemo(
		() => ({
			isAuth,
			userId,
			token,
			setUser,
			removeUser,
		}),
		[isAuth, userId, token],
	)

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useSession = () => {
	return useContext(AuthContext)
}

export default AuthProvider
