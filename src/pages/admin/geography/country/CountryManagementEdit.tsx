import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { TailSpin } from "react-loader-spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ROLE_OPTION } from "@/interfaces/role/role.interface"
import { useQueryClient } from "@tanstack/react-query"
import { IEditUserSchemaZod } from "@/interfaces/user/edit-user.interface"
import { useGetUserById } from "@/hooks/queries/users/useGetUserById"
import { useParams } from "react-router-dom"
import { useEditUser } from "@/hooks/queries/users/useEditUser"
import LoadingComponent from "@/components/Loading/LoadingComponent"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { convertDateToIsoString } from "@/utils/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

function UserManagementEdit() {
	const queryClient = useQueryClient()
	const { id } = useParams()
	const { data, isLoading } = useGetUserById(id)

	const form = useForm<z.infer<typeof IEditUserSchemaZod>>({
		resolver: zodResolver(IEditUserSchemaZod),
	})

	useEffect(() => {
		if (data) {
			form.reset({ ...data })
		}
	}, [data, form.reset])

	const { mutate, isPending } = useEditUser(id)

	if (isLoading) {
		return (
			<div className='container flex items-center justify-center h-screen'>
				<LoadingComponent />
			</div>
		)
	}

	const onSubmit = (data: z.infer<typeof IEditUserSchemaZod>) => {
		queryClient.removeQueries({ queryKey: ["user"] })
		const newData: z.infer<typeof IEditUserSchemaZod> = {
			...data,
			bannedUntil: convertDateToIsoString(data.bannedUntil as Date),
		}
		mutate(newData)
	}
	return (
		<div className='py-2'>
			<div className='flex justify-between'>
				<p className='font-bold text-foreground text-3xl'>Edit User</p>
			</div>
			<Separator className='my-4' />
			<Form {...form}>
				<form className='space-y-4 w-full' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Firstname</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage className='text-xs text-red-600 font-bold' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lastname</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage className='text-xs text-red-600 font-bold' />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage className='text-xs text-red-600 font-bold' />
								</FormItem>
							)}
						/>
						<div className='space-y-2'>
							<FormField
								control={form.control}
								name='emailConfirmedAt'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel htmlFor='emailConfirmedAt'>Email confirmed</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={field.value ? format(field.value, "PPP") : "Not confirmed"}
													disabled
													className={"w-full pl-3 text-left font-normal"}
												></Input>
											</FormControl>
											<FormMessage className='text-xs text-red-600 font-bold' />
										</FormItem>
									)
								}}
							/>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input {...field} value={field.value ?? ""} />
									</FormControl>
									<FormMessage className='text-xs text-red-600 font-bold' />
								</FormItem>
							)}
						/>
						<div className='space-y-2'>
							<FormField
								control={form.control}
								name='phoneConfirmedAt'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel htmlFor='phoneConfirmedAt'>Phone confirmed</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={field.value ? format(field.value, "PPP") : "Not confirmed"}
													disabled
													className={"w-full pl-3 text-left font-normal"}
												></Input>
											</FormControl>
											<FormMessage className='text-xs text-red-600 font-bold' />
										</FormItem>
									)
								}}
							/>
						</div>
					</div>
					<FormField
						control={form.control}
						name='role'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={ROLE_OPTION[0].value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a verified email to display' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{ROLE_OPTION.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage className='text-xs text-red-600 font-bold' />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-4 gap-4'>
						<div className='space-y-2'>
							<FormField
								control={form.control}
								name='lastSignInAt'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel htmlFor='lastSignInAt'>Phone confirmed</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={
														field.value ? format(field.value, "PPP") : "Not connected yet"
													}
													disabled
													className={"w-full pl-3 text-left font-normal"}
												></Input>
											</FormControl>
											<FormMessage className='text-xs text-red-600 font-bold' />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='space-y-2'>
							<FormField
								control={form.control}
								name='createdAt'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel htmlFor='createdAt'>Created At</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={
														field.value ? format(field.value, "PPP") : "Not connected yet"
													}
													disabled
													className={"w-full pl-3 text-left font-normal"}
												></Input>
											</FormControl>
											<FormMessage className='text-xs text-red-600 font-bold' />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='space-y-2'>
							<FormField
								control={form.control}
								name='updatedAt'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel htmlFor='updatedAt'>Updated At</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={
														field.value ? format(field.value, "PPP") : "Not connected yet"
													}
													disabled
													className={"w-full pl-3 text-left font-normal"}
												></Input>
											</FormControl>
											<FormMessage className='text-xs text-red-600 font-bold' />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='space-y-2'>
							<FormField
								control={form.control}
								name='bannedUntil'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel htmlFor='bannedUntil'>Banned Until</FormLabel>
											<FormControl>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant={"outline"}
															className={"w-full pl-3 text-left font-normal"}
														>
															{field.value ? (
																format(field.value, "PPP")
															) : (
																<span>Not banned</span>
															)}
															<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
														</Button>
													</PopoverTrigger>
													<PopoverContent className='w-auto p-0' align='start'>
														<Calendar
															mode='single'
															onSelect={field.onChange}
															disabled={(date) => date < new Date("1900-01-01")}
														/>
													</PopoverContent>
												</Popover>
											</FormControl>
											<FormMessage className='text-xs text-red-600 font-bold' />
										</FormItem>
									)
								}}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-4'>
						<Button type='submit' className='w-full' disabled={isPending}>
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
								"Update Country"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default UserManagementEdit
