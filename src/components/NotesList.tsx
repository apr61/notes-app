import useNotes from "../hooks/useNotes"
import NoteCard from "./NoteCard"
import { NotesListSkeleton } from "./Skeletons"

const NotesList = () => {
    const { isLoading, notes } = useNotes()
    if(isLoading) return <NotesListSkeleton />
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-3 mt-4">
            {
                notes.map(note => <NoteCard key={note.id} id={note.id} title={note.title} tagIds={note.tagIds} />)
            }
        </div>
    )
}

export default NotesList