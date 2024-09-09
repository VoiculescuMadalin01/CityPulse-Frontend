import { Label } from "@/components/ui/label"
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb"

function ConfigManagementPage() {
	return (
		<div>
			<div className='space-y-2'>
				<Label className='font-bold text-foreground text-3xl'>Config</Label>
				<CustomBreadcrumb />
			</div>
		</div>
	)
}

export default ConfigManagementPage
