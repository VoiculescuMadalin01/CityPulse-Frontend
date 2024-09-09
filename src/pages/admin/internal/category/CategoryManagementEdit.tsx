import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { TailSpin } from "react-loader-spinner"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import LoadingComponent from "@/components/Loading/LoadingComponent"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useGetCategoryById } from "@/hooks/queries/category/useGetCategoryById"
import { useEditCategory } from "@/hooks/queries/category/useEditCategory"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ICategorySchemaZod } from "@/interfaces/category/category.interface"

function CategoryManagementEdit() {
	const queryClient = useQueryClient()
	const { id } = useParams()
	const { data, isLoading } = useGetCategoryById(id)

	const form = useForm<z.infer<typeof ICategorySchemaZod>>({
		resolver: zodResolver(ICategorySchemaZod),
	})

	useEffect(() => {
		if (data) {
			form.reset({ ...data })
		}
	}, [data, form.reset])

	const { mutate, isPending } = useEditCategory(id)

	if (isLoading) {
		return (
			<div className='container flex items-center justify-center h-screen'>
				<LoadingComponent />
			</div>
		)
	}

	const onSubmit = (data: z.infer<typeof ICategorySchemaZod>) => {
		queryClient.removeQueries({ queryKey: ["category"] })
		const newData: z.infer<typeof ICategorySchemaZod> = {
			...data,
			isEnable: data.isEnable === "1" ? true : false,
		}
		mutate(newData)
	}
	return (
		<div className='py-2'>
			<div className='flex justify-between'>
				<p className='font-bold text-foreground text-3xl'>Edit Category</p>
			</div>
			<Separator className='my-4' />
			<Form {...form}>
				<form className='space-y-4 w-full lg:w-1/2' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid grid-cols-3 gap-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage className='text-xs text-red-600 font-bold' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<FormControl>
										<Input {...field} />
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
								"Edit category"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default CategoryManagementEdit
