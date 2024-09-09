import { z } from "zod"

export type IUserRole = "GUEST" | "USER" | "ORGANIZER" | "MODERATOR" | "ADMIN" | "SUPER_ADMIN"

export const IUserRoleSchema = z.enum(["GUEST", "USER", "ORGANIZER", "MODERATOR", "ADMIN", "SUPER_ADMIN"])

// eslint-disable-next-line no-unused-vars
export const roleDescriptions: { [key in IUserRole]: string } = {
	GUEST: "Guest User",
	USER: "Regular User",
	ORGANIZER: "Event Organizer",
	MODERATOR: "Community Moderator",
	ADMIN: "Administrator",
	SUPER_ADMIN: "Super Administrator",
}
// eslint-disable-next-line no-unused-vars
export const ROLE_HIERARCHY: { [key in IUserRole]: number } = {
	GUEST: 0,
	USER: 1,
	ORGANIZER: 2,
	MODERATOR: 3,
	ADMIN: 4,
	SUPER_ADMIN: 5,
}

export const ROLE_OPTION = [
	{ label: "Guest", value: "GUEST" },
	{ label: "User", value: "USER" },
	{ label: "Organizer", value: "ORGANIZER" },
	{ label: "Moderator", value: "MODERATOR" },
	{ label: "Admin", value: "ADMIN" },
	{ label: "Super Admin", value: "SUPER_ADMIN" },
]
