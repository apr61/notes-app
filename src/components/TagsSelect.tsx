import { ChangeEvent } from "react"
import useTags from "../hooks/useTags"
import { TagType } from "../context/Tags"

type TagsSelectProps = {
	selectedTags: TagType[],
	setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>
}

const TagsSelect = ({ selectedTags, setSelectedTags }: TagsSelectProps) => {

	const { isLoading, availableTags } = useTags()

	function handleOnChange(e: ChangeEvent<HTMLSelectElement>) {
		const tagId = e.target.value
		setSelectedTags(prev => {
			let newTag: TagType | undefined
			if ((prev.every(tag => tag.id !== tagId) === true) || prev.length === 0) {
				newTag = availableTags.filter(tag => tag.id === tagId)[0]
			}
			if (newTag === undefined) {
				return prev
			}
			return [...prev, newTag] as TagType[]
		})
	}

	const isTagSelected = (id: string) => {
		const res = selectedTags?.some(tag => tag.id === id)
		return res
	}

	return (
		<>
			<select onChange={handleOnChange} title="Tags" name="tags" className="px-4 py-2 border rounded-md capitalize w-full">
				<option className="capitalize" value="">{isLoading ? "Loading..." : "Select Tag"}</option>
				{
					availableTags.map(tag => (
						<option
							key={tag.id}
							value={tag.id}
							className={`capitalize p-4 ${isTagSelected(tag.id) && "bg-blue-400 text-white"}`}
						>
							{tag.tag}
						</option>
					))
				}
			</select>
		</>
	)
}

export default TagsSelect