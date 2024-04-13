
import NoteCard from "./NoteCard"
import { NotesListSkeleton } from "../../components/Skeletons"
import { useAppSelector } from "../../app/hooks"
import { getNotesError, getNotesStatus, selectAllNotes } from "./notesSlice"
import toast from "react-hot-toast"

const NotesList = () => {
	const notesStatus = useAppSelector(getNotesStatus)
	const notes = useAppSelector(selectAllNotes)
	const notesError = useAppSelector(getNotesError)

	if (notesStatus === "loading") return <NotesListSkeleton />
	if(notesStatus === "failed") toast.error(notesError)
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-3 mt-4">
			{
				notes.length > 0 ? 
				notes.map(note =>
					<NoteCard
						key={note.id}
						id={note.id}
						title={note.title}
						tagIds={note.tagIds}
					/>
				) : (
					<div>
						<p className="text-xl">No notes found...</p>
					</div>
				)
			}
		</div>
	)
}

export default NotesList