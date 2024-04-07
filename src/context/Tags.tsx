import { ReactNode, createContext, useEffect, useState } from "react";
import { addNewTag, deleteTagById, getAllTags, updateTagById } from "../services/tags";
import toast from "react-hot-toast";

export type TagType = {
    tag: string,
    id: string,
}

export type TagDataType = {
    tag: string
}

export type UseTagsContextType = {
    availableTags: TagType[],
    isLoading: boolean,
    viewTagsModal: boolean,
    setViewTagsModal: React.Dispatch<React.SetStateAction<boolean>>,
    addNewTagFn: (tagLabel: TagDataType) => Promise<void>,
    deleteTagFn: (id: string) => Promise<void>,
    updateTagFn: (updatedData: TagType) => Promise<void>
}

type TagsProviderType = {
    children: ReactNode
}

const initValue: TagType[] = []

const initContextState: UseTagsContextType = {
    availableTags: [],
    isLoading: false,
    viewTagsModal: false,
    setViewTagsModal: () => { },
    addNewTagFn: async () => { },
    deleteTagFn: async () => { },
    updateTagFn: async () => { }
}

export const TagsContext = createContext(initContextState)

const TagsProvider = ({ children }: TagsProviderType): ReactNode => {
    const [availableTags, setAvailableTags] = useState<TagType[]>(initValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [viewTagsModal, setViewTagsModal] = useState<boolean>(false)

    const addNewTagFn = async (tagLabel: TagDataType) => {
        try {
            setIsLoading(true)
            const response = await addNewTag(tagLabel)
            setAvailableTags(prev => [...prev, response])
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Error adding new tag!!!")
            }
        } finally {
            setIsLoading(false)
            toast.success("Tag added successfully!!!")
        }
    }

    const deleteTagFn = async (id: string) => {
        try {
            setIsLoading(true)
            await deleteTagById(id)
            setAvailableTags(prev => prev.filter(tag => tag.id !== id))
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Error deleting tag!!!")
            }
        } finally {
            setIsLoading(false)
            toast.success("Tag deleted successfully!!!")
        }
    }

    const updateTagFn = async (updatedData: TagType) => {
        try {
            setIsLoading(true)
            const response = await updateTagById(updatedData)
            setAvailableTags(prev => {
                return prev.map(tag => {
                    if (tag.id === updatedData.id) {
                        return response as TagType
                    } else {
                        return tag
                    }
                })
            })
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Error updating tag!!!")
            }
        } finally {
            setIsLoading(false)
            toast.success("Tag updated successfully!!!")
        }
    }

    useEffect(() => {
        ; (async () => {
            try {
                setIsLoading(true)
                const response: TagType[] = await getAllTags()
                setAvailableTags(response)
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    return <TagsContext.Provider value={{
        availableTags,
        isLoading,
        viewTagsModal,
        setViewTagsModal,
        addNewTagFn,
        deleteTagFn,
        updateTagFn
    }}>
        {children}
    </TagsContext.Provider>
}

export default TagsProvider