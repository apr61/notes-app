import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { Editor } from "@monaco-editor/react"
import { NoteDataType, NoteType } from "../context/Notes"
import toast from "react-hot-toast"
import MarkdownPreview from "./MarkdownPreview"

type NoteFormProps = {
	onSubmit: (data: NoteDataType) => void,
} & Partial<NoteType>

const NoteForm = ({ onSubmit, title : editTitle = "", markdown: editMarkdown = "" }: NoteFormProps) => {
	const [title, setTitle] = useState<string>(editTitle)
	const [markdown, setMarkdown] = useState<string | undefined>(editMarkdown)

	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('..')
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (markdown?.trim().length === 0) {
			toast.error('Note can\'t be empty')
			return 
		}
		onSubmit({
			title: title,
			markdown: markdown as string,
		})
	}

	const handleEditorText = (value: string | undefined) => {
		setMarkdown(value)
	}

	return (
		<form className="my-4 flex gap-4 flex-col" onSubmit={handleSubmit}>
			<div className="flex gap-2">
				<div className="flex flex-col gap-2 grow">
					<input
						type="text"
						id="title"
						name="title"
						className="border-2 rounded-md border-gray-200 px-2 py-1"
						autoFocus={true}
						defaultValue={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter title of note"
						required />
				</div>
				<div className="ml-auto flex gap-4">
					<Button
						btnType="submit"
						styles="py-2 px-6 rounded-md bg-blue-500 text-white hover:bg-blue-600 self-end"
						text="Save"
						handleClick={() => { }}
					/>
					<Button
						btnType="button"
						styles="py-2 px-6 rounded-md bg-gray-500 text-white hover:bg-gray-600 self-end"
						handleClick={handleCancel}
						text="Cancel"
					/>
				</div>
			</div>
			<div className="grid grid-cols-[1fr_30rem] gap-2">
				<Editor
					height='75vh'
					className="w-1/2 p-2 rounded-md border"
					defaultValue={markdown}
					onChange={handleEditorText}
					defaultLanguage="markdown"
				/>
				<div className="h-[75vh] p-4 border-2 rounded-md overflow-y-scroll">
					<MarkdownPreview markdown={markdown as string} />
				</div>
			</div>
		</form>
	)
}

export default NoteForm