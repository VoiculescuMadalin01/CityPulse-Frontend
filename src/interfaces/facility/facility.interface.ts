import { z } from "zod"

export type IFacility = {
	uuid: string
	name: string
	isEnable: boolean
	icon: string | null
}

export type IUpdateFacility = {
	name: string
	isEnable: boolean
	icon: string
}
export const IFacilitySchemaZod = z.object({
	name: z.string(),
	isEnable: z.union([z.string(), z.boolean()]),
	icon: z.string(),
})
