import { ReactNode, createContext, useEffect, useState } from "react"
import { getAllNotes } from "../services/notes"
import toast from "react-hot-toast"
import { TagType } from "./Tags"

export type NoteType = {
    id: string,
    title: string,
    markdown: string,
    tags: TagType[]
}

export type NoteDataType = {
    title: string,
    markdown: string
    tagIds: string[]
}

export type UseNotesContextType = {
    notes: NoteType[],
    isLoading: boolean,
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>
}

type NotesProviderProps = {
    children: ReactNode
}

const initValue: NoteType[] = []

const initContextState: UseNotesContextType = { notes: [], isLoading: false, setNotes: () => { } }

export const NotesContext = createContext<UseNotesContextType>(initContextState)

const NotesProvider = ({ children }: NotesProviderProps): ReactNode => {
    const [notes, setNotes] = useState<NoteType[]>(initValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const getAllNotesHelper = async () => {
        try {
            setIsLoading(true)
            const data: NoteType[] = await getAllNotes()
            setNotes(data)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Error loading data')
                setNotes([])
                return
            }
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllNotesHelper()
    }, [])

    return <NotesContext.Provider value={{ notes, isLoading, setNotes }}>
        {children}
    </NotesContext.Provider>
}

export default NotesProvider