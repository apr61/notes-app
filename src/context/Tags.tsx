import { ReactNode, createContext, useEffect, useState } from "react";
import { getAllTags } from "../services/tags";
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
    isLoading: boolean
}

type TagsProviderType = {
    children: ReactNode
}

const initValue: TagType[] = []

const initContextState: UseTagsContextType = {
    availableTags: [],
    isLoading: false
}

export const TagsContext = createContext(initContextState)

const TagsProvider = ({ children }: TagsProviderType): ReactNode => {
    const [availableTags, setAvailableTags] = useState<TagType[]>(initValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)

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

    return <TagsContext.Provider value={{ availableTags, isLoading }}>
        {children}
    </TagsContext.Provider>
}

export default TagsProvider