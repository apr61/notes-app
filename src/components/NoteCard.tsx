import { Link } from "react-router-dom"

const NoteCard = () => {
    return <article className="border py-2 px-4 rounded-md">
        <h2 className="text-xl capitalize">
            <Link to="">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, atque?
            </Link>
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
            <p className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md">tag1</p>
            <p className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md">tag1</p>
            <p className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md">tag1</p>
            <p className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md">tag1</p>
            <p className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md">tag1</p>
            <p className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md">tag1</p>
        </div>
    </article>
}

export default NoteCard