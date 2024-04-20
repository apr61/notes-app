import { useEffect, useState } from "react"
import NotesList from "../features/notes/NotesList"
import SelectedTagsList from "../features/tags/SelectedTags"
import TagsSelect from "../features/tags/TagsSelect"
import { fetchAllNotes } from "../features/notes/notesSlice"
import { useAppDispatch } from "../app/hooks"
import useDebounce from "../hooks/useDebounce"

const DebounceDelay = 1000

const Home = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')
  const deboundedTitle = useDebounce(title, DebounceDelay)
  const deboundedTags = useDebounce(selectedTags, DebounceDelay)
  const dispatch = useAppDispatch()

  const handleRemoveTag = (id: string) => {
    setSelectedTags(prev => prev.filter(tagId => tagId !== id))
  }

  useEffect(() => {
    dispatch(fetchAllNotes({title: deboundedTitle, selectedTags: deboundedTags}))
    console.log("use effect")
  }, [deboundedTitle, deboundedTags])

  document.title = 'Home - Notes App'

  return (
    <>
      <form className="mt-8 mb-4 flex flex-col md:flex-row gap-2 max-w-[70rem] w-full">
        <div className="md:w-1/2">
          <input
            type="search"
            placeholder="Search Note by title"
            name="title"
            className="border-2  px-2 py-2 w-full rounded-md border-gray-200 dark:bg-black dark:border-gray-800"
            autoFocus={true}
            required
            value={title}
            onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap md:w-1/2 w-full">
          <TagsSelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div>
      </form>
      <SelectedTagsList selectedTags={selectedTags} handleRemoveTag={handleRemoveTag} />
      <NotesList />
    </>
  )
}

export default Home