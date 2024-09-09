import { IUserRole } from "../role/role.interface"

export type IUser = {
	uuid: string
	role: IUserRole
	email: string
	firstName: string
	lastName: string
	password: string
	emailConfirmedAt?: Date | null
	lastSignInAt?: Date | null
	rawAppMetaData?: any
	rawUserMetaData?: any
	createdAt?: Date
	updatedAt?: Date
	phone?: string | null
	phoneConfirmedAt?: Date | null
	bannedUntil?: Date | null
	isSsoUser?: boolean
	deletedAt?: Date | null
}
