import { ChangeEvent, useEffect } from "react"
import { fetchAllTags, getTagsStatus, selectAllTags } from "./tagsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

type TagsSelectProps = {
	selectedTags: string[],
	setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
}

const TagsSelect = ({ selectedTags, setSelectedTags }: TagsSelectProps) => {

	const availableTags = useAppSelector(selectAllTags)
    const tagsStatus = useAppSelector(getTagsStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(tagsStatus === 'idle'){
            dispatch(fetchAllTags())
        }
    }, [])

	function handleOnChange(e: ChangeEvent<HTMLSelectElement>) {
		const tagId = e.target.value
		setSelectedTags(prev => {
			let newTag: string | undefined
			if ((prev.every(id => id !== tagId) === true) || prev.length === 0) {
				for(const tag of availableTags){
					if(tag.id === tagId){
						newTag = tagId
					}
				}
			}
			if (newTag === undefined) {
				return prev
			}
			return [...prev, newTag]
		})
	}

	const isTagSelected = (id: string) => {
		const res = selectedTags?.some(tagId => tagId === id)
		return res
	}

	return (
		<>
			<select onChange={handleOnChange} title="Tags" name="tags" className="px-4 py-2 border rounded-md capitalize w-full dark:bg-black dark:border-gray-800">
				<option className="capitalize" value="">{tagsStatus === 'loading' ? "Loading..." : "Select Tag"}</option>
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