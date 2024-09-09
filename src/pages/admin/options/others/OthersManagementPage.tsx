import { Label } from "@/components/ui/label"
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb"

function OthersManagementPage() {
	return (
		<div>
			<div className='space-y-2'>
				<Label className='font-bold text-foreground text-3xl'>Others</Label>
				<CustomBreadcrumb />
			</div>
		</div>
	)
}

export default OthersManagementPage
