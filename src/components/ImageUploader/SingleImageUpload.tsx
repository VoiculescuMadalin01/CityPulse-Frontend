import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "../ui/button"
import clsx from "clsx"
import { toast } from "sonner"

interface ImageUploaderProps {
	imagePreviewUrl: string
	// eslint-disable-next-line no-unused-vars
	onFilesSelected: (file: File) => void
	onRemove: () => void
}

const IMAGE_MAX_SIZE = 1024 * 1024 * 2

const SingleImageUpload = ({ imagePreviewUrl, onFilesSelected, onRemove }: ImageUploaderProps) => {
	const [preview, setPreview] = useState<Array<File & { preview: string }>>([])

	const { getRootProps, getInputProps, isDragAccept, isDragReject, open } = useDropzone({
		onDrop: async (acceptedFiles) => {
			if (acceptedFiles[0].size < IMAGE_MAX_SIZE) {
				setPreview(
					acceptedFiles.map((file) =>
						Object.assign(file, {
							preview: URL.createObjectURL(file),
						}),
					),
				)
				onFilesSelected(acceptedFiles[0])
			} else {
				toast.error("Upload image failed", { description: "Uploaded file exceed 2MB limit" }) // Handle the oversized files here
			}
		},
		multiple: false,
		noClick: true,
		maxFiles: 1,
		accept: {
			"image/jpeg": [".jpeg"],
			"image/jpg": [".jpg"],
			"image/png": [".png"],
			"image/webp": [".webp"],
		},
	})
	return (
		<div
			{...getRootProps()}
			className={clsx(
				"flex flex-col items-center justify-center w-64 p-3 rounded-lg text-center border-2 border-dashed h-full",
				{
					"border-red-700 cursor-wait": isDragReject,
					"border-primary": isDragAccept,
				},
			)}
		>
			<input aria-label='Drop your image' {...getInputProps()} />
			<span className='flex flex-col justify-center'>
				<div>
					<p className='text-sm'>Drag & drop image here,</p>
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
			<p className='pt-2 text-xs text-gray-900'>.jpeg, .jpg, .png, .webp (2MB Max)</p>
			{(imagePreviewUrl || preview[0]) && (
				<div className='relative flex flex-col items-center gap-2 p-2 rounded-lg border border-white/[0.12]'>
					<div className='relative w-full h-48 max-h-48'>
						<img
							src={preview[0]?.preview ? preview[0]?.preview : imagePreviewUrl}
							alt='preview'
							className='object-cover w-full h-48 rounded-lg'
							onLoad={() => {
								URL.revokeObjectURL(preview[0]?.preview ? preview[0]?.preview : imagePreviewUrl)
							}}
						/>
					</div>
					<div className='absolute bottom-4 right-4'>
						<Button
							type='button'
							onClick={() => {
								setPreview([])
								onRemove()
							}}
						>
							Remove
						</Button>
					</div>
				</div>
			)}
			{(imagePreviewUrl || preview[0]) && (
				<p className='text-xs text-red-600'>Changes can take up to 2 minutes</p>
			)}
		</div>
	)
}

export default SingleImageUpload
