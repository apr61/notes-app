import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { getTagById } from "../tags/tagsSlice"

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
                tagIds.map(id => {
                    const tag = useAppSelector((state) => getTagById(state, id))
                    if (tag) {
                        return <p key={tag.id}
                            className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md capitalize"
                        >{tag.tag}</p>
                    }
                })
            }
        </div>
    </article>
}

export default NoteCard