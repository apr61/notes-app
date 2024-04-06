import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import NoteForm from "../components/NoteForm"
import { NoteDataType, NoteType } from "../context/Notes"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { getNoteById, updateNoteById } from "../services/notes"
import NotFound from "../components/NotFound"
import useNotes from "../hooks/useNotes"

const EditNote = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [note, setNote] = useState<NoteType | null>()
    const { setNotes } = useNotes()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        ; (async (id: string) => {
            try {
                setIsLoading(true)
                const data = await getNoteById(id)
                setNote(data)
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        })(id as string)
    }, [id])

    const editNote = async (data: NoteDataType) => {
        try {
            setIsLoading(true)
            await updateNoteById({ id: id as string, ...data })
            setNotes(prev => {
                const existingNotes = prev.filter(note => note.id !== id)
                return [...existingNotes, { id: id as string, ...data }]
            })
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
        finally {
            setIsLoading(false)
            toast.success("Note updated successfully!!!")
            navigate(`/${id}`)
        }
    }

    if (isLoading) return <h1>Loading...</h1>

    if (note === null) return <NotFound />
    document.title = `Edit - ${note?.title as string} - Notes App`
    return (
        <>
            <Navbar />
            <div className="m-2">
                <h3 className="text-2xl">Edit Note</h3>
                <NoteForm
                    onSubmit={editNote}
                    id={note?.id}
                    title={note?.title}
                    markdown={note?.markdown}
                />
            </div>
        </>
    )
}

export default EditNote