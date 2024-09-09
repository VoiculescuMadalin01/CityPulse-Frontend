import { Outlet } from "react-router-dom"
import NavBarComponent from "@/components/NavBar/NavBarComponent"

export default function MainLayout() {
	return (
		<div className='container'>
			<NavBarComponent />
			<Outlet />
		</div>
	)
}
