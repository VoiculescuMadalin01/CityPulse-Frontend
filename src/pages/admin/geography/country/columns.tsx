import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ICountry } from "@/interfaces/country/country.interface"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"

export const columns: ColumnDef<ICountry, any>[] = [
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
		accessorKey: "name",
		header: "Name",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "phoneCode",
		header: "Phone Code",
		cell: (info) => `+${info.getValue()}`,
	},
	{
		accessorKey: "region",
		header: "Region",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "subregion",
		header: "Sub-region",
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
