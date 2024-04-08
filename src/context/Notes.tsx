import { ReactNode, createContext, useEffect, useState } from "react"
import { deleteNoteById, getAllNotes } from "../services/notes"
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

export type UseNotesContextType = {
    notes: NoteType[],
    isLoading: boolean,
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>,
    handleDeleteNote: (id: string) => Promise<void>
}

type NotesProviderProps = {
    children: ReactNode
}

const initValue: NoteType[] = []

const initContextState: UseNotesContextType = { 
    notes: [], 
    isLoading: false, 
    setNotes: () => { },
    handleDeleteNote: async () => { }
}

export const NotesContext = createContext<UseNotesContextType>(initContextState)

const NotesProvider = ({ children }: NotesProviderProps): ReactNode => {
    const [notes, setNotes] = useState<NoteType[]>(initValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()
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
    useEffect(() => {
        getAllNotesHelper()
    }, [])

    return <NotesContext.Provider value={{ notes, isLoading, setNotes, handleDeleteNote }}>
        {children}
    </NotesContext.Provider>
}

export default NotesProvider