import { Outlet, useNavigate, Link, useLocation } from "react-router-dom"
import { useSession } from "@/store/contexts/AuthContext"
import { useAtom } from "jotai"
import { connectedUserAtom } from "@/store/atoms/user/useUserAtom"
import { ErrorComponent } from "@/components/Error/ErrorComponent"
import { ROLE_HIERARCHY } from "@/interfaces/role/role.interface"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
	Calendar,
	CogIcon,
	Earth,
	Ellipsis,
	Gauge,
	Home,
	House,
	LandPlot,
	ListOrdered,
	LogOut,
	MapPin,
	Moon,
	PersonStanding,
	Sun,
	Tags,
	Ticket,
	UserRound,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "@/store/contexts/ThemeProviderContext"

export default function AdminLayout() {
	const { isAuth, removeUser } = useSession()
	const { theme, setTheme } = useTheme()
	const navigate = useNavigate()
	const [userAtom] = useAtom(connectedUserAtom)

	if (!isAuth) {
		toast.error("You are not authorized to enter!")
		navigate("/")
	}

	const location = useLocation()
	const segments = location.pathname.split("/")
	const lastSegment = segments.pop() || ""

	const displaySelectedButton = (routeName: string) => {
		return lastSegment === routeName ? "default" : "ghost"
	}

	const handleTheme = () => {
		theme == "light" ? setTheme("dark") : setTheme("light")
	}

	if (ROLE_HIERARCHY[userAtom?.role || "GUEST"] <= 0) {
		return (
			<div className='container flex items-center justify-center h-screen'>
				<ErrorComponent error={{ message: "Error Admin Unauthorized", name: "Role" }} />
			</div>
		)
	}

	return (
		<div className='flex w-full min-h-screen'>
			<div className='flex flex-col h-screen border-r max-w-64'>
				<ScrollArea className='flex-1 w-full overflow-auto'>
					<div className='flex flex-col justify-between h-full py-6'>
						<div className='space-y-1'>
							<div className='px-3 py-2'>
								<h2 className='px-4 mb-2 text-lg font-semibold tracking-tight'>Overview</h2>
								<div className='space-y-1'>
									<Link to={"/admin"}>
										<Button
											variant={displaySelectedButton("admin")}
											className='justify-start w-full'
										>
											<Gauge className='w-4 h-4 mr-2' />
											Dashboard
										</Button>
									</Link>
								</div>
							</div>
							<Separator />
							<div className='px-3 py-2'>
								<h2 className='px-4 mb-2 text-lg font-semibold tracking-tight'>Management</h2>
								<div className='space-y-1'>
									<Link to={"/admin/management/users"}>
										<Button
											variant={displaySelectedButton("users")}
											className='justify-start w-full'
										>
											<UserRound className='w-4 h-4 mr-2' />
											Users
										</Button>
									</Link>
									<Link to={"/admin/management/locations"}>
										<Button
											variant={displaySelectedButton("locations")}
											className='justify-start w-full'
										>
											<MapPin className='w-4 h-4 mr-2' />
											Locations
										</Button>
									</Link>
									<Link to={"/admin/management/events"}>
										<Button
											variant={displaySelectedButton("events")}
											className='justify-start w-full'
										>
											<Calendar className='w-4 h-4 mr-2' />
											Events
										</Button>
									</Link>
									<Link to={"/admin/management/tickets"}>
										<Button
											variant={displaySelectedButton("tickets")}
											className='justify-start w-full'
										>
											<Ticket className='w-4 h-4 mr-2' />
											Support Tickets
										</Button>
									</Link>
								</div>
							</div>
							<Separator />
							<div className='px-3 py-2'>
								<h2 className='px-4 mb-2 text-lg font-semibold tracking-tight'>Internal</h2>
								<div className='space-y-1'>
									<Link to={"/admin/internal/facility"}>
										<Button
											variant={displaySelectedButton("facility")}
											className='justify-start w-full'
										>
											<PersonStanding className='w-4 h-4 mr-2' />
											Facility
										</Button>
									</Link>
									<Link to={"/admin/internal/category"}>
										<Button
											variant={displaySelectedButton("category")}
											className='justify-start w-full'
										>
											<ListOrdered className='w-4 h-4 mr-2' />
											Category
										</Button>
									</Link>
									<Link to={"/admin/internal/subCategory"}>
										<Button
											variant={displaySelectedButton("subCategory")}
											className='justify-start w-full'
										>
											<Tags className='w-4 h-4 mr-2' />
											Sub-Category
										</Button>
									</Link>
								</div>
							</div>
							<Separator />
							<div className='px-3 py-2'>
								<h2 className='px-4 mb-2 text-lg font-semibold tracking-tight'>Geography</h2>
								<div className='space-y-1'>
									<Link to={"/admin/geography/country"}>
										<Button
											variant={displaySelectedButton("country")}
											className='justify-start w-full'
										>
											<Earth className='w-4 h-4 mr-2' />
											Country
										</Button>
									</Link>
									<Link to={"/admin/geography/state"} className='pointer-events-none'>
										<Button
											variant={displaySelectedButton("state")}
											className='justify-start w-full'
											disabled
										>
											<LandPlot className='w-4 h-4 mr-2' />
											State
										</Button>
									</Link>
									<Link to={"/admin/geography/city"} className='pointer-events-none'>
										<Button
											variant={displaySelectedButton("city")}
											className='justify-start w-full'
											disabled
										>
											<House className='w-4 h-4 mr-2' />
											City
										</Button>
									</Link>
								</div>
							</div>
							<Separator />
							<div className='px-3 py-2'>
								<h2 className='px-4 mb-2 text-lg font-semibold tracking-tight'>Options</h2>
								<div className='space-y-1'>
									<Link to={"/admin/options/configuration"}>
										<Button
											variant={displaySelectedButton("configuration")}
											className='justify-start w-full'
										>
											<CogIcon className='w-4 h-4 mr-2' />
											Configuration
										</Button>
									</Link>
									<Link to={"/admin/options/others"}>
										<Button
											variant={displaySelectedButton("others")}
											className='justify-start w-full'
										>
											<Ellipsis className='w-4 h-4 mr-2' />
											Others
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
				<Separator />
				<div className='flex w-full gap-4 p-2 ml-auto'>
					<Button variant={"ghost"} className='w-full' onClick={() => navigate("/")}>
						<Home className='w-4 h-4' />
					</Button>
					<Button variant={"ghost"} className='w-full' onClick={handleTheme}>
						{theme == "dark" ? <Moon className='w-4 h-4' /> : <Sun className='w-4 h-4' />}
					</Button>
					<Button variant={"ghost"} className='w-full' onClick={removeUser}>
						<LogOut className='w-4 h-4' />
					</Button>
				</div>
			</div>

			<div className='w-full h-screen px-4 py-6 lg:px-8'>
				<Outlet />
			</div>
		</div>
	)
}
