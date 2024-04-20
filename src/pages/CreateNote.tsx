import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import { NoteDataType } from "../context/Notes";
import NoteForm from "../features/notes/NoteForm";
import useNotes from "../hooks/useNotes";
import { addNewNote } from "../services/notes";
import toast from "react-hot-toast";

const CreateNote = () => {
  const { setIsLoading, setNotes } = useNotes();
  const navigate = useNavigate();

  document.title = "Create new note - Notes App";

  const createNewNote = async (data: NoteDataType) => {
    try {
      setIsLoading(true);
      const response = await addNewNote({
        ...data,
        title: data.title.toLowerCase(),
      });
      setNotes((prev) => [...prev, response]);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
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
