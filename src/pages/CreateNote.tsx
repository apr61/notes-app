import NoteForm from "../components/NoteForm"

const CreateNote = () => {
    const createNewNote = () => {

    }
    return (
        <div>
            <h3 className="text-2xl">New Note</h3>
            <NoteForm onSubmit={createNewNote}/>
        </div>
    )
}

export default CreateNote