import { getTagById } from "./tagsSlice"
import { useAppSelector } from "../../app/hooks"

type SingleTagProps = {
    tagId: string
}

const SingleTag = ({ tagId }: SingleTagProps) => {
    const tag = useAppSelector(getTagById(tagId))
    if (tag === undefined) {
        return
    }
    return (
        <p
            className="px-3 py-1 bg-blue-500 w-fit text-white rounded-md capitalize"
        >
            {tag.tag}
        </p>
    )
}

export default SingleTag