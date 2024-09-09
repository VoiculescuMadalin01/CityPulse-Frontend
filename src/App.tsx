import { Route, Routes } from "react-router-dom"
import HomePage from "@/pages/home/HomePage"
import { Toaster } from "sonner"
import SettingsPage from "@/pages/settings/SettingsPage"
import LoginPage from "@/pages/auth/LoginPage"
import ProfilePage from "@/pages/settings/profile/ProfilePage"
import RegisterPage from "@/pages/auth/RegisterPage"
import MainLayout from "@/layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import AdminPage from "./pages/admin/AdminPage"
import GlobalLayout from "./layouts/GlobalLayout"
import UsersManagementPage from "./pages/admin/management/users/UsersManagementPage"
import UserManagementAdd from "./pages/admin/management/users/UserManagementAdd"
import UserManagementEdit from "./pages/admin/management/users/UserManagementEdit"
import CountryManagementPage from "./pages/admin/geography/country/CountryManagementPage"
import CategoriesManagementPage from "./pages/admin/internal/category/CategoryManagementPage"
import CategoryManagmentAdd from "./pages/admin/internal/category/CategoryManagmentAdd"
import CategoryManagementEdit from "./pages/admin/internal/category/CategoryManagementEdit"
import FacilityManagementPage from "./pages/admin/internal/facility/FacilityManagementPage"
import FacilityManagmentAdd from "./pages/admin/internal/facility/FacilityManagmentAdd"
import FacilityManagementEdit from "./pages/admin/internal/facility/FacilityManagementEdit"
import ConfigManagementPage from "./pages/admin/options/configuration/ConfigManagementPage"
import OthersManagementPage from "./pages/admin/options/others/OthersManagementPage"
import EventsManagementPage from "./pages/admin/management/events/EventsManagementPage"
import TicketManagementPage from "./pages/admin/management/support/TicketManagementPage"
import SubCategoryManagmentAdd from "./pages/admin/internal/subCategory/SubcategoryManagementAdd"
import SubCategoryManagmentEdit from "./pages/admin/internal/subCategory/SubCategoryManagementEdit"
import SubCategoryManagementPage from "./pages/admin/internal/subCategory/SubCategoryManagementPage"
import LocationsManagementPage from "./pages/admin/management/locations/LocationsManagementPage"
import LocationManagementEdit from "./pages/admin/management/locations/LocationManagementEdit"
import DevPage from "./pages/dev/DevPage"

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<GlobalLayout />}>
					<Route path='/' element={<MainLayout />}>
						<Route index element={<HomePage />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/settings' element={<SettingsPage />} />
					</Route>
					{/* ADMIN ROUTES */}
					<Route path='/admin' element={<AdminLayout />}>
						<Route index element={<AdminPage />} />
						<Route path='management'>
							{/* Users*/}
							<Route path='users' element={<UsersManagementPage />} />
							<Route path='users/add' element={<UserManagementAdd />} />
							<Route path='users/edit/:id' element={<UserManagementEdit />} />
							{/* LOCATIONS */}
							<Route path='locations' element={<LocationsManagementPage />} />
							<Route path='locations/edit/:id' element={<LocationManagementEdit />} />
							{/* EVENTS */}
							<Route path='events' element={<EventsManagementPage />} />
							{/* TICKETS */}
							<Route path='tickets' element={<TicketManagementPage />} />
						</Route>
						<Route path='internal'>
							{/* FACILITY */}
							<Route path='facility' element={<FacilityManagementPage />} />
							<Route path='facility/add' element={<FacilityManagmentAdd />} />
							<Route path='facility/edit/:id' element={<FacilityManagementEdit />} />
							{/* CATEGORY */}
							<Route path='category' element={<CategoriesManagementPage />} />
							<Route path='category/add' element={<CategoryManagmentAdd />} />
							<Route path='category/edit/:id' element={<CategoryManagementEdit />} />
							{/* SUBCATEGORY */}
							<Route path='subCategory' element={<SubCategoryManagementPage />} />
							<Route path='subCategory/add' element={<SubCategoryManagmentAdd />} />
							<Route path='subCategory/edit/:id' element={<SubCategoryManagmentEdit />} />
						</Route>
						<Route path='geography'>
							<Route path='country' element={<CountryManagementPage />} />
						</Route>
						<Route path='options'>
							{/* CONFIG */}
							<Route path='configuration' element={<ConfigManagementPage />} />
							{/* OTHERS */}
							<Route path='others' element={<OthersManagementPage />} />
						</Route>
					</Route>
				</Route>
				<Route path='/auth/login' element={<LoginPage />} />
				<Route path='/auth/register' element={<RegisterPage />} />
				<Route path='/dev' element={<DevPage />} />
			</Routes>
			<Toaster expand richColors />
		</>
	)
}

export default App
