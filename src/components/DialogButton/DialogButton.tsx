import React, { useState } from "react"
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "../ui/dialog"
import { Button } from "../ui/button"

function DialogButton({ children, onDelete }: { children: React.ReactElement; onDelete: () => void }) {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete selected values.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						type='button'
						variant={"destructive"}
						onClick={() => {
							onDelete()
							setOpen(false)
						}}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DialogButton
