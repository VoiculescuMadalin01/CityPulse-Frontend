import { z } from "zod"

export type ISubCategory = {
	uuid: string
	name: string
	description?: string
	isEnable: boolean
	categoryUuid: string
	category: { name: string }
}

export interface IUpdateSubCategory {
	name: string
	description?: string
	isEnable: boolean
	categoryUuid: string
}
export const ISubCategorySchemaZod = z.object({
	name: z.string(),
	description: z.string().optional(),
	isEnable: z.union([z.string(), z.boolean()]),
	categoryUuid: z.string(),
})
