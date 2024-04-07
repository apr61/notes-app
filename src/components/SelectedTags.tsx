import { TagType } from "../context/Tags"

type SelectedTagsListProps = {
    selectedTags: TagType[],
    handleRemoveTag: (id: string) => void
}

const SelectedTagsList = ({ selectedTags, handleRemoveTag }: SelectedTagsListProps) => {
    return (
        <div className="flex gap-2 flex-wrap">
            {selectedTags?.map(tags => (
                <button
                    type="button"
                    key={tags.id}
                    className="bg-blue-500 hover:bg-blue-600 capitalize text-white px-2 py-1 rounded-md"
                    onClick={() => handleRemoveTag(tags.id)}
                >
                    {tags.tag}
                    <span className="ml-1 text-lg font-bold">&times;</span>
                </button>
            ))}
        </div>
    )
}

export default SelectedTagsList