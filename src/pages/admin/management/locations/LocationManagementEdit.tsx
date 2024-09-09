import { ErrorComponent } from "@/components/Error/ErrorComponent"
import MultipleImageUploader from "@/components/ImageUploader/MultipleImageUpload"
import SingleImageUpload from "@/components/ImageUploader/SingleImageUpload"
import LeafletMap from "@/components/LeafletMap/LeafletMap"
import LoadingComponent from "@/components/Loading/LoadingComponent"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useGetAllCityByStateId } from "@/hooks/queries/city/useGetAllCityByStateId"
import { useGetAllCountry } from "@/hooks/queries/country/useGetAllCountry"
import { useAddLocationProfilePhoto } from "@/hooks/queries/location/useAddLocationProfilePhoto"
import { useDeleteLocationProfilePhoto } from "@/hooks/queries/location/useDeleteLocationProfilePhoto"
import { useEditLocation } from "@/hooks/queries/location/useEditLocation"
import { useGetLocationById } from "@/hooks/queries/location/useGetLocationById"
import { useGetLocationDetails } from "@/hooks/queries/location/useGetLocationDetails"
import { useGetAllStatesByCountryId } from "@/hooks/queries/states/useGetAllStatesByCountryId"
import { ICountry } from "@/interfaces/country/country.interface"
import { IEditLocationSchemaZod } from "@/interfaces/location/location.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { LatLng, LatLngExpression } from "leaflet"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { TailSpin } from "react-loader-spinner"
import { useParams } from "react-router-dom"
import { z } from "zod"
import { useAddLocationPresentationPhotos } from "../../../../hooks/queries/location/useAddLocationPresentationPhotos"
import { useDeleteLocationPresentationPhotos } from "@/hooks/queries/location/useDeleteLocationPresentationPhotos"
import { IState } from "@/interfaces/state/state.interface"
import { ICity } from "@/interfaces/city/city.interface"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { InfoIcon } from "lucide-react"

function LocationManagementEdit() {
	const queryClient = useQueryClient()
	const { id } = useParams()
	const [selectedCountryId, setSelectedCountryId] = useState<string | undefined>()
	const [selectedStateId, setSelectedStateId] = useState<string | undefined>()
	const [selectedCityId, setSelectedCityId] = useState<string | undefined>()
	const [leafletLatLng, setLeafletLatLng] = useState<LatLngExpression>([0, 0])
	const [leafletZoom, setLeafletZoom] = useState<number>(10)
	const [markerPosition, setMarkerPosition] = useState<[lat: number, lng: number]>([0, 0])

	const { data, isLoading } = useGetLocationById(id)
	const { data: countryData, isError: isCountryError } = useGetAllCountry()
	const { data: stateData, refetch: refetchState } = useGetAllStatesByCountryId(selectedCountryId)
	const { data: cityData, refetch: refetchCity } = useGetAllCityByStateId(selectedStateId)
	const { data: markerDetails, error: markerError } = useGetLocationDetails(
		markerPosition[0] ?? 0,
		markerPosition[1] ?? 0,
	)

	const form = useForm<z.infer<typeof IEditLocationSchemaZod>>({
		resolver: zodResolver(IEditLocationSchemaZod),
	})
	const {
		formState: { errors },
		resetField,
		clearErrors,
		setValue,
	} = form

	// #region Profile

	const [profileFileRef, setProfileFileRef] = useState<Blob | undefined>()
	const [profileFileUrl, setProfileFileUrl] = useState<string>("")

	const onImageSuccess = (imageUrl: string) => {
		setValue("presentationImage", imageUrl)
		setProfileFileUrl(imageUrl)
	}

	const onProfileDeleteSuccess = () => {
		setValue("presentationImage", "")
	}

	const { mutate: addLocationProfilePhoto, isPending: isLocationProfilePending } = useAddLocationProfilePhoto(
		data?.uuid,
		profileFileRef,
		onImageSuccess,
	)
	const { mutate: deleteLocationProfilePhoto } = useDeleteLocationProfilePhoto(data?.uuid, onProfileDeleteSuccess)

	const removeProfileImage = () => {
		deleteLocationProfilePhoto()
		setProfileFileUrl("")
		setValue("presentationImage", "")
	}

	// #endregion Profile

	// #region Presentation
	const [presentationFilesRef, setPresentationFilesRef] = useState<Blob[]>([])
	const [presentationFilesUrl, setPresentationFilesUrl] = useState<string[]>([])

	const onPresentationDeleteSuccess = () => {
		setValue("locationImages", [])
	}

	const onImagesSuccess = (imageUrl: string[]) => {
		setPresentationFilesUrl(imageUrl)
		setValue("locationImages", imageUrl)
	}

	const { mutate: addLocationPresentaionPhoto, isPending: isLocationPresentationPending } =
		useAddLocationPresentationPhotos(data?.uuid, presentationFilesRef, onImagesSuccess)

	const { mutate: deleteLocationPresentationPhotos } = useDeleteLocationPresentationPhotos(
		data?.uuid,
		onPresentationDeleteSuccess,
	)

	const removePresentationImage = (fileName: string, updatedPreviews: string[]) => {
		deleteLocationPresentationPhotos(fileName)
		setPresentationFilesUrl(updatedPreviews)
		setValue("locationImages", updatedPreviews)
	}
	// #endregion Presentation

	useEffect(() => {
		if (data) {
			form.reset({ ...data })
			setLeafletLatLng([+data.latitude, +data.longitude])
			setMarkerPosition([+data.latitude, +data.longitude])
			setLeafletZoom(15)
			setProfileFileUrl(data.presentationImage)
			setPresentationFilesUrl(data.locationImages)
		}
	}, [data])

	useEffect(() => {
		if (selectedCountryId) {
			refetchState()
			setSelectedStateId(undefined)
			resetField("state")
			resetField("city")
			clearErrors("state")
			clearErrors("city")
		}
	}, [selectedCountryId])

	useEffect(() => {
		if (selectedStateId) {
			refetchCity()
			const findState = stateData?.find((state) => state.uuid === selectedStateId)
			const { latitude, longitude } = findState || { latitude: 0, longitude: 0 }
			setLeafletLatLng([latitude, longitude])
			setLeafletZoom(10)
		} else {
			setSelectedStateId(undefined)
			resetField("city")
			clearErrors("city")
		}
	}, [selectedStateId])

	useEffect(() => {
		if (!selectedCityId) {
			return
		}
		const findCIty = cityData?.find((city) => city.uuid === selectedCityId)
		const { latitude, longitude } = findCIty || { latitude: 0, longitude: 0 }
		setLeafletLatLng([latitude, longitude])
		setLeafletZoom(17)
	}, [selectedCityId])

	useEffect(() => {
		if (!markerDetails) return
		const { address } = markerDetails
		const { city, country, county, postcode, road } = address || {}
		const joinNonEmpty = (...values: (string | undefined)[]): string => {
			return values.filter(Boolean).join(", ")
		}
		const computedLocation = joinNonEmpty(road, postcode, city, county, country)
		setValue("address", computedLocation)
	}, [markerDetails])

	useEffect(() => {
		addLocationProfilePhoto()
	}, [profileFileRef])

	useEffect(() => {
		if (presentationFilesRef.length === 0) return
		addLocationPresentaionPhoto()
	}, [presentationFilesRef])

	const { mutate, isPending } = useEditLocation(id)

	if (isLoading) {
		return (
			<div className='container flex items-center justify-center h-screen'>
				<LoadingComponent />
			</div>
		)
	}

	if (markerError) {
		return <ErrorComponent error={markerDetails} />
	}

	const onMarkerSelection = async (latlng: LatLng) => {
		setValue("latitude", String(latlng.lat))
		setValue("longitude", String(latlng.lng))
		setMarkerPosition([latlng.lat, latlng.lng])
	}

	const onSubmit = (data: z.infer<typeof IEditLocationSchemaZod>) => {
		queryClient.removeQueries({ queryKey: ["user"] })
		const newData: z.infer<typeof IEditLocationSchemaZod> = {
			...data,
			cityId: data.city,
			stateId: data.state,
			countryId: data.country,
		}
		// console.log(newData)
		mutate(newData)
	}

	return (
		<ScrollArea className='relative h-full overflow-y-auto'>
			<ScrollBar orientation='vertical' />
			<div className='relative h-full pt-2 overflow-y-auto'>
				<div className='flex justify-between'>
					<p className='text-3xl font-bold text-foreground'>Edit Location</p>
				</div>
				<Separator className='my-4' />
				<Form {...form}>
					<form className='w-full h-full space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-2 gap-2'>
							<div className='grid col-span-1 gap-6'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Location Name</FormLabel>
											<FormControl>
												<Input {...field} value={field.value ?? ""} />
											</FormControl>
											<FormMessage className='text-xs font-bold text-red-600' />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Input {...field} value={field.value ?? ""} />
											</FormControl>
											<FormMessage className='text-xs font-bold text-red-600' />
										</FormItem>
									)}
								/>
								<div className='flex justify-between gap-4'>
									<div className='w-full'>
										<Label htmlFor='searchCountry'>Country</Label>
										<Controller
											name='country'
											control={form.control}
											render={({ field }) => (
												<Select
													onValueChange={(value) => {
														field.onChange(value)
														setSelectedCountryId(value)
													}}
													value={field.value}
												>
													<SelectTrigger id='searchCountry' className='w-full'>
														<SelectValue placeholder='Select a country' />
													</SelectTrigger>
													<SelectContent>
														{countryData?.map((country: ICountry) => (
															<SelectItem key={country.iso3} value={country.uuid}>
																{country.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
										<p className='text-xs font-bold text-red-600'>{errors.country?.message}</p>
									</div>
									<div className='w-full'>
										<Label htmlFor='searchState'>State</Label>
										<Controller
											name='state'
											control={form.control}
											render={({ field }) => (
												<Select
													onValueChange={(value) => {
														field.onChange(value)
														setSelectedStateId(value)
													}}
													value={field.value}
													disabled={!selectedCountryId || isCountryError}
												>
													<SelectTrigger id='searchState' className='w-full'>
														<SelectValue placeholder='Select a state/district' />
													</SelectTrigger>
													<SelectContent>
														{stateData?.map((state: IState) => (
															<SelectItem key={state.uuid} value={state.uuid}>
																{state.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
										<p className='text-xs font-bold text-red-600'>{errors.state?.message}</p>
									</div>
									<div className='w-full'>
										<Label htmlFor='searchCity'>City</Label>
										<Controller
											name='city'
											control={form.control}
											render={({ field }) => (
												<Select
													onValueChange={(value) => {
														field.onChange(value)
														setSelectedCityId(value)
													}}
													value={field.value}
													disabled={selectedStateId === undefined || cityData?.length === 0}
												>
													<SelectTrigger id='searchCity' className='w-full'>
														<SelectValue placeholder='Select a city' />
													</SelectTrigger>
													<SelectContent>
														{cityData?.map((city: ICity) => (
															<SelectItem key={city.uuid} value={city.uuid}>
																{city.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
										<p className='text-xs font-bold text-red-600'>{errors.city?.message}</p>
									</div>
								</div>
								<div className='flex gap-4'>
									<FormField
										control={form.control}
										name='latitude'
										render={({ field }) => (
											<FormItem className='w-full'>
												<FormLabel>Latitude</FormLabel>
												<FormControl>
													<Input {...field} disabled value={field.value ?? ""} />
												</FormControl>
												<FormMessage className='text-xs font-bold text-red-600' />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='longitude'
										render={({ field }) => (
											<FormItem className='w-full'>
												<FormLabel>Longitude</FormLabel>
												<FormControl>
													<Input {...field} disabled value={field.value ?? ""} />
												</FormControl>
												<FormMessage className='text-xs font-bold text-red-600' />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name='address'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Full Address</FormLabel>
											<FormControl>
												<Input {...field} disabled value={field.value ?? ""} />
											</FormControl>
											<FormMessage className='text-xs font-bold text-red-600' />
										</FormItem>
									)}
								/>
							</div>
							<LeafletMap
								markerLatLng={markerPosition}
								center={leafletLatLng}
								leafletZoom={leafletZoom}
								onMarkerSelection={onMarkerSelection}
							/>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='website'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website URL</FormLabel>
										<FormControl>
											<Input {...field} value={field.value ?? ""} />
										</FormControl>
										<FormMessage className='text-xs font-bold text-red-600' />
									</FormItem>
								)}
							/>
						</div>

						<div className='flex items-start gap-4'>
							<FormItem>
								<FormLabel>Location Profile Image</FormLabel>
								<FormControl>
									<SingleImageUpload
										imagePreviewUrl={profileFileUrl}
										onFilesSelected={(value) => {
											setProfileFileRef(value)
										}}
										onRemove={() => removeProfileImage()}
									/>
								</FormControl>
								<FormMessage className='text-xs font-bold text-red-600' />
							</FormItem>
							<FormItem>
								<FormLabel className='flex items-center justify-between w-full'>
									<Label>Locations Image</Label>
									<HoverCard>
										<HoverCardTrigger className='flex items-center gap-2'>
											<Label>Info</Label>
											<InfoIcon width={16} />
										</HoverCardTrigger>
										<HoverCardContent>
											Import all files at once. Re-imported files will overwrite existing images.
											Maximum 12 images.
										</HoverCardContent>
									</HoverCard>
								</FormLabel>
								<FormControl>
									<MultipleImageUploader
										imagesPreviewUrl={presentationFilesUrl}
										onFilesSelected={(value) => {
											setPresentationFilesRef(value)
										}}
										onRemove={(fileName: string, updatedPreviews: string[]) =>
											removePresentationImage(fileName, updatedPreviews)
										}
									/>
								</FormControl>
								<FormMessage className='text-xs font-bold text-red-600' />
							</FormItem>
						</div>
						<div className='flex flex-col gap-4 pb-10'>
							<Button
								type='submit'
								className='w-full'
								disabled={isPending || isLocationProfilePending || isLocationPresentationPending}
							>
								{isPending ? (
									<div className='flex items-center gap-4'>
										<TailSpin
											visible={true}
											height='16'
											width='16'
											radius='2'
											color='#fff'
											ariaLabel='oval-loading'
										/>
										<p>Loading</p>
									</div>
								) : (
									"Update location..."
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</ScrollArea>
	)
}

export default LocationManagementEdit
