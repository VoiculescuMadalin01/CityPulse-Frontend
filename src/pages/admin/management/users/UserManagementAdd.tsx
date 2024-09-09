import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAddNewUser } from "@/hooks/queries/users/useAddNewUser"
import { IAddUserSchemaZod } from "@/interfaces/user/add-user.interface"
import { useForm } from "react-hook-form"
import { TailSpin } from "react-loader-spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ROLE_OPTION } from "@/interfaces/role/role.interface"
import { useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

function UserManagementAdd() {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof IAddUserSchemaZod>>({
		resolver: zodResolver(IAddUserSchemaZod),
	})

	const { mutate, isPending } = useAddNewUser()
	const onSubmit = (data: z.infer<typeof IAddUserSchemaZod>) => {
		queryClient.removeQueries({ queryKey: ["user"] })
		mutate(data)
	}

	return (
		<div className='py-2'>
			<div className='flex justify-between'>
				<p className='font-bold text-foreground text-3xl'>Add User</p>
			</div>
			<Separator className='my-4' />
			<Form {...form}>
				<form className='space-y-4 w-full lg:w-1/2' onSubmit={form.handleSubmit(onSubmit)}>
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
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} type='password' />
								</FormControl>
								<FormMessage className='text-xs text-red-600 font-bold' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-600 font-bold' />
							</FormItem>
						)}
					/>
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
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex flex-col gap-4'>
						<Button
							type='submit'
							className='w-full'
							disabled={!!form.formState.errors.password || isPending}
						>
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
								"Add user"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default UserManagementAdd
