import Pagination from "@/components/Pagination/PaginationComponent"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQueryClient } from "@tanstack/react-query"
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	flexRender,
	VisibilityState,
	ColumnDef,
	SortingState,
} from "@tanstack/react-table"
import { Trash2 } from "lucide-react"

import React, { useState } from "react"
import DialogButton from "../DialogButton/DialogButton"
import { Link } from "react-router-dom"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData & { uuid: string }, TValue>[]
	data: TData[]
	visibilityColumns?: Record<string, boolean>
	sort?: SortingState
	addItemText?: string
	addItemRoute?: string
	addItemFunction?: () => void
	hasDeleteButton?: boolean
	deletePending?: boolean
	// eslint-disable-next-line no-unused-vars
	deleteMutate?: (ids: string[]) => void
}

export function CustomTable<TData, TValue>({
	columns,
	data,
	visibilityColumns = {},
	sort = [],
	addItemText,
	addItemRoute,
	hasDeleteButton = true,
	deletePending = false,
	addItemFunction,
	deleteMutate,
}: DataTableProps<TData & { uuid: string }, TValue>) {
	const queryClient = useQueryClient()

	const [sorting, setSorting] = useState<SortingState>(sort)
	const [rowSelection, setRowSelection] = useState({})
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(visibilityColumns)

	const [visiblePages, setVisiblePages] = useState<number[]>([0])

	const table = useReactTable({
		data,
		columns,
		state: {
			columnVisibility,
			sorting,
			rowSelection,
		},
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		autoResetPageIndex: false,
		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
	})
	const deleteMultipleRows = () => {
		queryClient.removeQueries({ queryKey: ["user"] })
		const getSelectedRows = table.getFilteredSelectedRowModel()
		const getRowsIds: string[] = getSelectedRows.rows.map((row) => row.original.uuid)
		deleteMutate?.(getRowsIds)
		table.toggleAllPageRowsSelected(false)
	}

	return (
		<div className='flex flex-col'>
			<div className='flex items-center h-20 gap-4 py-4'>
				<Input
					placeholder='Filter name...'
					value={table.getColumn("name")?.getFilterValue() as string}
					onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{" "}
					row(s) selected.
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
				{addItemRoute && (
					<Link to={addItemRoute || ""}>
						<Button>{addItemText}</Button>
					</Link>
				)}
				{addItemFunction && <Button onClick={addItemFunction}>{addItemText}</Button>}
				{hasDeleteButton && (
					<DialogButton onDelete={() => deleteMultipleRows()}>
						<Button disabled={deletePending || !Object.keys(rowSelection).length} variant={"destructive"}>
							<Trash2 width={16} height={16} />
							<Label className='ml-2'>Delete</Label>
						</Button>
					</DialogButton>
				)}
			</div>
			<ScrollArea className='overflow-y-auto h-[calc(100vh-260px)] relative'>
				<ScrollBar orientation='vertical' />
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className='text-center'
											style={{ width: header.getSize() }}
										>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className='text-center'
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className='py-0.5 px-2'>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</ScrollArea>
			<div className='flex items-center justify-between h-20 py-4 space-x-2'>
				<div className='text-sm font-bold'>{table.getPrePaginationRowModel().rows.length} Rows</div>
				<div className='flex items-center justify-end'>
					<Pagination
						nextPage={() => table.nextPage()}
						previousPage={() => table.previousPage()}
						canNextPage={table.getCanNextPage()}
						canPreviousPage={table.getCanPreviousPage()}
						visiblePages={visiblePages}
						pageSize={table.getState().pagination.pageSize}
						pageIndex={table.getState().pagination.pageIndex}
						rowCount={table.getRowCount()}
						pageCount={table.getPageCount()}
						setVisiblePages={setVisiblePages}
						gotoPage={(e) => table.setPageIndex(e)}
					/>
				</div>
				<Select onValueChange={(e) => table.setPageSize(Number(e))}>
					<SelectTrigger className='w-64'>
						<SelectValue placeholder={"Rows per page: 10"} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Rows per page</SelectLabel>
							<SelectItem value='10'>10</SelectItem>
							<SelectItem value='25'>25</SelectItem>
							<SelectItem value='50'>50</SelectItem>
							<SelectItem value='100'>100</SelectItem>
							<SelectItem value='500'>500</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
