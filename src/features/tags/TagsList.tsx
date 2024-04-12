import { useState } from "react"
import Button from "../../components/Button"
import toast from "react-hot-toast"
import { TagType } from "../../context/Tags"
import { addTag, deleteTag, editTag, selectAllTags } from "./tagsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

const TagsList = () => {
    const [value, setValue] = useState<string>('')
    const [edit, setEdit] = useState<TagType | undefined>(undefined)

    const availableTags = useAppSelector(selectAllTags)
    const dispatch = useAppDispatch()

    const handleAddOnClick = () => {
        if (value.trim().length === 0) {
            toast.error("New tag must be required...")
            setValue('')
            setEdit(undefined)
            return
        }
        if (edit) {
            // updateTagFn({ id: edit.id, tag: value })
            dispatch(editTag({id: edit.id, tag: value}))
            setValue('')
            setEdit(undefined)
            return
        }
        dispatch(addTag({tag: value}))
        setValue('')
        setEdit(undefined)
    }

    const handleOnEdit = (id: string) => {
        const editingTag = availableTags.filter(tag => tag.id === id)[0]
        setValue(editingTag.tag)
        setEdit(editingTag)
    }

    const content = availableTags.map((tag) => (
        <div className="flex gap-2 my-2" key={tag.id}>
            <input
                type="text"
                className="border dark:border-gray-800 p-2 rounded-md w-full dark:bg-black"
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
                handleClick={() => dispatch(deleteTag(tag.id))}
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
                    className="border dark:border-gray-800 p-2 rounded-md w-full dark:bg-black"
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
            <div className="my-2 h-[20rem] overflow-y-scroll shadow-inner dark:shadow-slate-800">
                {
                    content
                }
            </div>
        </section>
    )
}

export default TagsList