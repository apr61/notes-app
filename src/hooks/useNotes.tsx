import { useContext } from "react"
import { NotesContext } from "../context/Notes"

const useNotes = () => {
    return useContext(NotesContext)
}

export default useNotes