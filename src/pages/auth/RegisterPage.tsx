import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { ChromeIcon } from "@/assets/icons/ChromeIcon"
import { apiV1 } from "@/services/axiosConfig"
import { useMutation } from "@tanstack/react-query"
import FullLogo from "@/assets/logo/fullLogo.png"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { passwordValidatorSchema } from "@/utils/validators/passwordValidators"
import { TailSpin } from "react-loader-spinner"
import { AxiosError, AxiosResponse } from "axios"
import { passwordStrength } from "check-password-strength"

type Inputs = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

const schema = z
	.object({
		firstName: z.string().min(3, { message: "This field has to be filled." }),
		lastName: z.string().min(3, { message: "This field has to be filled." }),
		email: z.string().min(1, { message: "Email has to be filled." }).email("This is not a valid email."),
		password: passwordValidatorSchema,
		confirmPassword: passwordValidatorSchema,
	})
	.required()
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
				path: ["confirmPassword"],
				fatal: true,
			})
		}
	})

export default function RegisterPage() {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(schema),
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: Inputs) => apiV1.post("/auth/register", { ...data }),
		onSuccess: (success: AxiosResponse) => {
			const { message } = success.data as { message: string }
			toast.success(`Success`, { description: message })
			navigate("/auth/login")
		},
		onError: (err: AxiosError) => {
			const { error, message, statusCode } = err.response?.data as {
				error: string
				message: string
				statusCode: number
			}
			toast.error(`${statusCode} ${error}`, { description: message })
		},
	})
	const onSubmit = (data: Inputs) => {
		mutate(data)
	}

	const colors = ["#ef4444", "#f59e0b", "#eab308", "#22c55e"]
	const passwordWatch = watch("password", "")
	const passwordStrengthValue = passwordStrength(passwordWatch).contains.length

	return (
		<div className='flex flex-col-reverse lg:grid grid-cols-2 h-screen w-full lg:min-h-screen'>
			<div className='h-5/6 flex items-center justify-center  lg:h-full'>
				<div className='mx-auto max-w-md space-y-6 pt-24 pb-12 px-6 w-full'>
					<div className='space-y-2  text-center '>
						<h1 className='text-3xl font-bold text-foreground'>Register</h1>
						<p className='text-muted-foreground'>Create a new account to get started.</p>
					</div>
					<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
						<div className='md:grid md:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='first-name'>First Name</Label>
								<Input {...register("firstName")} />
								<p className='text-xs text-red-600 font-bold'>{errors.firstName?.message}</p>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='last-name'>Last Name</Label>
								<Input {...register("lastName")} />
								<p className='text-xs text-red-600 font-bold'>{errors.lastName?.message}</p>
							</div>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input {...register("email")} />
							<p className='text-xs text-red-600 font-bold'>{errors.email?.message}</p>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<div className='space-y-2'>
								<Input {...register("password")} type='password' />
								{!!passwordWatch.length && (
									<div className='w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700'>
										<div
											className='h-1.5 rounded-full transition-all duration-300 ease-in-out'
											style={{
												width: `${passwordStrengthValue * 25}%`,
												backgroundColor: colors[passwordStrengthValue - 1],
											}}
										/>
									</div>
								)}
							</div>
							<p className='text-xs text-red-600 font-bold'>{errors.password?.message}</p>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='confirm-password'>Confirm Password</Label>
							<Input {...register("confirmPassword")} type='password' />
							<p className='text-xs text-red-600 font-bold'>{errors.confirmPassword?.message}</p>
						</div>
						<div className='flex flex-col gap-4'>
							<Button type='submit' className='w-full' disabled={!!errors.password || isPending}>
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
									"Register"
								)}
							</Button>
							<Button variant='outline' className='w-full flex gap-2' disabled={isPending}>
								<ChromeIcon />
								Register with Google
							</Button>
							<div className='flex items-center space-x-4'>
								<div className='flex-1 h-px bg-muted' />
								<p className='text-muted-foreground'>or</p>
								<div className='flex-1 h-px bg-muted' />
							</div>
							<Link
								to={"/auth/login"}
								className='text-center text-sm text-muted-foreground hover:underline underline-offset-4'
							>
								Already have an account? Login
							</Link>
						</div>
					</form>
				</div>
			</div>
			<div className='h-1/6 bg-primary flex items-center justify-center lg:h-full'>
				<div className='flex items-center gap-8 max-w-md lg:space-y-4 text-center text-primary-foreground lg:block'>
					<img src={FullLogo} className='rounded-full h-24 w-24 lg:h-64 lg:w-64 m-auto' />
					<h1 className='text-2xl lg:text-5xl font-bold text-foreground'>Welcome Back!</h1>
					<p className='hidden lg:block lg:text-xl text-foreground'>
						Sign in to your account and start exploring our local events.
					</p>
				</div>
			</div>
		</div>
	)
}
