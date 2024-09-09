import LoadingComponent from "@/components/Loading/LoadingComponent"
import { useGetAllUsers } from "@/hooks/queries/users/useGetAllUsers"
import { useState } from "react"
import { columns } from "./columns"
import { CustomTable } from "@/components/Table/CustomTable"
import { useDeleteUsers } from "@/hooks/queries/users/useDeleteUsers"
import { SortingState } from "@tanstack/react-table"
import { Label } from "@/components/ui/label"
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb"

function UsersManagementPage() {
	const { data, isLoading } = useGetAllUsers()
	const { mutate, isPending } = useDeleteUsers()

	const [columnVisibility] = useState({
		actions: true,
		firstName: true,
		lastName: true,
		role: true,
		email: true,
		emailConfirmedAt: true,
		lastSignInAt: false,
		createdAt: false,
		updatedAt: false,
		phone: false,
		phoneConfirmedAt: false,
		bannedUntil: false,
		isSsoUser: false,
	})

	const [sorting] = useState<SortingState>([
		{
			id: "email",
			desc: false,
		},
	])

	if (isLoading) {
		return (
			<div className='container flex items-center justify-center h-screen'>
				<LoadingComponent />
			</div>
		)
	}

	return (
		<div>
			<div className='space-y-2'>
				<Label className='font-bold text-foreground text-3xl'>Users</Label>
				<CustomBreadcrumb />
			</div>
			<CustomTable
				columns={columns}
				data={data}
				sort={sorting}
				addItemText={"Add User"}
				addItemRoute={"/admin/management/users/add"}
				visibilityColumns={columnVisibility}
				deleteMutate={mutate}
				deletePending={isPending}
			/>
		</div>
	)
}

export default UsersManagementPage
