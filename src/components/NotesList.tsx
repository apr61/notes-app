import useNotes from "../hooks/useNotes"
import NoteCard from "./NoteCard"

const NotesList = () => {
    const { notes, isLoading } = useNotes()
    if(isLoading) return <h1>Loading...</h1>
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-3 mt-4">
            {
                notes.map(note => <NoteCard key={note.id} id={note.id} title={note.title} />)
            }
        </div>
    )
}

export default NotesList