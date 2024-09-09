/* eslint-disable max-len */
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import logo from "@/assets/logo/textLogo.png"
import { Label } from "@radix-ui/react-label"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import { useSession } from "@/store/contexts/AuthContext"
import { Lock, LogOut, Menu, Moon, Settings, Sun, User as UserIcon } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "@/store/contexts/ThemeProviderContext"
import { useAtom } from "jotai"
import { connectedUserAtom } from "@/store/atoms/user/useUserAtom"
import NavBarLocation from "../NavBarLocation/NavBarLocation"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Separator } from "../ui/separator"

function NavBarComponent() {
	const { theme, setTheme } = useTheme()
	const { isAuth, removeUser } = useSession()
	const [userAtom] = useAtom(connectedUserAtom)
	const navigate = useNavigate()

	const logOutUser = () => {
		toast("You have been logged out!")
		removeUser()
		navigate("/")
	}

	const handleTheme = () => {
		theme == "light" ? setTheme("dark") : setTheme("light")
	}

	const isUserAdmin = userAtom?.role === "SUPER_ADMIN"

	return (
		<div className='flex items-center justify-between w-full mt-4 mb-6 md:px-4'>
			<div className='flex items-center justify-between w-1/3 md:justify-start lg:gap-4 md:gap-10 '>
				<Sheet>
					<SheetTrigger className='flex items-center gap-2 lg:hidden'>
						<Menu />
						<Label className='hidden text-sm font-bold md:block'>Menu</Label>
					</SheetTrigger>
					<SheetContent side={"left"} className='w-full'>
						<SheetHeader>
							<SheetTitle className='mx-auto'>
								<img src={logo} alt='Logo' className='w-40 h-12' />
							</SheetTitle>
							<SheetDescription className='flex flex-col items-start justify-start gap-4'>
								<Link to={"#"}>
									<Label className='text-sm font-bold transition-all duration-300 ease-in-out cursor-pointer opacity-60 hover:opacity-100 hover:text-primary'>
										Explore
									</Label>
								</Link>
								<Link to={"#"}>
									<Label className='text-sm font-bold transition-all duration-300 ease-in-out cursor-pointer opacity-60 hover:opacity-100 hover:text-primary'>
										Discover
									</Label>
								</Link>
								<Separator orientation='horizontal' />
								<Link to={"#"}>
									<Label className='text-sm font-bold transition-all duration-300 ease-in-out cursor-pointer opacity-60 hover:opacity-100 hover:text-primary'>
										Personalize
									</Label>
								</Link>
								<Link to={"#"}>
									<Label className='text-sm font-bold transition-all duration-300 ease-in-out cursor-pointer opacity-60 hover:opacity-100 hover:text-primary'>
										Search
									</Label>
								</Link>
								<Separator orientation='horizontal' />
								<div
									className='flex items-center gap-4 p-2 rounded cursor-pointer'
									onClick={() => handleTheme()}
								>
									{theme === "light" ? <Moon className='w-4 h-4' /> : <Sun className='w-4 h-4' />}
									<Label> Click to change theme!</Label>
								</div>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
				<Link to={"/"}>
					<img src={logo} alt='Logo' className='hidden w-32 h-10 lg:block' />
				</Link>
				<Link to={"#"}>
					<Label className='hidden text-sm font-bold transition-all duration-300 ease-in-out cursor-pointer lg:block opacity-60 hover:opacity-100 hover:text-primary'>
						Explore
					</Label>
				</Link>
				<Link to={"#"}>
					<Label className='hidden text-sm font-bold transition-all duration-300 ease-in-out cursor-pointer lg:block opacity-60 hover:opacity-100 hover:text-primary'>
						Discover
					</Label>
				</Link>
			</div>
			<NavBarLocation />
			<div className='flex items-center justify-end w-1/3 md:gap-4 xl:gap-4'>
				<Link to={"#"}>
					<Label className='hidden text-sm font-bold transition-all duration-300 ease-in-out cursor-pointer lg:block opacity-60 hover:opacity-100 hover:text-primary'>
						Personalize
					</Label>
				</Link>
				<Link to={"#"}>
					<Label className='hidden text-sm font-bold transition-all duration-300 ease-in-out cursor-pointer lg:block opacity-60 hover:opacity-100 hover:text-primary'>
						Search
					</Label>
				</Link>
				{!isAuth ? (
					<div className='flex items-center gap-4'>
						<div className='hidden p-2 rounded cursor-pointer md:block'>
							{theme === "light" ? (
								<Moon className='w-4 h-4' onClick={() => setTheme("dark")} />
							) : (
								<Sun className='w-4 h-4' onClick={() => setTheme("light")} />
							)}
						</div>
						<Link to={"/auth/login"} className='flex items-center outline-none space gap-x-4'>
							<Label className='w-16 py-1.5 text-xs font-semibold text-center text-white transition-all duration-700 ease-in-out rounded-full md:text-sm md:w-20 md:px-4 md:py-2 hover:cursor-pointer bg-primary hover:text-base hover:leading-5'>
								Login
							</Label>
						</Link>
					</div>
				) : (
					<DropdownMenu key={"UserDropDownMenu"}>
						<DropdownMenuTrigger className='flex items-center outline-none space gap-x-4'>
							<div className='flex items-center gap-4 px-1 py-1 transition-all justify-evenly xl:w-40 hover:bg-secondary hover:rounded-full hover:cursor-pointer'>
								<Label
									htmlFor='email'
									className='hidden text-sm font-bold cursor-pointer md:block text-foreground'
								>
									{`${userAtom?.firstName} ${userAtom?.lastName}`}
								</Label>
								<Avatar>
									<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' side='bottom' align='end'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => navigate("/profile")}>
									<div className='flex items-center w-full h-full cursor-pointer'>
										<UserIcon className='w-4 h-4 mr-2' />
										<span>Profile</span>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate("/settings")}>
									<div className='flex items-center w-full h-full cursor-pointer'>
										<Settings className='w-4 h-4 mr-2' />
										<span>Settings</span>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate("/admin")} disabled={!isUserAdmin}>
									<div className='flex items-center w-full h-full cursor-pointer'>
										<Lock className='w-4 h-4 mr-2' />
										<span>Admin</span>
									</div>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleTheme}>
								{theme == "dark" ? <Moon className='w-4 h-4 mr-2' /> : <Sun className='w-4 h-4 mr-2' />}
								Toggle Theme
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link to={"#"} className='flex items-center w-full h-full' onClick={() => logOutUser()}>
									<LogOut className='w-4 h-4 mr-2' />
									<span>Log out</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	)
}

export default NavBarComponent
