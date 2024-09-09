import { IUserRole, IUserRoleSchema } from "../role/role.interface"
import { z } from "zod"

export type IEditUser = {
	uuid: string
	role: IUserRole
	email: string
	firstName: string
	lastName: string
	emailConfirmedAt?: string | null
	lastSignInAt?: string | null
	rawAppMetaData?: any
	rawUserMetaData?: any
	createdAt?: string
	updatedAt?: string
	phone?: string | null
	phoneConfirmedAt?: string | null
	bannedUntil?: string | null
	isSsoUser?: boolean
	deletedAt?: string | null
}

export const IEditUserSchemaZod = z.object({
	role: IUserRoleSchema,
	email: z.string().min(1, { message: "This field has to be filled" }).email("This may not be a valid email"),
	firstName: z.string(),
	lastName: z.string(),
	emailConfirmedAt: z.string().optional().nullable(),
	lastSignInAt: z.string().optional().nullable(),
	rawAppMetaData: z.any().optional(), // If you need to specify the structure of this, update accordingly
	rawUserMetaData: z.any().optional(), // If you need to specify the structure of this, update accordingly
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
	phone: z.string().nullable().optional(),
	phoneConfirmedAt: z.string().optional().nullable(),
	bannedUntil: z.union([z.string(), z.date()]).optional().nullable(),
	isSsoUser: z.boolean().optional(),
	deletedAt: z.string().optional().nullable(),
})
