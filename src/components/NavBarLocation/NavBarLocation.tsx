import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MapPinIcon, ChevronDownIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select"
import { useGetAllStatesByCountryId } from "@/hooks/queries/states/useGetAllStatesByCountryId"
import { useGetAllCountry } from "@/hooks/queries/country/useGetAllCountry"
import { ICountry } from "@/interfaces/country/country.interface"
import { useGetAllCityByStateId } from "@/hooks/queries/city/useGetAllCityByStateId"

const schema = z.object({
	country: z.string(),
	state: z.string(),
	city: z.string().optional(),
})

type FormData = z.infer<typeof schema>

function NavBarLocation() {
	const [selectedCountryId, setSelectedCountryId] = useState<string | undefined>()
	const [selectedStateId, setSelectedStateId] = useState<string | undefined>()

	const { data: countryData, isError: isCountryError } = useGetAllCountry()
	const { data: stateData, refetch: refetchState } = useGetAllStatesByCountryId(selectedCountryId)
	const { data: cityData, refetch: refetchCity } = useGetAllCityByStateId(selectedStateId)

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
		resetField,
		clearErrors,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	})

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
		} else {
			setSelectedStateId(undefined)
			resetField("city")
			clearErrors("city")
		}
	}, [selectedStateId])

	const onSubmit = (data: FormData) => {
		if (cityData?.length && !data.city) {
			setError("city", {
				message: "City is required for the selected state",
				type: "error",
			})
			return
		}
	}

	return (
		<div className='relative flex justify-center flex-1 w-full'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='flex items-center gap-2 rounded'>
						<MapPinIcon className='hidden w-5 h-5 md:block' />
						<span className='font-medium '>Campulung, RO</span>
						<ChevronDownIcon className='hidden w-4 h-4 md:block' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='center' className='w-[400px] p-4 space-y-4 bg-card'>
					<div className='w-full text-center'>
						<Label className='text-base'>Tell us where you are now!</Label>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='searchCountry'>Country</Label>
							<Controller
								name='country'
								control={control}
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
						<div className='space-y-2'>
							<Label htmlFor='searchState'>State</Label>
							<Controller
								name='state'
								control={control}
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
											{stateData?.map((state: any) => (
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

						<div className='space-y-2'>
							<Label htmlFor='searchCity'>City</Label>
							<Controller
								name='city'
								control={control}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={selectedStateId === undefined || cityData?.length === 0}
									>
										<SelectTrigger id='searchCity' className='w-full'>
											<SelectValue placeholder='Select a city' />
										</SelectTrigger>
										<SelectContent>
											{cityData?.map((city: any) => (
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
						<Button type='submit' className='float-right w-fit'>
							Save & Search
						</Button>
					</form>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default NavBarLocation
