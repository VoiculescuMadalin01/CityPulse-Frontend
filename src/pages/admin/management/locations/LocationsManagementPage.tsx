import { Label } from "@/components/ui/label"
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb"
import { useEffect, useState } from "react"
import LoadingComponent from "@/components/Loading/LoadingComponent"
import { useGetAllLocations } from "@/hooks/queries/location/useGetAllLocations"
import { CustomTable } from "@/components/Table/CustomTable"
import { columns } from "./columns"
import { useDeleteLocation } from "@/hooks/queries/location/useDeleteLocation"
import { useAddNewLocation } from "@/hooks/queries/location/useAddNewFacilty"
import { useNavigate } from "react-router-dom"

function LocationsManagementPage() {
	const navigate = useNavigate()
	const { data, isLoading } = useGetAllLocations()
	const { mutate, isPending } = useDeleteLocation()

	const { data: newLocationData, mutate: addLocationMutate, isSuccess } = useAddNewLocation()

	const createLocationAndRedirect = () => addLocationMutate()
	useEffect(() => {
		if (newLocationData?.data && isSuccess) {
			navigate(`/admin/management/locations/edit/${newLocationData?.data.uuid}`)
		}
	}, [newLocationData, isSuccess])

	const [columnVisibility] = useState({
		name: true,
		description: true,
		address: true,
		latitude: false,
		longitude: false,
		createdAt: false,
		updatedAt: false,
		website: false,
	})

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
				<Label className='text-3xl font-bold text-foreground'>Locations</Label>
				<CustomBreadcrumb />
			</div>
			<CustomTable
				columns={columns}
				data={data || []}
				visibilityColumns={columnVisibility}
				addItemText={"Create Location"}
				addItemFunction={() => createLocationAndRedirect()}
				deleteMutate={mutate}
				deletePending={isPending}
			/>
		</div>
	)
}

export default LocationsManagementPage
