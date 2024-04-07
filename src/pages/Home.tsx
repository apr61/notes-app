import { useState } from "react"
import NotesList from "../components/NotesList"
import TagsSelect from "../components/TagsSelect"
import { TagType } from "../context/Tags"

const Home = () => {
  const [title, setTitle] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  document.title = 'Home - Notes App'
  return (
    <>
      <form className="mt-8 mb-4 flex flex-col sm:flex-row gap-2 max-w-[70rem] w-full">
        <div className="w-1/2 ">
          <input
            type="search"
            placeholder="Search Note by title"
            name="title"
            className="border-2 rounded-md border-gray-200 px-2 py-2 w-full"
            autoFocus={true}
            required
            value={title}
            onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <TagsSelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div>
      </form>
      <NotesList />
    </>
  )
}

export default Home