import { Label } from "@/components/ui/label"
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb"
import { CustomTable } from "@/components/Table/CustomTable"
import { columns } from "./columns"
import { useGetAllSubCategories } from "@/hooks/queries/subcategory/useGetAllSubcategory"
import { useState } from "react"
import { SortingState } from "@tanstack/react-table"
import LoadingComponent from "@/components/Loading/LoadingComponent"
import { useDeleteSubCategory } from "@/hooks/queries/subcategory/useDeleteSubCategory"

function SubCategoryManagementPage() {
	const { data, isLoading } = useGetAllSubCategories()
	const [columnVisibility] = useState({ name: true })
	const { mutate, isPending } = useDeleteSubCategory()

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
				<Label className='font-bold text-foreground text-3xl'>Sub-Category</Label>
				<CustomBreadcrumb />
			</div>
			<CustomTable
				columns={columns}
				data={data || []}
				sort={sorting}
				addItemText={"Add Sub-Category"}
				addItemRoute={"/admin/internal/subCategory/add"}
				visibilityColumns={columnVisibility}
				deleteMutate={mutate}
				deletePending={isPending}
			/>
		</div>
	)
}

export default SubCategoryManagementPage
