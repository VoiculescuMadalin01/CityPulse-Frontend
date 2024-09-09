import { IUserRole } from "../role/role.interface"
import * as zod from "zod"

export interface IAddUser {
	firstName: string
	lastName: string
	email: string
	role: IUserRole
	password: string
	confirmPassword: string
	phone: string
}

export const IAddUserSchemaZod = zod.object({
	firstName: zod.string(),
	lastName: zod.string(),
	email: zod.string().min(1, { message: "This fiels has to be filled" }).email("This may be not a valid email"),
	password: zod.string().min(8),
	phone: zod.string().optional(),
	role: zod.string().optional(),
})
