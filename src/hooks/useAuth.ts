import { useState } from "react"

export const useAccessToken = () => {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("accessToken"),
	)

	const saveToken = (newToken: string) => {
		localStorage.setItem("accessToken", newToken)
		setToken(newToken)
	}

	const removeToken = () => {
		localStorage.removeItem("accessToken")
		setToken(null)
	}

	return {
		token,
		saveToken,
		removeToken,
	}
}
