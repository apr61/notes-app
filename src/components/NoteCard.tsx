import { Link } from "react-router-dom"

type NoteCardProps = {
    id: string,
    title: string
}

const NoteCard = ({id, title} : NoteCardProps) => {
    return <article className="border p-4 rounded-md">
        <h2 className="text-2xl capitalize">
            <Link to={id}>
                {title}
            </Link>
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
            <p className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md">tag1</p>
            <p className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md">tag1</p>
        </div>
    </article>
}

export default NoteCard