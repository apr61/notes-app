import Navbar from "../components/Navbar"
import NoteForm from "../features/notes/NoteForm"
import useNotes from "../hooks/useNotes"

const CreateNote = () => {
    const { createNewNote } = useNotes()

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