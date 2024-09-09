import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { ChromeIcon } from "@/assets/icons/ChromeIcon"
import { apiV1 } from "@/services/axiosConfig"
import { useSession } from "@/store/contexts/AuthContext"
import { useMutation } from "@tanstack/react-query"
import FullLogo from "@/assets/logo/fullLogo.png"
import { LockIcon, MailIcon } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { TailSpin } from "react-loader-spinner"
import { AxiosError } from "axios"

type Inputs = {
	email: string
	password: string
}
const schema = z
	.object({
		email: z.string().min(1, { message: "This fiels has to be filled" }).email("This may be not a valid email"),
		password: z.string().min(8),
	})
	.required()

export default function LoginPage() {
	const navigate = useNavigate()
	const { setUser } = useSession()

	const { mutate, isPending } = useMutation({
		mutationFn: async (mutationData: { email: string; password: string }) =>
			apiV1.post("/auth/login", { ...mutationData }).then((res) => {
				const { accessToken, uuid } = res.data
				setUser(accessToken, uuid)
			}),
		onSuccess: () => {
			toast.success("Succes", { description: "Connection successful" })
			return navigate("/")
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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: zodResolver(schema) })

	const onSubmit = (data: Inputs) => {
		mutate(data)
	}

	return (
		<div className='lg:grid grid-cols-2 h-screen w-full lg:min-h-screen'>
			<div className='h-1/6 bg-primary flex items-center justify-center lg:h-full'>
				<div className='flex items-center gap-8 max-w-md lg:space-y-4 text-center text-primary-foreground lg:block'>
					<img src={FullLogo} className='rounded-full h-24 w-24 lg:h-64 lg:w-64 m-auto' />
					<h1 className='text-2xl lg:text-5xl font-bold text-foreground'>Welcome Back!</h1>
					<p className='hidden lg:block lg:text-xl text-foreground'>
						Sign in to your account and start exploring our local events.
					</p>
				</div>
			</div>
			<div className='h-5/6  flex items-center justify-center lg:h-full '>
				<div className='mx-auto w-full max-w-md space-y-6 px-6 lg:px-2'>
					<div className='space-y-2 text-center'>
						<h2 className='text-3xl font-bold'>Login</h2>
						<p className='text-muted-foreground'>Enter your email and password to sign in.</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<div className='relative space-y-2'>
							<div className='space-y-2'>
								<div className='relative'>
									<MailIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
									<Input
										id='email'
										type='email'
										className='pl-10'
										placeholder='m@example.com'
										{...register("email")}
									/>
								</div>
							</div>
							<p className='text-xs text-red-600 font-bold'>{errors.email?.message}</p>
						</div>
						<div className='space-y-2'>
							<div className='relative space-y-2'>
								<div className='relative'>
									<LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
									<Input
										id='password'
										type='password'
										className='pl-10'
										placeholder='••••••••••••'
										{...register("password")}
									/>
								</div>
								<p className='text-xs text-red-600 font-bold'>{errors.password?.message}</p>
							</div>
							<div className='flex items-center justify-end'>
								<Link to='#' className='text-sm text-muted-foreground underline'>
									Forgot password?
								</Link>
							</div>
						</div>
						<Button type='submit' className='w-full' disabled={!!errors.email || isPending}>
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
								"Sign In"
							)}
						</Button>
					</form>
					<Button variant='outline' className='w-full flex gap-2' disabled={isPending}>
						<ChromeIcon />
						Sign in with Google
					</Button>
					<div className='flex items-center space-x-4'>
						<div className='flex-1 h-px bg-muted' />
						<p className='text-muted-foreground'>or</p>
						<div className='flex-1 h-px bg-muted' />
					</div>
					<div className='flex items-center justify-center'>
						<Link
							to={"/auth/register"}
							className='text-center text-sm text-muted-foreground hover:underline underline-offset-4'
						>
							Don&apos;t have an account? Click here to register!
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
