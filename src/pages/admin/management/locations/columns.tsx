import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ILocation } from "@/interfaces/location/location.interface"
import { formatDateString } from "@/utils/utils"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"

export const columns: ColumnDef<ILocation, any>[] = [
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
				key={row.original.uuid}
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
		accessorKey: "name",
		header: "Name",
		size: 120,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "address",
		header: "Address",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "latitude",
		header: "Latitude",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "longitude",
		header: "Longitude",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "website",
		header: "Website",
		cell: (info) => formatDateString(info.getValue()),
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
		accessorKey: "total_dislike",
		header: "Dislikes",
		size: 10,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "total_likes",
		header: "Likes",
		size: 10,
		cell: (info) => info.getValue(),
	},
	{
		id: "owner",
		header: "Owner",
		size: 80,
		accessorFn: (row) => `${row.user.firstName} ${row.user.lastName}`,
		cell: (info) => info.getValue(),
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
					<Link to={`/admin/management/locations/edit/${info.row.original.uuid}`}>
						<Button variant='ghost' className='w-8 h-8 p-0'>
							<span className='sr-only'>Edit</span>
							<Edit className='w-4 h-4' />
						</Button>
					</Link>
				</div>
			)
		},
	},
]
