import LoadingComponent from "@/components/Loading/LoadingComponent"
import { columns } from "./columns"
import { CustomTable } from "@/components/Table/CustomTable"
import { useGetAllFacility } from "@/hooks/queries/facility/useGetAllFacility"
import { useDeleteFacility } from "@/hooks/queries/facility/useDeleteFacility"
import { SortingState } from "@tanstack/react-table"
import { useState } from "react"
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb"
import { Label } from "@/components/ui/label"

export default function FacilityManagementPage() {
	const { data, isLoading } = useGetAllFacility()
	const { mutate, isPending } = useDeleteFacility()

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
				<Label className='font-bold text-foreground text-3xl'>Facility</Label>
				<CustomBreadcrumb />
			</div>
			<CustomTable
				columns={columns}
				data={data || []}
				sort={sorting}
				addItemText={"Add Facility"}
				addItemRoute={"/admin/internal/facility/add"}
				deleteMutate={mutate}
				deletePending={isPending}
			/>
		</div>
	)
}
