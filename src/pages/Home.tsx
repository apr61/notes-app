import { useState } from "react"
import NoteCard from "../components/NoteCard"
import Button from "../components/Button"

const Home = () => {
  const [title, setTitle] = useState<string>('')
  return (
    <>
      <div>
        <form className="my-4 flex flex-col sm:flex-row gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="title" className="text-2xl">Title</label>
            <input
              type="search"
              id="title"
              name="title"
              className="border-2 rounded-md border-gray-200 px-2 py-1"
              autoFocus={true}
              required
              value={title}
              onChange={e => setTitle(e.target.value)} />
          </div>
          <Button text="Search" handleClick={() => {}} styles={"bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-white self-end"} />
        </form>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-3 mt-4">
        {
          new Array(10).fill(10).map((i) => (
            <NoteCard key={i} />
          ))
        }
      </div>
    </>
  )
}

export default Home