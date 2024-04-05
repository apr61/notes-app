import { FormEvent, useState } from "react"
import Markdown from "react-markdown"
import { useNavigate } from "react-router-dom"
import remarkGfm from 'remark-gfm'
import Button from "./Button"

type NoteFormProps = {
	onSubmit: (data: any) => void,
}

const NoteForm = ({ onSubmit }: NoteFormProps) => {
	const [title, setTitle] = useState<string>('')
	const [markdown, setMarkdown] = useState<string>('')

	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('..')
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		onSubmit({
			title: title,
			markdown: markdown,
		})
		navigate('..')
	}

	const handleTextAreaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdown(e.target.value)
		e.target.style.height = 'inherit'
		e.target.style.height = `${e.target.scrollHeight}px`
	}

	return (
		<form className="my-4 flex gap-4 flex-col" onSubmit={handleSubmit}>
			<div className="flex gap-2">
				<div className="flex flex-col gap-2 grow">
					<label htmlFor="title" className="text-xl">Title</label>
					<input
						type="text"
						id="title"
						name="title"
						className="border-2 rounded-md border-gray-200 px-2 py-1"
						autoFocus={true}
						defaultValue={title}
						onChange={(e) => setTitle(e.target.value)}
						required />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="body" className="text-xl">Body</label>
				<div className="flex gap-2 w-full">
					<textarea
						id="body"
						name="body"
						rows={15}
						className="border-2 rounded-md border-gray-200 p-4 text-lg resize-none overflow-hidden w-1/2"
						defaultValue={markdown}
						onChange={handleTextAreaOnChange}
						required
					>
					</textarea>
					<div className="w-1/2 p-4 border-2 rounded-md overflow-auto">
						<Markdown className="prose" remarkPlugins={[remarkGfm]}>
							{markdown}
						</Markdown>
					</div>
				</div>
			</div>
			<div className="ml-auto flex gap-4">
				<Button
					btnType="submit"
					styles="py-2 px-6 rounded-md bg-blue-500 text-white hover:bg-blue-600"
					text="Create"
					handleClick={() => {}}
				/>
				<Button
					btnType="button"
					styles="py-2 px-6 rounded-md bg-gray-500 text-white hover:bg-gray-600"
					handleClick={handleCancel}
					text="Cancel"
				/>
			</div>
		</form>
	)
}

export default NoteForm