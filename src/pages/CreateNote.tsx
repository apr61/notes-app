import toast from "react-hot-toast"
import Navbar from "../components/Navbar"
import NoteForm from "../components/NoteForm"
import { addNewNote } from "../services/notes"
import { useState } from "react"
import { NoteDataType } from "../context/Notes"
import useNotes from "../hooks/useNotes"

const CreateNote = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setNotes } = useNotes()

    const createNewNote = async (data: NoteDataType) => {
        try {
            setLoading(true)
            const response = await addNewNote(data)
            setNotes(prev => [...prev, response])
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
        finally {
            setLoading(false)
            toast.success("Note created successfully!!!")
        }
    }
    if (loading) return <h1>Loading...</h1>
    document.title = 'Create new note - Notes App'
    return (
        <>
            <Navbar />
            <div className="m-2">
                <h3 className="text-2xl">New Note</h3>
                <NoteForm onSubmit={createNewNote} />
            </div>
        </>
    )
}

export default CreateNote