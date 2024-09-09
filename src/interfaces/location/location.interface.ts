import { z } from "zod"
import { IUser } from "../user/user.interface"

export type ILocation = {
	uuid: string // Unique identifier for the Location
	user_uuid: string // UUID of the associated User
	name: string
	description: string
	website?: string
	address: string // Address of the Location
	latitude: string // Latitude coordinate
	longitude: string // Longitude coordinate
	presentationImage: File | null // Optional presentation image URL
	locationImages: string[] // Array of URLs for location images
	cityId: string | null // Optional city ID, can be null or omitted
	stateId: string | null // Optional city ID, can be null or omitted
	countryId: string | null // Optional city ID, can be null or omitted
	total_likes: number // Total number of likes, default is 0
	total_dislike: number // Total number of dislikes, default is 0
	createdAt: Date // Timestamp of creation, default to current time
	updatedAt: Date
	user: IUser
}

export const IEditLocationSchemaZod = z.object({
	uuid: z.string(),
	user_uuid: z.string(),
	name: z.string(),
	description: z.string(),
	country: z.string().optional(),
	state: z.string().optional(),
	city: z.string().optional(),
	website: z.string().optional().nullable(),
	address: z.string(),
	latitude: z.string(),
	longitude: z.string(),
	presentationImage: z.any().nullable().optional(),
	locationImages: z.array(z.string()), // Array of base64 strings or URLs
	cityId: z.string().optional().nullable(),
	stateId: z.string().optional().nullable(),
	countryId: z.string().optional().nullable(),
	total_likes: z.number().min(0),
	total_dislike: z.number().min(0),
})
