import { type ClassValue, clsx } from "clsx"
import { format, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Receive a dateTime string and convert it to dd-MMM-yyyy
 * @param dateString 	Ex: 2024-07-17T15:23:13.045Z
 * @returns dd-MMM-yyyy / 27-May-2024
 */
export function formatDateString(dateString: string): string | boolean {
	if (!dateString) {
		return false
	}
	const date = parseISO(dateString)
	return format(date, "dd-MMM-yyyy")
}

export function convertDateToIsoString(dateString: Date): string | undefined {
	if (!dateString) {
		return undefined
	}
	const date: Date = new Date(dateString)
	return date.toISOString()
}

export const emojiToHexEntities = (emoji: string) => {
	return Array.from(emoji)
		.map((char: string) => `&#x${char.codePointAt(0)!.toString(16).toUpperCase()};`)
		.join("")
}

export function blobToBase64(blob: Blob) {
	return new Promise((resolve) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result)
		reader.readAsDataURL(blob)
	})
}
