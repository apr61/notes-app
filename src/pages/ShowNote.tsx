import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteNoteById, getNoteById } from "../services/notes"
import { NoteType } from "../context/Notes"
import toast from "react-hot-toast"
import {NotFound} from "../components"
import {MarkdownPreview} from "../components"
import { Button } from "../components"
import { ShowNoteSkeleton } from "../components/Skeletons"
import SingleTag from "../features/tags/SingleTag"
import { useAppDispatch } from "../app/hooks"
import { deleteNote } from "../features/notes/notesSlice"

const ShowNote = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [note, setNote] = useState<NoteType | null>()
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    ; (async (id: string) => {
      try {
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

  if (isLoading) return <ShowNoteSkeleton />

  if (note === null) return <NotFound />

  const handleBack = () => {
    navigate(-1)
  }

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true)
      await deleteNoteById(id)
      dispatch(deleteNote(id))
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error deleting note!!!")
      }
    } finally {
      setIsLoading(false)
      toast.success("Note deleted successfully!!!")
      navigate('/')
    }
  }

  document.title = note?.title as string
  return (
    <div className="my-2 md:my-4 p-2">
      <header className="flex gap-2 md:gap-4 items-center">
        <button
          onClick={handleBack}
          className="text-3xl md:text-4xl"
        >&#8592;</button>
        <h2 className="text-3xl md:text-4xl font-bold">{note?.title}</h2>
        <div className="ml-auto flex gap-2 md:gap-4">
          <Link
            className="py-2 px-3 md:px-6 rounded-md bg-blue-500 text-white hover:bg-blue-600 self-end"
            to={`/${id}/edit`}
          >Edit</Link>
          <Button
            styles="py-2 px-2 md:px-6 rounded-md text-red-500 border border-red-500 hover:bg-red-500 hover:text-white self-end"
            handleClick={() => handleDelete(id!)}
            text="Delete"
          />
        </div>
      </header>
      <div className="flex gap-2 my-4 ml-4 md:ml-14">
        {
          note?.tagIds.map(tagId => (
            <SingleTag key={tagId} tagId={tagId} />
          ))
        }
      </div>
      <div className="mt-6">
        <MarkdownPreview markdown={note?.markdown as string} />
      </div>
    </div>
  )
}

export default ShowNote