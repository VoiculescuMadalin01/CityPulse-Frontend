import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "../ui/button"
import { clsx } from "clsx"
import { toast } from "sonner"

interface ImageUploaderProps {
	// eslint-disable-next-line no-unused-vars
	imagesPreviewUrl: string[]
	// eslint-disable-next-line no-unused-vars
	onRemove: (fileName: string, updatedPreviews: string[]) => void
	// eslint-disable-next-line no-unused-vars
	onFilesSelected: (buffers: Blob[]) => void // Callback to send buffers to the backend
}

const IMAGE_MAX_SIZE = 1024 * 1024 * 2 // 2MB

const MultipleImageUploader = ({ imagesPreviewUrl, onRemove, onFilesSelected }: ImageUploaderProps) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const oversizedFiles = acceptedFiles.filter((file) => file.size >= IMAGE_MAX_SIZE)
			const filteredFiles = acceptedFiles.filter((file) => file.size < IMAGE_MAX_SIZE)
			const newPreviews = filteredFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				}),
			)

			if (oversizedFiles.length > 0) {
				toast.error("Upload image failed", { description: "Uploaded file exceed 2MB limit" }) // Handle the oversized files here
			}

			onFilesSelected(newPreviews)
		},
		[onFilesSelected],
	)

	const { getRootProps, getInputProps, isDragAccept, isDragReject, open } = useDropzone({
		onDrop,
		onError(err) {
			toast.error("Error", { description: err.message })
		},
		multiple: true,
		noClick: true,
		maxFiles: 12,
		accept: {
			"image/jpeg": [".jpeg"],
			"image/jpg": [".jpg"],
			"image/png": [".png"],
			"image/webp": [".webp"],
		},
	})
	const removeImage = (fileUrl: string) => {
		const fileName = fileUrl.split("/").pop() || ""

		// Filter the previews array
		const updatedPreviews = imagesPreviewUrl.filter((file) => !file.endsWith(fileName))

		onRemove(fileName, updatedPreviews)
	}

	return (
		<div className='flex flex-col w-full gap-4'>
			<div
				{...getRootProps()}
				className={clsx(
					"flex flex-col items-center justify-center p-3 rounded-lg text-center border-2 border-dashed h-full cursor-pointer",
					{
						"border-red-700 cursor-wait": isDragReject,
						"border-primary": isDragAccept,
					},
				)}
			>
				<input {...getInputProps()} />
				<span className='flex flex-col justify-center'>
					<div>
						<p className='text-sm'>Drag & drop images here,</p>
					</div>
					<div className='flex justify-center gap-1'>
						<p className='text-sm'>or </p>

						<button
							type='button'
							onClick={open}
							className='border-b text-primary-700 border-primary-700 hover:text-primary-500 hover:border-primary-500'
						>
							<p className='text-sm font-bold text-green-600'>Choose file</p>
						</button>
						<p className='text-sm'>to import</p>
					</div>
				</span>
				<p className='pt-2 pb-2 text-xs text-gray-900'>.jpeg, .jpg, .png, .webp (2MB Max each)</p>
				<div className='flex flex-wrap w-full gap-4'>
					{imagesPreviewUrl.map((file, index) => (
						<div key={index} className='relative w-48 h-48 max-h-48'>
							<img
								src={file}
								alt={`preview ${index}`}
								className='object-cover w-48 h-full rounded-lg'
								onLoad={() => {
									URL.revokeObjectURL(file)
								}}
							/>
							<Button
								className='absolute bottom-2 right-2'
								type='button'
								variant={"outline"}
								onClick={() => removeImage(file)}
							>
								Remove
							</Button>
						</div>
					))}
				</div>
				{imagesPreviewUrl.length >= 1 && (
					<p className='pt-2 text-xs text-red-600'>Changes can take up to 2 minutes</p>
				)}
			</div>
		</div>
	)
}

export default MultipleImageUploader
