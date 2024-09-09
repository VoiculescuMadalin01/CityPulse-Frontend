import axios from "axios"

const basePath = import.meta.env.VITE_BACKEND_URL
const basePort = import.meta.env.VITE_BACKEND_PORT

if (!basePath || !basePort) {
	throw new Error(
		"BACKEND_URL and BACKEND_PORT must be set in the environment variables",
	)
}

const backendURL = `${basePath}:${basePort}`

export const apiV1 = axios.create({
	baseURL: backendURL,
})

apiV1.interceptors.request.use(async (request) => {
	const accessToken = localStorage.getItem("accessToken")

	if (accessToken) {
		request.headers.Authorization = `Bearer ${accessToken}`
		request.headers["Content-Type"] = "application/json; charset=utf-8"
	}
	return request
})
