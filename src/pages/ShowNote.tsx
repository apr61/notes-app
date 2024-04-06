import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteNoteById, getNoteById } from "../services/notes"
import { NoteType } from "../context/Notes"
import toast from "react-hot-toast"
import NotFound from "../components/NotFound"
import MarkdownPreview from "../components/MarkdownPreview"
import Button from "../components/Button"

const ShowNote = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [note, setNote] = useState<NoteType | null>()
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

  if (isLoading) return <h1>Loading...</h1>

  if (note === null) return <NotFound />

  const handleBack = () => {
    navigate(-1)
  }

  const handleDeleteNote = async (id: string) => {
    try {
      setIsLoading(true)
      await deleteNoteById(id)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        return
      }
    } finally{
      setIsLoading(false)
      toast.success('Note deleted successfully')
    }
    navigate('/')
  }
  document.title = note?.title as string

  return (
    <div className="my-4 p-2">
      <header className="flex gap-4 items-center">
        <button
          onClick={handleBack}
          className="text-4xl w-10 h-10"
        >&#8592;</button>
        <h2 className="text-4xl font-bold">{note?.title}</h2>
        <div className="ml-auto flex gap-4">
          <Link
            className="py-2 px-6 rounded-md bg-blue-500 text-white hover:bg-blue-600 self-end"
            to={`/${id}/edit`}
          >Edit</Link>
          <Button
            styles="py-2 px-6 rounded-md text-red-500 border border-red-500 hover:bg-red-500 hover:text-white self-end"
            handleClick={() => handleDeleteNote(id as string)}
            text="Delete"
          />
        </div>
      </header>
      <div className="mt-6">
        <MarkdownPreview markdown={note?.markdown as string} />
      </div>
    </div>
  )
}

export default ShowNote