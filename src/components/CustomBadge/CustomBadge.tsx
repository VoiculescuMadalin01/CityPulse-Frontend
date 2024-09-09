import React from "react"
import { Badge } from "../ui/badge"

const CustomBooleanBadge = ({ value }: { value: boolean }) => {
	return value === true ? <Badge variant={"success"}>True</Badge> : <Badge variant={"destructive"}>False</Badge>
}

const CustomStringBadge = ({ value }: { value: string }) => {
	return <Badge>{value}</Badge>
}

function CustomBadge(value: boolean | string): React.ReactElement {
	if (typeof value === "boolean") {
		return <CustomBooleanBadge value={value} />
	} else {
		return <CustomStringBadge value={value} />
	}
}

export default CustomBadge
