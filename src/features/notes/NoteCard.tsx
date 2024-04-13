import { Link } from "react-router-dom"
import SingleTag from "../tags/SingleTag"

type NoteCardProps = {
    id: string,
    title: string,
    tagIds: string[]
}

const NoteCard = ({ id, title, tagIds }: NoteCardProps) => {
    return <article className="border dark:border-gray-800 p-4 rounded-md flex flex-col gap-2">
        <h2 className="text-2xl capitalize">
            <Link to={id}>
                {title}
            </Link>
        </h2>
        <div className="flex flex-wrap gap-2 mt-auto">
            {
                tagIds.map(id => (
                    <SingleTag key={id} tagId={id} />
                ))
            }
        </div>
    </article>
}

export default NoteCard