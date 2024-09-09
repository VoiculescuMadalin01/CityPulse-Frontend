import LoadingComponent from "@/components/Loading/LoadingComponent"
import React, { useState } from "react"
import { columns } from "./columns"
import { useGetAllCountry } from "@/hooks/queries/country/useGetAllCountry"
import { CustomTable } from "@/components/Table/CustomTable"
import { SortingState } from "@tanstack/react-table"
import { Label } from "@/components/ui/label"
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb"

function CountryManagementPage() {
	const { data, isLoading } = useGetAllCountry()

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
				<Label className='text-3xl font-bold text-foreground'>Country</Label>
				<CustomBreadcrumb />
			</div>
			<CustomTable columns={columns} data={data || []} sort={sorting} hasDeleteButton={false} />
		</div>
	)
}

export default CountryManagementPage
