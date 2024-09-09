import React from "react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb"
import { useLocation } from "react-router-dom"
import capitalize from "lodash/capitalize"

function CustomBreadcrumb() {
	const { pathname } = useLocation()
	const pathParts = pathname.split("/")
	const modifiedPathParts = [...pathParts.slice(1)]

	const paths = modifiedPathParts.reduce(
		(acc, part, index) => {
			if (index === 0) {
				acc.push({ route: `/${part}`, name: part })
			} else {
				acc.push({
					route: `${acc[index - 1].route}/${part}`,
					name: part,
				})
			}
			return acc
		},
		[] as { route: string; name: string }[],
	)

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbPage className='text-muted-foreground'>/</BreadcrumbPage>
					<BreadcrumbSeparator />
				</BreadcrumbItem>
				{paths.map((part, index) => {
					const indexPart = modifiedPathParts.length - 1
					return (
						<BreadcrumbItem key={index}>
							<BreadcrumbPage className='text-muted-foreground'>{capitalize(part.name)}</BreadcrumbPage>
							{indexPart !== index && <BreadcrumbSeparator />}
						</BreadcrumbItem>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default CustomBreadcrumb
