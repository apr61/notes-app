import { useState } from "react"
import useTags from "../hooks/useTags"
import Button from "./Button"
import toast from "react-hot-toast"
import { TagType } from "../context/Tags"

const TagsList = () => {
    const { isLoading, availableTags, addNewTagFn, deleteTagFn, updateTagFn } = useTags()
    const [value, setValue] = useState<string>('')
    const [edit, setEdit] = useState<TagType | undefined>(undefined)

    const handleAddOnClick = () => {
        if (value.trim().length === 0) {
            toast.error("New tag must be required...")
            return
        }
        if (edit) {
            updateTagFn({id: edit.id, tag: value})
            return
        }
        addNewTagFn({ tag: value })
        setValue('')
        setEdit(undefined)
    }

    const handleOnEdit = (id: string) => {
        const editingTag = availableTags.filter(tag => tag.id === id)[0]
        setValue(editingTag.tag)
        setEdit(editingTag)
    }
    // TODO:: Edit of TAG after adding a TAG is not  working.

    const content = availableTags.map((tag) => (
        <div className="flex gap-2 my-2" key={tag.id}>
            <input
                type="text"
                className="border p-2 rounded-md w-full"
                value={tag.tag}
                readOnly={true}
            />
            <Button
                text="Edit"
                handleClick={() => handleOnEdit(tag.id)}
                styles="p-2 md:p-3 bg-blue-500 rounded-md text-white hover:bg-blue-600"
            />
            <Button
                text="Delete"
                handleClick={() => deleteTagFn(tag.id)}
                styles="p-2 md:p-3 bg-red-500 rounded-md text-white hover:bg-red-600"
            />
        </div>
    ))

    return (
        <section>
            <h2 className="text-2xl">Tags</h2>
            <div className="my-2 flex gap-2 items-center">
                <input
                    type="text"
                    id="new-tag"
                    className="border p-2 rounded-md w-full"
                    placeholder="New Tag"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button
                    text={edit ? "Update" : `Add`}
                    handleClick={handleAddOnClick}
                    styles="px-2 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-600 text-xl text-center"
                />
            </div>
            <h3 className="text-lg">Available Tags</h3>
            <div className="my-2 h-[20rem] overflow-y-scroll shadow-inner">
                {
                    isLoading ? <h1>Loading...</h1> : content
                }
            </div>
        </section>
    )
}

export default TagsList