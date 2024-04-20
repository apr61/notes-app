import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import { NoteDataType } from "../context/Notes";
import NoteForm from "../features/notes/NoteForm";
import { addNewNote } from "../services/notes";
import toast from "react-hot-toast";
import { useAppDispatch } from "../app/hooks";
import { addNewNoteLocal, noteStatusChange } from "../features/notes/notesSlice";

const CreateNote = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  document.title = "Create new note - Notes App";

  const createNewNote = async (data: NoteDataType) => {
    try {
      dispatch(noteStatusChange({payload: 'loading'}))
      const response = await addNewNote({
        ...data,
        title: data.title.toLowerCase(),
      });
      dispatch(addNewNoteLocal(response))
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      dispatch(noteStatusChange({payload: 'idle'}))
      toast.success("Note created successfully!!!");
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-2">
        <h3 className="text-2xl">New Note</h3>
        <NoteForm onSubmit={createNewNote} />
      </div>
    </>
  );
};

export default CreateNote;
