import { z } from "zod"

export type ICategory = {
	uuid: string
	name: string
	description?: string
	isEnable: boolean
}

export type IUpdateCategory = {
	name: string
	description?: string
	isEnable: boolean
}
export const ICategorySchemaZod = z.object({
	name: z.string(),
	description: z.string().optional(),
	isEnable: z.union([z.string(), z.boolean()]),
})
