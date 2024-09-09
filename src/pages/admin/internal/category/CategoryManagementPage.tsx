import LoadingComponent from "@/components/Loading/LoadingComponent"
import React, { useState } from "react"
import { columns } from "./columns"
import { CustomTable } from "@/components/Table/CustomTable"
import { useGetAllCategories } from "@/hooks/queries/category/useGetAllCategories"
import { useDeleteCategory } from "@/hooks/queries/category/useDeleteCategory"
import { SortingState } from "@tanstack/react-table"
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb"
import { Label } from "@/components/ui/label"

export default function CategoriesManagementPage() {
	const { data, isLoading } = useGetAllCategories()
	const { mutate, isPending } = useDeleteCategory()

	const [columnVisibility] = useState({
		actions: true,
		uuid: true,
		name: true,
		type: true,
	})

	const [sorting] = useState<SortingState>([
		{
			id: "name",
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
				<Label className='font-bold text-foreground text-3xl'>Category</Label>
				<CustomBreadcrumb />
			</div>
			<CustomTable
				columns={columns}
				data={data || []}
				sort={sorting}
				addItemText={"Add Category"}
				addItemRoute={"/admin/internal/category/add"}
				visibilityColumns={columnVisibility}
				deleteMutate={mutate}
				deletePending={isPending}
			/>
		</div>
	)
}
