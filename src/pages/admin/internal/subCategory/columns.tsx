import CustomBadge from "@/components/CustomBadge/CustomBadge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ISubCategory } from "@/interfaces/subcategory/subcategory.interface"

import { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"

export const columns: ColumnDef<ISubCategory, any>[] = [
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
		accessorKey: "category.name",
		header: "Category",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "isEnable",
		header: "Enable",
		cell: (info) => CustomBadge(info.getValue()),
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
					<Link to={`/admin/internal/subCategory/edit/${info.row.original.uuid}`}>
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
