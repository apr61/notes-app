import { useContext } from "react"
import { TagsContext } from "../context/Tags"

const useTags = () => {
    return useContext(TagsContext)
}

export default useTags