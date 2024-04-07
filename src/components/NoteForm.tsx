import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { Editor } from "@monaco-editor/react"
import { NoteDataType, NoteType } from "../context/Notes"
import toast from "react-hot-toast"
import MarkdownPreview from "./MarkdownPreview"
import TagsSelect from "./TagsSelect"
import { TagType } from "../context/Tags"
import SelectedTagsList from "./SelectedTags"

type NoteFormProps = {
	onSubmit: (data: NoteDataType) => void,
} & Partial<NoteType>

const NoteForm = ({ onSubmit, title: editTitle = "", markdown: editMarkdown = "", tags = [] }: NoteFormProps) => {
	const [title, setTitle] = useState<string>(editTitle)
	const [markdown, setMarkdown] = useState<string | undefined>(editMarkdown)
	const [selectedTags, setSelectedTags] = useState<TagType[]>(tags as TagType[])

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
			tagIds: selectedTags.map(tag => tag.id)
		})
	}

	const handleEditorText = (value: string | undefined) => {
		setMarkdown(value)
	}

	const handleRemoveTag = (id: string) => {
		setSelectedTags(prev => prev.filter(tags => tags.id !== id))
	}

	return (
		<form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
			<div className="flex flex-col md:flex-row gap-2 md:items-center">
				<div className="flex flex-col md:flex-row gap-2 max-w-[70rem] w-full">
					<div className="w-full md:w-1/2">
						<input
							type="text"
							name="title"
							className="w-full border-2 rounded-md border-gray-200 px-3 py-2"
							autoFocus={true}
							defaultValue={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter title of note..."
							required />
					</div>
					<div className="flex gap-2 flex-wrap w-full md:w-1/2">
						<TagsSelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
					</div>
				</div>
				<div className="flex gap-2 md:ml-auto self-start md:self-center">
					<Button
						btnType="submit"
						styles="py-2 lg:px-6 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
						text="Save"
						handleClick={() => { }}
					/>
					<Button
						btnType="button"
						styles="py-2 lg:px-6 px-4 rounded-md bg-gray-500 text-white hover:bg-gray-600"
						handleClick={handleCancel}
						text="Cancel"
					/>
				</div>
			</div>
			<SelectedTagsList selectedTags={selectedTags} handleRemoveTag={handleRemoveTag} />
			<div className="md:grid md:grid-cols-2 lg:grid-cols-[1fr_22rem] xl:grid-cols-[1fr_27rem] gap-2">
				<Editor
					height='73vh'
					className="md:w-1/2 p-2 rounded-md border"
					defaultValue={markdown}
					onChange={handleEditorText}
					defaultLanguage="markdown"
				/>
				<div className="h-[73vh] p-4 border-2 rounded-md overflow-y-scroll">
					<MarkdownPreview markdown={markdown as string} />
				</div>
			</div>
		</form>
	)
}

export default NoteForm