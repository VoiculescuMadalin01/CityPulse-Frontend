import { useState } from "react"

export const useLocalUuid = () => {
	const [uuid, setUuid] = useState<string | null>(
		localStorage.getItem("uuid"),
	)

	const saveUuid = (newUuid: string) => {
		localStorage.setItem("uuid", newUuid)
		setUuid(newUuid)
	}

	const removeUuid = () => {
		localStorage.removeItem("uuid")
		setUuid(null)
	}

	return {
		uuid,
		saveUuid,
		removeUuid,
	}
}
