import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { TailSpin } from "react-loader-spinner"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useGetAllCategories } from "@/hooks/queries/category/useGetAllCategories"
import LoadingComponent from "@/components/Loading/LoadingComponent"
import { ICategory } from "@/interfaces/category/category.interface"
import { useParams } from "react-router-dom"
import { useGetSubCategoryById } from "@/hooks/queries/subcategory/useGetSubCategoryById"
import { useEditSubCategory } from "@/hooks/queries/subcategory/useEditSubCategory"
import { useEffect } from "react"
import { ISubCategorySchemaZod } from "@/interfaces/subcategory/subcategory.interface"

function SubCategoryManagmentEdit() {
	const queryClient = useQueryClient()
	const { id } = useParams()
	const { data: subCategory, isLoading: isLoadingSubCategory } = useGetSubCategoryById(id)
	const { data: categories, isLoading: isLoadingCategory } = useGetAllCategories()
	const form = useForm<z.infer<typeof ISubCategorySchemaZod>>({
		resolver: zodResolver(ISubCategorySchemaZod),
		defaultValues: {
			isEnable: "1",
		},
	})
	useEffect(() => {
		if (subCategory) {
			form.reset({ ...subCategory })
		}
	}, [subCategory, form.reset])

	const { mutate, isPending } = useEditSubCategory(id)
	const onSubmit = (data: z.infer<typeof ISubCategorySchemaZod>) => {
		queryClient.removeQueries({ queryKey: ["all-subCategories"] })
		const formData = {
			...data,
			isEnable: data.isEnable === "1" ? true : false,
		}

		mutate(formData)
	}

	if (isLoadingCategory || isLoadingSubCategory) {
		return (
			<div className='container flex items-center justify-center h-screen'>
				<LoadingComponent />
			</div>
		)
	}

	return (
		<div className='py-2'>
			<div className='flex justify-between'>
				<p className='font-bold text-foreground text-3xl'>Add Sub-Category</p>
			</div>
			<Separator className='my-4' />
			<Form {...form}>
				<form className='space-y-4 w-full lg:w-1/2' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid grid-cols-2 gap-4'>
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
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage className='text-xs text-red-600 font-bold' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='categoryUuid'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories?.map((category: ICategory) => (
												<SelectItem key={category.uuid} value={category.uuid}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
								"Edit subcategory"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default SubCategoryManagmentEdit
