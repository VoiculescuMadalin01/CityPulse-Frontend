import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { IUser } from "@/interfaces/user/user.interface"
import { formatDateString } from "@/utils/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"

export const columns: ColumnDef<IUser, any>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		size: 20,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "firstName",
		header: "First Name",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "lastName",
		header: "Last Name",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "role",
		cell: (info) => info.getValue(),
		meta: {
			filterVariant: "select",
		},
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Role
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
	},
	{
		accessorKey: "emailConfirmedAt",
		header: "Confirmed At",
		cell: (info) => formatDateString(info.getValue()),
	},
	{
		accessorKey: "lastSignInAt",
		header: "Last Sign",
		cell: (info) => formatDateString(info.getValue()) || "Never",
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: (info) => formatDateString(info.getValue()),
	},
	{
		accessorKey: "updatedAt",
		header: "Updated At",
		cell: (info) => formatDateString(info.getValue()),
	},
	{
		accessorKey: "phone",
		header: "Phone",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "phoneConfirmedAt",
		header: "Phone Confirmed At",
		cell: (info) => formatDateString(info.getValue()),
	},
	{
		accessorKey: "bannedUntil",
		header: "Banned Until",
		cell: (info) => formatDateString(info.getValue()),
	},
	{
		accessorKey: "isSsoUser",
		header: "SSO User",
		cell: (info) => (info.getValue() ? "Yes" : "No"),
	},
	{
		id: "actions",
		header: () => (
			<div className='flex items-center justify-center'>
				<MoreHorizontal />
			</div>
		),
		size: 20,
		cell: (info) => {
			return (
				<div className='flex items-center justify-center'>
					<Link to={`/admin/management/users/edit/${info.row.original.uuid}`}>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Edit</span>
							<Edit className='h-4 w-4' />
						</Button>
					</Link>
				</div>
			)
		},
	},
]
