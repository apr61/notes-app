import { useEffect, useState } from "react"
import { Navbar } from "../components"
import { NotFound } from "../components"
import NoteForm from "../features/notes/NoteForm"
import { NoteDataType, NoteType } from "../context/Notes"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { getNoteById, updateNoteById } from "../services/notes"
import { useAppDispatch } from "../app/hooks"
import { updateNote } from "../features/notes/notesSlice"

const EditNote = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [note, setNote] = useState<NoteType | null>()
	const dispatch = useAppDispatch()
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
			const response = await updateNoteById(id as string, { ...data })
			dispatch(updateNote(response))
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

	if (note === null) return <NotFound />

	document.title = `Edit - ${note?.title as string} - Notes App`

	return (
		<>
			<Navbar />
			<div className="m-2">
				<h3 className="text-xl my-1">Edit Note</h3>
				{
					isLoading ? <h1>Loading...</h1> : (
						<NoteForm
							onSubmit={editNote}
							id={note?.id}
							title={note?.title}
							markdown={note?.markdown}
							tagIds={note?.tagIds}
						/>
					)
				}
			</div>
		</>
	)
}

export default EditNote