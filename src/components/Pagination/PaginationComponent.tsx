/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback } from "react"
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { Button } from "../ui/button"

type CustomPaginationProps = {
	pageIndex: number
	pageCount: number
	canPreviousPage: boolean
	canNextPage: boolean
	visiblePages: number[]
	pageSize: number
	rowCount: number
	gotoPage: (page: number) => void
	previousPage: () => void
	nextPage: () => void
	setVisiblePages: (pages: number[]) => void
}

const Pagination = ({
	pageIndex,
	pageCount,
	canPreviousPage,
	canNextPage,
	visiblePages,
	pageSize,
	gotoPage,
	previousPage,
	nextPage,
	setVisiblePages,
}: CustomPaginationProps) => {
	const getVisiblePages = useCallback(() => {
		const pages: number[] = []
		const startPage = Math.max(0, pageIndex - 1)
		const endPage = Math.min(pageCount - 1, pageIndex + 1)

		for (let index = startPage; index <= endPage; index++) {
			pages.push(index)
		}

		setVisiblePages(pages)
	}, [pageIndex, pageCount, setVisiblePages])

	const onPageIndexChange = useCallback(() => {
		if (visiblePages.includes(pageIndex)) return

		const pages: number[] = []
		const startPage = Math.max(0, pageIndex - 1)
		const endPage = Math.min(pageCount - 1, pageIndex + 1)

		for (let index = startPage; index <= endPage; index++) {
			pages.push(index)
		}

		setVisiblePages(pages)
	}, [pageIndex, pageCount, setVisiblePages])

	useEffect(() => {
		getVisiblePages()
	}, [getVisiblePages])

	useEffect(() => {
		onPageIndexChange()
	}, [pageIndex, onPageIndexChange])

	return (
		<div className='flex items-center gap-10'>
			<div className='flex gap-4'>
				<Button variant={"outline"} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					<ChevronsLeft width={16} height={16} />
				</Button>
				<Button variant={"outline"} onClick={() => previousPage()} disabled={!canPreviousPage}>
					<ChevronLeft width={16} height={16} />
				</Button>
				{visiblePages.map((p: number) => (
					<Button
						type='button'
						key={p}
						onClick={() => gotoPage(p)}
						variant={`${p === pageIndex ? "default" : "outline"}`}
					>
						{p + 1}
					</Button>
				))}
				<Button variant={"outline"} onClick={() => nextPage()} disabled={!canNextPage}>
					<ChevronRight width={16} height={16} />
				</Button>
				<Button variant={"outline"} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					<ChevronsRight width={16} height={16} />
				</Button>
			</div>
		</div>
	)
}

export default Pagination
