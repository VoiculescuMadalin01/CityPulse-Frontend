import { useAddNewCategory } from "@/hooks/queries/category/useAddNewCategory"
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
import { ICategorySchemaZod } from "@/interfaces/category/category.interface"

function CategoryManagmentAdd() {
	const queryClient = useQueryClient()
	const form = useForm<z.infer<typeof ICategorySchemaZod>>({
		resolver: zodResolver(ICategorySchemaZod),
	})
	const { mutate, isPending } = useAddNewCategory()
	const onSubmit = (data: z.infer<typeof ICategorySchemaZod>) => {
		queryClient.removeQueries({ queryKey: ["category"] })
		const formData = {
			...data,
			isEnable: data.isEnable === "1" ? true : false,
		}
		mutate(formData)
	}
	return (
		<div className='py-2'>
			<div className='flex justify-between'>
				<p className='font-bold text-foreground text-3xl'>Add Category</p>
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
								"Add category"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default CategoryManagmentAdd
