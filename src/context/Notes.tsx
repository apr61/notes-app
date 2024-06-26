import { ReactNode, createContext, useEffect, useState } from "react";
import { deleteNoteById, getAllNotes } from "../services/notes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

export type NoteDataType = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteType = {
  id: string;
  title: string;
  markdown: string;
  tagIds: string[];
};

export type UseNotesContextType = {
  notes: NoteType[];
  isLoading: boolean;
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  handleDeleteNote: (id: string) => Promise<void>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type NotesProviderProps = {
  children: ReactNode;
};

const initValue: NoteType[] = [];

const initContextState: UseNotesContextType = {
  notes: [],
  isLoading: false,
  setNotes: () => {},
  handleDeleteNote: async () => {},
  title: "",
  setSelectedTags: () => {},
  selectedTags: [],
  setTitle: () => {},
  setIsLoading: () => {},
};

export const NotesContext =
  createContext<UseNotesContextType>(initContextState);

const NotesProvider = ({ children }: NotesProviderProps): ReactNode => {
  const [notes, setNotes] = useState<NoteType[]>(initValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const delay: number = 1000;
  const debouncedTitle = useDebounce(title, delay);
  const debouncedTags = useDebounce(selectedTags, delay);
  const navigate = useNavigate();

  const getAllNotesHelper = async (title: string, selectedTags: string[]) => {
    try {
      setIsLoading(true);
      let data: NoteType[] = await getAllNotes(title, selectedTags);
      setNotes(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        setNotes([]);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteNote = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteNoteById(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    } finally {
      setIsLoading(false);
      toast.success("Note deleted successfully");
    }
    navigate("/");
  };

  useEffect(() => {
    getAllNotesHelper(debouncedTitle, debouncedTags);
  }, [debouncedTitle, debouncedTags]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        setNotes,
        handleDeleteNote,
        selectedTags,
        setSelectedTags,
        title,
        setTitle,
        setIsLoading,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
