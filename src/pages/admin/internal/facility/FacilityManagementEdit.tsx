import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TailSpin } from "react-loader-spinner"
import { useQueryClient } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import LoadingComponent from "@/components/Loading/LoadingComponent"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useGetFacilityById } from "@/hooks/queries/facility/useGetFacilityById"
import { useEditFacility } from "@/hooks/queries/facility/useEditFacility"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { IFacilitySchemaZod } from "@/interfaces/facility/facility.interface"

function FacilityManagementEdit() {
	const queryClient = useQueryClient()
	const { id } = useParams()
	const { data, isLoading } = useGetFacilityById(id)
	const [renderIcon, setRenderIcon] = useState<string>("")

	const form = useForm<z.infer<typeof IFacilitySchemaZod>>({
		resolver: zodResolver(IFacilitySchemaZod),
	})

	useEffect(() => {
		if (data) {
			form.reset({ ...data })
		}
	}, [data, form.reset])

	const { mutate, isPending } = useEditFacility(id)

	if (isLoading) {
		return (
			<div className='container flex items-center justify-center h-screen'>
				<LoadingComponent />
			</div>
		)
	}

	const onSubmit = (data: z.infer<typeof IFacilitySchemaZod>) => {
		queryClient.removeQueries({ queryKey: ["facility"] })
		const newData: z.infer<typeof IFacilitySchemaZod> = {
			...data,
			isEnable: data.isEnable === "1" ? true : false,
		}
		mutate(newData)
	}

	const displayData64Icon = () => {
		const iconAtob = atob(form.getValues("icon").replace("data:image/svg+xml;base64,", ""))
		setRenderIcon(iconAtob)
	}
	return (
		<div className='py-2'>
			<div className='flex justify-between'>
				<p className='font-bold text-foreground text-3xl'>Edit Facility</p>
			</div>
			<Separator className='my-4' />
			<Form {...form}>
				<form className='space-y-4 w-full lg:w-2/3' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage className='text-xs text-red-600 font-bold' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='isEnable'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Enable</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value === "1" || field.value === true ? "1" : "0"}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='0'>False</SelectItem>
											<SelectItem value='1'>True</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage className='text-xs text-red-600 font-bold' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='icon'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon Data64</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage className='text-xs text-red-600 font-bold' />
								</FormItem>
							)}
						/>
						<div className='flex flex-col'>
							<Label>Icon</Label>
							<div className='flex items-center mt-4'>
								<Button type='button' onClick={() => displayData64Icon()}>
									Display Icon
								</Button>
								<div className='flex items-center justify-around w-full'>
									<span
										className='flex justify-center'
										dangerouslySetInnerHTML={{ __html: renderIcon }}
									/>
									<Link to={"https://lucide.dev/icons/"}>Lucid Icons </Link>
								</div>
							</div>
						</div>
					</div>

					<div className='flex flex-col gap-4'>
						<Button type='submit' className='w-full'>
							{isPending ? (
								<div className='flex gap-4 items-center'>
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
								"Edit Facility"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default FacilityManagementEdit
