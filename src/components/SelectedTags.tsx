import useTags from "../hooks/useTags"

type SelectedTagsListProps = {
    selectedTags: string[],
    handleRemoveTag: (id: string) => void
}

const SelectedTagsList = ({ selectedTags, handleRemoveTag }: SelectedTagsListProps) => {
    const { getTagById } = useTags()
    return (
        <div className="flex gap-2 flex-wrap">
            {selectedTags?.map(tagId => {
                const tag = getTagById(tagId)
                return tag && <button
                    type="button"
                    key={tagId}
                    className="bg-blue-500 hover:bg-blue-600 capitalize text-white px-2 py-1 rounded-md"
                    onClick={() => handleRemoveTag(tagId)}
                >
                    {tag?.tag}
                    <span className="ml-1 text-lg font-bold">&times;</span>
                </button>

            }
            )}
        </div>
    )
}

export default SelectedTagsList