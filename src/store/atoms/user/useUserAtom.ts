import { IUser } from "@/interfaces/user/user.interface"
import { atom } from "jotai"

export const connectedUserAtom = atom<IUser | null>(null)
