import { ReactNode, createContext, useEffect, useState } from "react"
import { addNewNote, deleteNoteById, getAllNotes } from "../services/notes"
import toast from "react-hot-toast"
import { TagType } from "./Tags"
import { useNavigate } from "react-router-dom"

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

export type NoteDbType = {
    id: string,
    title: string,
    markdown: string,
    tagIds: string[]
}

export type UseNotesContextType = {
    notes: NoteDbType[],
    isLoading: boolean,
    setNotes: React.Dispatch<React.SetStateAction<NoteDbType[]>>,
    handleDeleteNote: (id: string) => Promise<void>,
    createNewNote: (data: NoteDataType) => Promise<void>
}

type NotesProviderProps = {
    children: ReactNode
}

const initValue: NoteDbType[] = []

const initContextState: UseNotesContextType = {
    notes: [],
    isLoading: false,
    setNotes: () => { },
    handleDeleteNote: async () => { },
    createNewNote: async () => { }
}

export const NotesContext = createContext<UseNotesContextType>(initContextState)

const NotesProvider = ({ children }: NotesProviderProps): ReactNode => {
    const [notes, setNotes] = useState<NoteDbType[]>(initValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()


    const getAllNotesHelper = async () => {
        try {
            setIsLoading(true)
            let data: NoteDbType[] = await getAllNotes()
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
    const handleDeleteNote = async (id: string) => {
        try {
            setIsLoading(true)
            await deleteNoteById(id)
            setNotes(prev => prev.filter(note => note.id !== id))
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
                return
            }
        } finally {
            setIsLoading(false)
            toast.success('Note deleted successfully')
        }
        navigate('/')
    }
    const createNewNote = async (data: NoteDataType) => {
        try {
            setIsLoading(true)
            const response = await addNewNote(data)
            setNotes(prev => [...prev, response])
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
        finally {
            setIsLoading(false)
            toast.success("Note created successfully!!!")
            navigate('/')
        }
    }
    useEffect(() => {
        getAllNotesHelper()
    }, [])

    return <NotesContext.Provider value={
        {
            notes,
            isLoading,
            setNotes,
            handleDeleteNote,
            createNewNote
        }}>
        {children}
    </NotesContext.Provider>
}

export default NotesProvider